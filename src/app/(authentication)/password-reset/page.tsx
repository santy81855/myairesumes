import styles from "./page.module.css";
import Card from "@/components/authentication/password-reset-email-card/Card";
import { getPageSession } from "@/lib/session";
import { redirect } from "next/navigation";

const PasswordResetPage = async () => {
    const session = await getPageSession();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card session={session} />
        </main>
    );
};

export default PasswordResetPage;
