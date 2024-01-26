import { EmailTemplate } from "@/components/email-template/EmailTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    console.log("API/SEND HERE");
    try {
        const body = await request.json();
        console.log(body);
        const { email, firstName, lastName, subject, url } = body;
        const data = await resend.emails.send({
            from: "MyAiResumes <email-verification@myairesumes.com>",
            to: [email],
            subject: subject,
            react: EmailTemplate({
                firstName: firstName,
                lastName: lastName,
                url: url,
            }),
            text: "",
        });
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
