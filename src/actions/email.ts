"use server";
import { AuthEmailDataType } from "@/features/authentication";
import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template/EmailTemplate";
import { EmailVerificationCodeTemplate } from "@/components/email-templates/email-verification-code-template/EmailTemplate";
import { PasswordResetTemplate } from "@/components/email-templates/password-reset-template/EmailTemplate";
import { FailedPaymentTemplate } from "@/components/email-templates/payment-failed-template/EmailTemplate";
import { Resend } from "resend";

export async function send(data: AuthEmailDataType) {
    const { email, firstName, lastName, subject, type } = data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        var template;
        var from = "";
        if (type === "email-verification") {
            const url = data.url as string;
            template = EmailVerificationTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            });
            from = "MyAiResumes <email-verification@myairesumes.com>";
        }
        if (type === "password-reset") {
            const url = data.url as string;
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
        if (type === "email-verification-code") {
            const code = data.code as string;
            template = EmailVerificationCodeTemplate({
                firstName: firstName,
                lastName: lastName,
                code: code,
            });
            from = "MyAiResumes <email-verification@myairesumes.com>";
        }
        const response = await resend.emails.send({
            from: from,
            to: [email],
            subject: subject,
            react: template,
            text: "",
        });
        return { success: "Email sent" };
    } catch (error) {
        return { error: "Error sending emai" };
    }
}
