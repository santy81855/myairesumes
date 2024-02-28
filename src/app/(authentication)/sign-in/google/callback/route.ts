import { google, lucia } from "@/features/authentication/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { stripe } from "@/lib/stripe";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;
    if (
        !code ||
        !state ||
        !storedCodeVerifier ||
        !storedState ||
        state !== storedState
    ) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            storedCodeVerifier
        );
        const googleUserResponse = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            }
        );
        const googleUser = await googleUserResponse.json();
        if (!googleUser.email) {
            return new Response(null, {
                status: 400,
            });
        }
        // check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                email: googleUser.email,
            },
        });
        // if the user exists
        if (existingUser) {
            // if the user has not signed in with google before then update their account type to "both" to allow them to sign in with either google or a password
            if (existingUser.accountType === "password") {
                await prisma.user.update({
                    where: {
                        id: existingUser.id,
                    },
                    data: {
                        accountType: "both",
                    },
                });
            }
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }
        const customer = await stripe.customers.create({
            email: googleUser.email,
            name: `${googleUser.given_name} ${googleUser.family_name}`,
        });
        // create a new user
        const newUser = await prisma.user.create({
            data: {
                email: googleUser.email,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                accountType: "google",
                emailVerified: true,
                stripeCustomerId: customer.id,
                basicInfo: {},
            },
        });
        if (!newUser) {
            return new Response(null, {
                status: 500,
            });
        }
        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        if (
            e instanceof OAuth2RequestError &&
            e.message === "bad_verification_code"
        ) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    email?: string;
    email_verified?: boolean;
    hd?: string;
}
