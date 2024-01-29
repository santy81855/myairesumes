import { validateRequest } from "@/lib/auth";
import styles from "./page.module.css";
import Card from "@/components/authentication/password-reset-card/Card";
import { redirect } from "next/navigation";

const Page = async ({
    params,
}: {
    params: {
        token: string;
    };
}) => {
    const { session } = await validateRequest();
    if (session) {
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card token={params.token} />
        </main>
    );
};

export default Page;
