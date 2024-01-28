import Image from "next/image";
import styles from "./page.module.css";
import Resume from "@/components/landing-page/resume/Resume";
import Title from "@/components/landing-page/title/Title";
import Blur from "@/components/landing-page/color-blur/Blur";
import HeroImage from "@/components/landing-page/hero-image/HeroImage";

export default function Home() {
    const resume = (
        <section className={styles.heroResume}>
            <Resume />
        </section>
    );
    return (
        <main className={styles.main}>
            <section className={styles.heroSection}>
                <section className={styles.heroSectionText}>
                    <Title />
                </section>
                <Blur />
                <HeroImage />
            </section>
        </main>
    );
}
