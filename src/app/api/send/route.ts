import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template/EmailTemplate";
import { PasswordResetTemplate } from "@/components/email-templates/password-reset-template/EmailTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, firstName, lastName, subject, url, type } = body;
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
