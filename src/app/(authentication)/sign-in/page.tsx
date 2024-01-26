import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "../(components)/(card)/Card";

import { getPageSession } from "@/lib/session";
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const session = await getPageSession();
    if (session) {
        if (!session.user.email_verified) {
            redirect("/email-verification");
        }
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card authType="sign-in" />
        </main>
    );
};

export default SignInPage;
