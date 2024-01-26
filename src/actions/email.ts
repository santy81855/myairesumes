"use server";
import { EmailData } from "@/types";

export async function send(data: EmailData) {
    const { email, firstName, lastName, subject, url, type } = data;
    const response = await fetch("http://localhost:3000/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            subject,
            url,
            type,
        }),
    });
    return response.json();
}
