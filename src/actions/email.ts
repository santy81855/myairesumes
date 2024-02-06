"use server";
import { AuthEmailData } from "@/types";
import axios from "axios";

export async function send(data: AuthEmailData) {
    const { email, firstName, lastName, subject, url, type } = data;
    console.log("APP DOMAIN: ", process.env.APP_DOMAIN);
    // convert the axios request below to a fetch request
    await fetch(`${process.env.APP_DOMAIN}/api/send`, {
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
    })
        .then((res) => {
            console.log("Email sent: ", res);
            return res;
        })
        .catch((err) => {
            console.log("Email error: ", err);
            return err;
        });
    return;
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
