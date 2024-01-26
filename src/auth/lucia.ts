import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { google } from "@lucia-auth/oauth/providers";

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
            email_verified: data.email_verified,
        };
    },
});

const googleAuth = google(auth, {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirectUri: process.env.GOOGLE_REDIRECT_URI || "",
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
    ],
});

export { auth, googleAuth };
