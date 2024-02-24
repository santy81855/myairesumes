"use server";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { validateRequest, lucia } from "@/features/authentication/lib/auth";
import { cookies } from "next/headers";
import { ActionResult } from "@/types";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
    generatePasswordResetToken,
    validatePasswordResetToken,
    generateEmailVerificationToken,
} from "@/auth/token";
import { sendPasswordResetLink, sendEmailVerificationLink } from "@/auth/email";

export async function resendEmailVerification() {
    "use server";
    const { user } = await validateRequest();
    if (!user) {
        return {
            error: "Please log in to resend the email verification link.",
        };
    }
    // send email verification link
    const verificationToken = await generateEmailVerificationToken(
        user.id,
        user.email
    );
    if (!verificationToken) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const first = user.firstName || "User";
    const last = user.lastName || "";
    const response = await sendEmailVerificationLink({
        email: user.email,
        token: verificationToken,
        firstName: first,
        lastName: last,
    });
    if (response.error) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    return {
        success: "The email verification link was sent to your email.",
    };
}

export async function resetPassword(formData: FormData, token: string) {
    "use server";
    const password = formData.get("password") as string;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // validate the token
    const tokenUserId = await validatePasswordResetToken(token);
    if (!tokenUserId) {
        return {
            error: "Invalid or expired password reset link",
        };
    }
    // invalidate all sessions for the user
    await lucia.invalidateUserSessions(tokenUserId);
    // update the user's password
    await prisma.user.update({
        where: {
            id: tokenUserId,
        },
        data: {
            hashedPassword,
        },
    });
    // log the user in and return them to the homepage
    const session = await lucia.createSession(tokenUserId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return redirect("/");
}

export async function sendPasswordResetEmail(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    try {
        const storedUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!storedUser) {
            return {
                error: "This email is not associated with an account.",
            };
        }
        if (storedUser.accountType === "google") {
            return {
                error: "This email is associated with a Google account. Please sign in with Google.",
            };
        }
        const token = await generatePasswordResetToken(storedUser.id);
        if (!token) {
            return {
                error: "An unknown error occurred. Please try again.",
            };
        }
        const first = storedUser.firstName || "User";
        const last = storedUser.lastName || "";
        const response = await sendPasswordResetLink({
            email,
            token,
            firstName: first,
            lastName: last,
        });
        if (response.error) {
            return {
                error: "An unknown error occurred. Please try again.",
            };
        }
        return {
            success: "The password reset link was sent to your email.",
        };
    } catch (e) {
        return {
            error: "An unknown error occurred.",
        };
    }
}

export async function signout(): Promise<ActionResult> {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Error signing out.",
        };
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return redirect("/sign-in");
}

export async function signup(formData: FormData): Promise<ActionResult> {
    "use server";
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // check if there is a user with that email already
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        // if user already exists, check if they have a "google" accountType
        if (existingUser) {
            if (existingUser.accountType === "google") {
                // if they do, then we can just update their password and accountType and sign them in
                await prisma.user.update({
                    where: {
                        email,
                    },
                    data: {
                        hashedPassword: hashedPassword,
                        accountType: "both",
                        firstName,
                        lastName,
                    },
                });
                const session = await lucia.createSession(existingUser.id, {});
                const sessionCookie = lucia.createSessionCookie(session.id);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            } else {
                // if they already have a password account with this email then we can't create a new account
                return {
                    error: "This email is already associated with an account.",
                };
            }
        } else {
            // get a stripe customer id
            const customer = await stripe.customers.create({
                email,
                name: `${firstName} ${lastName}`,
            });
            // if user doesn't exist, create a new user
            const user = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    hashedPassword: hashedPassword,
                    accountType: "password",
                    stripeCustomerId: customer.id,
                    basicInfo: {},
                },
            });
            if (!user) {
                return {
                    error: "An unknown error occurred. Please try again.",
                };
            }
            // send email verification link
            const verificationToken = await generateEmailVerificationToken(
                user.id,
                email
            );
            if (!verificationToken) {
                return {
                    error: "An unknown error occurred. Please try again.",
                };
            }
            const first = user.firstName || "User";
            const last = user.lastName || "";
            await sendEmailVerificationLink({
                email,
                token: verificationToken,
                firstName: first,
                lastName: last,
            });
            const session = await lucia.createSession(user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch (e) {
        return {
            error: "An unknown error occurred.",
        };
    }
    return redirect("/email-verification");
}

// now unhash it
// const match = await bcrypt.compare(password, hashedPassword);

export async function signin(formData: FormData): Promise<ActionResult> {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!existingUser) {
        return {
            error: "This email is not associated with an account.",
        };
    }
    // if the user has a google account or no password, then they can't sign in with a password
    if (
        existingUser.accountType === "google" ||
        existingUser.hashedPassword === null
    ) {
        return {
            error: "This email is associated with a Google account. Please sign in with Google.",
        };
    }
    const validPassword = await bcrypt.compare(
        password,
        existingUser.hashedPassword
    );
    if (!validPassword) {
        return {
            error: "Incorrect username or password",
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return redirect("/");
}
