import { redirect } from "next/navigation";
import styles from "./page.module.css";
import {
    EmailVerificationCard,
    ChooseVerificationCard,
} from "@/features/authentication";
import { validateRequest } from "@/features/authentication/lib/auth";

const Page = async () => {
    const { user, session } = await validateRequest();
    if (!session) redirect("/sign-in");
    if (user.emailVerified) redirect("/");

    return (
        <main className={styles.pageContainer}>
            <ChooseVerificationCard />
        </main>
    );
};

export default Page;
