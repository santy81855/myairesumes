import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Card from "@/components/authentication/email-verification-card/Card";
import { validateRequest } from "@/lib/auth";

const Page = async () => {
    const { user, session } = await validateRequest();
    if (!session) redirect("/sign-in");
    if (user.emailVerified) redirect("/");

    return (
        <main className={styles.pageContainer}>
            <Card />
        </main>
    );
};

export default Page;
