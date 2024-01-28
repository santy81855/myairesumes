import { prisma } from "@/lib/prisma";
import { TimeSpan, createDate } from "oslo";
import { isWithinExpirationDate } from "oslo";

export const generateEmailVerificationToken = async (
    userId: string,
    email: string
) => {
    // delete all tokens for a certain userid using prisma
    await prisma.emailVerificationToken.deleteMany({
        where: {
            userId: userId,
        },
    });
    // insert token to database
    const token = await prisma.emailVerificationToken.create({
        data: {
            expiresAt: createDate(new TimeSpan(2, "h")),
            userId: userId,
            email,
        },
    });
    if (!token) return null;
    return token.id;
};

export const validateEmailVerificationToken = async (token: string) => {
    const storedToken = await prisma.$transaction(async (trx) => {
        const storedToken = await trx.emailVerificationToken.findUnique({
            where: {
                id: token,
            },
        });
        if (!storedToken) throw new Error("Invalid token");
        await trx.emailVerificationToken.deleteMany({
            where: {
                userId: storedToken.userId,
            },
        });
        return storedToken;
    });
    if (!isWithinExpirationDate(storedToken.expiresAt)) {
        throw new Error("Expired token");
    }
    return storedToken.userId;
};

export const validatePasswordResetToken = async (token: string) => {
    const storedToken = await prisma.$transaction(async (trx) => {
        const storedToken = await trx.passwordResetToken.findUnique({
            where: {
                id: token,
            },
        });
        if (!storedToken) return null;
        await trx.passwordResetToken.deleteMany({
            where: {
                userId: storedToken.userId,
            },
        });
        return storedToken;
    });
    if (!storedToken || !isWithinExpirationDate(storedToken.expiresAt)) {
        return null;
    }
    return storedToken.userId;
};

export const generatePasswordResetToken = async (userId: string) => {
    console.log("generating password reset token");
    // delete all tokens for a certain userid using prisma
    await prisma.passwordResetToken.deleteMany({
        where: {
            userId: userId,
        },
    });
    console.log("deleted all tokens");
    // insert token to database
    const token = await prisma.passwordResetToken.create({
        data: {
            expiresAt: createDate(new TimeSpan(2, "h")),
            userId,
        },
    });
    if (!token) return null;
    return token.id;
};
