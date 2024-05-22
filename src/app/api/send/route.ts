import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template/EmailTemplate";
import { PasswordResetTemplate } from "@/components/email-templates/password-reset-template/EmailTemplate";
import { FailedPaymentTemplate } from "@/components/email-templates/payment-failed-template/EmailTemplate";
import { EmailVerificationCodeTemplate } from "@/components/email-templates/email-verification-code-template/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        //const { email, firstName, lastName, subject, url, type } = body;
        const type = body.type;
        const subject = body.subject;
        const email = body.email;
        var template;
        var from = "";
        if (type === "email-verification") {
            const { firstName, lastName, url } = body;
            template = EmailVerificationTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            });
            from = "MyResumeHero <email-verification@myresumehero.com>";
        }
        if (type === "password-reset") {
            const { firstName, lastName, url } = body;
            template = PasswordResetTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            });
            from = "MyResumeHero <password-reset@myresumehero.com>";
        }
        if (type === "failed-payment") {
            const { firstName, lastName } = body;
            template = FailedPaymentTemplate({
                firstName: firstName,
                lastName: lastName,
            });
            from = "MyResumeHero <payments@myresumehero.com>";
        }
        if (type === "email-verification-code") {
            const { firstName, lastName, code } = body;
            template = EmailVerificationCodeTemplate({
                firstName: firstName,
                lastName: lastName,
                code: code,
            });
            from = "MyResumeHero <email-verification@myresumehero.com>";
        }
        const data = await resend.emails.send({
            from: from,
            to: [email],
            subject: subject,
            react: template,
            text: "",
        });
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
