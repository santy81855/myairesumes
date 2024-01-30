import Image from "next/image";
import styles from "./page.module.css";
import Title from "@/components/landing-page/title/Title";
import Blur from "@/components/landing-page/color-blur/Blur";
import HeroImage from "@/components/landing-page/hero-image/HeroImage";
import Navbar from "@/components/nav/Navbar";

export default function Home() {
    return (
        <main id="landingPage" className={styles.main}>
            <section className={styles.heroSection}>
                <Navbar />
                <section className={styles.heroSectionText}>
                    <Title />
                </section>
                <Blur />
                <HeroImage />
            </section>
            <section className={styles.section}>hey</section>
        </main>
    );
}
