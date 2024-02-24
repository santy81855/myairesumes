import styles from "./page.module.css";
import { PasswordResetEmailCard } from "@/features/authentication";
import { validateRequest } from "@/features/authentication/lib/auth";
import { redirect } from "next/navigation";

const PasswordResetPage = async () => {
    const { session } = await validateRequest();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <PasswordResetEmailCard />
        </main>
    );
};

export default PasswordResetPage;
