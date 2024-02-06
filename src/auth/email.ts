import { send } from "@/actions/email";

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
    console.log("EMAIL PREFIX URL is: ", url);
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
        console.log("EEror: ", e);
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
