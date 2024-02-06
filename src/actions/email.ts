"use server";
import { AuthEmailData } from "@/types";
import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template/EmailTemplate";
import { PasswordResetTemplate } from "@/components/email-templates/password-reset-template/EmailTemplate";
import { FailedPaymentTemplate } from "@/components/email-templates/payment-failed-template/EmailTemplate";
import { Resend } from "resend";

export async function send(data: AuthEmailData) {
    const { email, firstName, lastName, subject, url, type } = data;
    // convert the axios request below to a fetch request
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        var template;
        var from = "";
        if (type === "email-verification") {
            template = EmailVerificationTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            });
            from = "MyAiResumes <email-verification@myairesumes.com>";
        }
        if (type === "password-reset") {
            template = PasswordResetTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            });
            from = "MyAiResumes <password-reset@myairesumes.com>";
        }
        if (type === "failed-payment") {
            template = FailedPaymentTemplate({
                firstName: firstName,
                lastName: lastName,
            });
            from = "MyAiResumes <payments@myairesumes.com>";
        }
        const data = await resend.emails.send({
            from: from,
            to: [email],
            subject: subject,
            react: template,
            text: "",
        });
        return { success: "Email sent" };
    } catch (error) {
        return { error };
    }
}
