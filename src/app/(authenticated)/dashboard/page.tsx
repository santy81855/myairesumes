import styles from "./page.module.css";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import Profile from "@/components/dashboard/profile/Profile";
import TitleSection from "@/components/dashboard/title-section/TitleSection";

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
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
    const menuSection = searchParams?.menu || "";

    return (
        <main className={styles.main}>
            <p className={`${styles.topHeading} ${styles.largeHeading}`}>
                DASH
            </p>
            <p className={`${styles.bottomHeading} ${styles.largeHeading}`}>
                BOARD
            </p>
            <TitleSection currentUser={currentUser} />
            {menuSection === "profile" && (
                <Profile
                    currentUser={currentUser}
                    searchParams={searchParams}
                    key="profileSection"
                />
            )}
        </main>
    );
};

export default Page;
