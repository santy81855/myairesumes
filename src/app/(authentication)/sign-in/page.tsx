import { validateRequest } from "@/lib/auth";
import styles from "./page.module.css";
import Card from "@/components/authentication/card/Card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const { session } = await validateRequest();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card authType="sign-in" />
        </main>
    );
};

export default SignInPage;
