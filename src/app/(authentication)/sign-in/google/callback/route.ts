import { auth, googleAuth } from "@/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const storedState = cookies().get("google_oauth_state")?.value;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400,
        });
    }
    try {
        const { getExistingUser, googleUser, createUser } =
            await googleAuth.validateCallback(code);
        const getUser = async () => {
            if (googleUser.email === undefined) {
                return new Response(null, {
                    status: 400,
                });
            }
            const existingUser = await getExistingUser();
            if (existingUser) return existingUser;
            const user = await createUser({
                attributes: {
                    first_name: googleUser.given_name,
                    last_name: googleUser.family_name,
                    email: googleUser.email,
                    email_verified: true,
                },
            });
            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        const authRequest = auth.handleRequest(request.method, {
            cookies,
            headers,
        });
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/", // redirect to profile page
            },
        });
    } catch (e) {
        if (e instanceof OAuthRequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
};
