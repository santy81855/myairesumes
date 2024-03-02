import { validateRequest } from "@/features/authentication/lib/auth";
import styles from "./page.module.css";
import { AuthCard } from "@/features/authentication";
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const { session } = await validateRequest();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <AuthCard authType="sign-in" />
        </main>
    );
};

export default SignInPage;
