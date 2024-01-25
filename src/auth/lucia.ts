// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from ".prisma/client";

const client = new PrismaClient();

const auth = lucia({
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    middleware: nextjs_future(),
    sessionCookie: {
        expires: false,
    },
    adapter: prisma(client),
    getUserAttributes: (data) => {
        return {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        };
    },
});

export { auth };
