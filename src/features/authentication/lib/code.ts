import { prisma } from "@/lib/prisma";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

export const generateEmailVerificationCode = async (
    userId: string,
    email: string
) => {
    // delete all tokens for a certain userid using prisma
    await prisma.emailVerificationCode.deleteMany({
        where: {
            userId: userId,
        },
    });
    // generate the code
    const code = generateRandomString(5, alphabet("0-9"));
    // insert the code into the database
    const insertedCode = await prisma.emailVerificationCode.create({
        data: {
            expiresAt: createDate(new TimeSpan(2, "h")),
            userId: userId,
            email,
            code,
        },
    });
    if (!insertedCode) return null;
    return code;
};
