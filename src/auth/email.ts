import { send } from "@/actions/email";

export const sendEmailVerificationLink = async ({
    email,
    token,
    first_name,
    last_name,
}: {
    email: string;
    token: string;
    first_name: string;
    last_name: string;
}) => {
    const url = `${process.env.VERIFICATION_URL_PREFIX}/${token}`;
    const subject = "Verify your email address";
    const response = await send({
        email,
        firstName: first_name,
        lastName: last_name,
        subject,
        url,
        type: "email-verification",
    });
    return response;
};

export const sendPasswordResetLink = async ({
    email,
    token,
    first_name,
    last_name,
}: {
    email: string;
    token: string;
    first_name: string;
    last_name: string;
}) => {
    const url = `${process.env.RESET_URL_PREFIX}/${token}`;
    const subject = "Reset your password";
    const response = await send({
        email,
        firstName: first_name,
        lastName: last_name,
        subject,
        url,
        type: "password-reset",
    });
    return response;
};
