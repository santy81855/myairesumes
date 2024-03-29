import { send } from "@/actions/email";

export const sendEmailVerificationCode = async ({
    email,
    code,
    firstName,
    lastName,
}: {
    email: string;
    code: string;
    firstName: string;
    lastName: string;
}) => {
    const subject = "Email verification code";
    try {
        await send({
            email,
            firstName: firstName,
            lastName: lastName,
            subject,
            code,
            type: "email-verification-code",
        });
        return { success: "Email sent" };
    } catch (e) {
        return { error: e };
    }
};

export const sendEmailVerificationLink = async ({
    email,
    token,
    firstName,
    lastName,
}: {
    email: string;
    token: string;
    firstName: string;
    lastName: string;
}) => {
    const url = `${process.env.VERIFICATION_URL_PREFIX}/${token}`;
    const subject = "Verify your email address";
    try {
        await send({
            email,
            firstName: firstName,
            lastName: lastName,
            subject,
            url,
            type: "email-verification",
        });
        return { success: "Email sent" };
    } catch (e) {
        return { error: e };
    }
};

export const sendPasswordResetLink = async ({
    email,
    token,
    firstName,
    lastName,
}: {
    email: string;
    token: string;
    firstName: string;
    lastName: string;
}) => {
    const url = `${process.env.RESET_URL_PREFIX}/${token}`;
    const subject = "Reset your password";
    try {
        await send({
            email,
            firstName: firstName,
            lastName: lastName,
            subject,
            url,
            type: "password-reset",
        });
        return { success: "Email sent" };
    } catch (e) {
        return { error: e };
    }
};
