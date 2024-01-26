"use server";
import { EmailData } from "@/types";
import axios from "axios";

export async function send(data: EmailData) {
    const { email, firstName, lastName, subject, url, type } = data;
    axios
        .post(`${process.env.APP_DOMAIN}/api/send`, {
            email,
            firstName,
            lastName,
            subject,
            url,
            type,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
}
