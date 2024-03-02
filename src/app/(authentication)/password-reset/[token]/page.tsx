import { validateRequest } from "@/features/authentication/lib/auth";
import styles from "./page.module.css";
import { PasswordResetCard } from "@/features/authentication";
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
            <PasswordResetCard token={params.token} />
        </main>
    );
};

export default Page;
