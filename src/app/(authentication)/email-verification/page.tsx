import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Card from "@/components/authentication/email-verification-card/Card";
import { getPageSession } from "@/lib/session";

const Page = async () => {
    const session = await getPageSession();
    if (!session) redirect("/sign-in");
    if (session.user.email_verified) redirect("/");

    return (
        <main className={styles.pageContainer}>
            <Card session={session} />
        </main>
    );
};

export default Page;