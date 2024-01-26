import { sendPasswordResetLink } from "@/auth/email";
import { generatePasswordResetToken } from "@/auth/token";
import { prisma } from "@/lib/prisma";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    if (!email) {
        return new Response(
            JSON.stringify({
                error: "Email is required",
            }),
            {
                status: 422,
            }
        );
    }
    try {
        // get user from database
        const storedUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!storedUser) {
            return new Response(
                JSON.stringify({
                    error: "User does not exist",
                }),
                {
                    status: 400,
                }
            );
        }
        const token = await generatePasswordResetToken(storedUser.id);
        const first = storedUser.first_name || "User";
        const last = storedUser.last_name || "";
        await sendPasswordResetLink({
            email,
            token,
            first_name: first,
            last_name: last,
        });
        return new Response();
    } catch (e) {
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
