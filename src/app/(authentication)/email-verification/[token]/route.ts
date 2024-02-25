import { lucia } from "@/features/authentication/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateEmailVerificationToken } from "@/features/authentication";

import type { NextRequest } from "next/server";

export const GET = async (
    _: NextRequest,
    {
        params,
    }: {
        params: {
            token: string;
        };
    }
) => {
    const { token } = params;
    try {
        const userId = await validateEmailVerificationToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        // invalidate all sessions for the user
        await lucia.invalidateUserSessions(userId);
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                emailVerified: true,
            },
        });
        // log the user in and return them to the homepage
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
                "Set-Cookie": sessionCookie.serialize(),
            },
        });
    } catch {
        return new Response("Invalid email verification link", {
            status: 400,
        });
    }
};
