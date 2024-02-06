"use server";
import { AuthEmailData } from "@/types";
import axios from "axios";

export async function send(data: AuthEmailData) {
    const { email, firstName, lastName, subject, url, type } = data;
    console.log("APP DOMAIN: ", process.env.APP_DOMAIN);
    await axios
        .post(`${process.env.APP_DOMAIN}/api/send`, {
            email,
            firstName,
            lastName,
            subject,
            url,
            type,
        })
        .then((res) => {
            console.log("Email sent: ", res);
            return res;
        })
        .catch((err) => {
            console.log("Email error: ", err);
            return err;
        });
}
