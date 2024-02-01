import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

const Page = async () => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the current user
    const res = await getUser(user.id);
    let currentUser;
    if (!res.ok) {
        currentUser = null;
    } else {
        currentUser = await res.json();
    }
    if (!currentUser) {
        redirect("/sign-in");
    }

    return (
        <main className={styles.main}>
            <p className={styles.largeHeading}>DASHBOARD</p>
            <section className={styles.titleSection}>
                <h1 className={styles.pageHeading}>Dashboard</h1>
                <p className={styles.subHeading}>
                    {currentUser.firstName} {currentUser.lastName}
                </p>
            </section>
        </main>
    );
};

export default Page;
