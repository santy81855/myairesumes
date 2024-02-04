import styles from "./page.module.css";
import Title from "@/components/landing-page/title/Title";
import Blur from "@/components/landing-page/color-blur/Blur";
import HeroImage from "@/components/landing-page/hero-image/HeroImage";
import Navbar from "@/components/nav/Navbar";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import BasicInfoModal from "@/components/landing-page/basic-info-modal/BasicInfoModal";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();
    let showModal = false;
    let currentUser;
    if (!user) {
        showModal = false;
    } else {
        // Fetch subscription status using a revalidateTag so that the page will revalidate when the subscription status changes
        const res = await getUser(user.id);
        if (!res.ok) {
            currentUser = null;
        } else {
            currentUser = await res.json();
        }
        // if this is the first time the user is logging in, bring up a modal to redirect them to where they can fill out their basic info
        showModal = currentUser && !currentUser.basicInfo;
    }

    return (
        <main
            id="landingPage"
            className={styles.main}
            style={showModal ? { overflow: "hidden" } : {}}
        >
            <section className={styles.heroSection}>
                <Navbar
                    style={{ backgroundColor: "transparent", color: "white" }}
                />
                <section className={styles.heroSectionText}>
                    <Title />
                </section>
                <Blur />
                <HeroImage />
            </section>
            <section className={styles.section}>hey</section>
            {showModal && <BasicInfoModal currentUser={currentUser} />}
        </main>
    );
}
