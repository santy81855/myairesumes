import { auth } from "@/auth/lucia";
import { validatePasswordResetToken } from "@/auth/token";

import type { NextRequest } from "next/server";

export const POST = async (
    request: NextRequest,
    {
        params,
    }: {
        params: {
            token: string;
        };
    }
) => {
    const formData = await request.formData();
    const password = formData.get("password") as string;
    try {
        const { token } = params;
        const userId = await validatePasswordResetToken(token);
        let user = await auth.getUser(userId);
        await auth.invalidateAllUserSessions(user.userId);
        await auth.updateKeyPassword("email", user.email, password);
        if (!user.email_verified) {
            user = await auth.updateUserAttributes(user.userId, {
                email_verified: true,
            });
        }
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const sessionCookie = auth.createSessionCookie(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
                "Set-Cookie": sessionCookie.serialize(),
            },
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Invalid or expired password reset link",
            }),
            {
                status: 400,
            }
        );
    }
};
