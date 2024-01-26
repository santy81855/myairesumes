import { EmailData } from "@/types";
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
    console.log("About to try SENDING EMAIL");
    const response = await send({
        email,
        firstName: first_name,
        lastName: last_name,
        subject,
        url,
    });
    return response;
};
