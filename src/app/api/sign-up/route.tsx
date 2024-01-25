import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    console.log("here");
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
            },
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/", // redirect to profile page
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
