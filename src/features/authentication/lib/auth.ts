import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import { Google } from "arctic";

import type { Session, User } from "lucia";
const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            email: attributes.email,
            emailVerified: attributes.emailVerified,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

export const validateRequest = cache(
    async (): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id
                );
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
        } catch {}
        return result;
    }
);

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
}

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
);
