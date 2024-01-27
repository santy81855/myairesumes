import styles from "./page.module.css";
import Card from "@/components/authentication/card/Card";
import { getPageSession } from "@/lib/session";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const session = await getPageSession();
    if (session) {
        if (!session.user.email_verified) {
            redirect("/email-verification");
        }
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card authType="sign-up" />
        </main>
    );
};

export default SignUpPage;
