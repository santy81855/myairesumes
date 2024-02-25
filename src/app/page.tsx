import styles from "./page.module.css";
import Title from "@/components/landing-page/title/Title";
import Blur from "@/components/landing-page/color-blur/Blur";
import HeroImage from "@/components/landing-page/hero-image/HeroImage";
import Navbar from "@/components/nav/Navbar";
import { validateRequest } from "@/features/authentication/lib/auth";
import { getUser } from "@/lib/user";
import BasicInfoModal from "@/components/landing-page/basic-info-modal/BasicInfoModal";

export default async function Home() {
    const { user } = await validateRequest();
    const currentUser = user ? await getUser(user.id) : null;
    const showModal =
        currentUser && Object.keys(currentUser.basicInfo).length === 0
            ? true
            : false;

    return (
        <main
            id="landingPage"
            className={styles.main}
            style={showModal ? { overflowY: "hidden" } : { overflowY: "auto" }}
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
