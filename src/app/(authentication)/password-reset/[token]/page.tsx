import styles from "./page.module.css";
import Card from "@/components/authentication/password-reset-card/Card";
import { getPageSession } from "@/lib/session";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: {
        token: string;
    };
}) => {
    const session = await getPageSession();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card session={session} token={params.token} />
        </main>
    );
};

export default Page;
