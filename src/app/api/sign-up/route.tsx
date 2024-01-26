import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateEmailVerificationToken } from "@/auth/token";
import { sendEmailVerificationLink } from "@/auth/email";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    // basic check
    if (
        email === null ||
        password === null ||
        firstName === null ||
        lastName === null
    ) {
        return NextResponse.json(
            {
                error: "Incomplete Fields.",
            },
            {
                status: 400,
            }
        );
    }
    try {
        const user = await auth.createUser({
            key: {
                providerId: "email", // auth method
                providerUserId: email.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                first_name: firstName,
                last_name: lastName,
                email,
                email_verified: false,
            },
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);
        const token = await generateEmailVerificationToken(session.user.userId);
        await sendEmailVerificationLink({
            email,
            token,
            first_name: firstName,
            last_name: lastName,
        });
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/email-verification", // redirect to profile page
            },
        });
    } catch (e) {
        // this part depends on the database you're using
        // check for unique constraint error in user table
        console.log(e);
        return NextResponse.json(
            {
                error: "An unknown error occurred",
            },
            {
                status: 500,
            }
        );
    }
};
