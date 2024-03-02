import styles from "./page.module.css";
import Card from "@/components/authentication/password-reset-email-card/Card";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

const PasswordResetPage = async () => {
    const { session } = await validateRequest();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card />
        </main>
    );
};

export default PasswordResetPage;
