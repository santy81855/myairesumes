import { auth } from "@/auth/lucia";
import { generateEmailVerificationToken } from "@/auth/token";
import { sendEmailVerificationLink } from "@/auth/email";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const authRequest = auth.handleRequest(request);
    const session = await authRequest.validate();
    if (!session) {
        return new Response(null, {
            status: 401,
        });
    }
    if (session.user.emailVerified) {
        return new Response(
            JSON.stringify({
                error: "Email already verified",
            }),
            {
                status: 422,
            }
        );
    }
    try {
        const token = await generateEmailVerificationToken(session.user.userId);
        const email = session.user.email;
        const first = session.user.first_name;
        const last = session.user.last_name;
        await sendEmailVerificationLink({
            email,
            token,
            first_name: first,
            last_name: last,
        });
        return new Response();
    } catch {
        return new Response(
            JSON.stringify({
                error: "An unknown error occurred",
            }),
            {
                status: 500,
            }
        );
    }
};
