import styles from "./page.module.css";
import Navbar from "@/components/nav/Navbar";
import { Footer } from "@/features/footer";
import { faqIcon, videoIcon } from "@/components/icons/iconSVG";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaqComponent, Tutorials } from "@/features/help-center";

const Home = async () => {
    return (
        <main id="landingPage" className={styles.main}>
            <section className={styles.heroSection}>
                <Navbar
                    style={{ backgroundColor: "transparent", color: "white" }}
                />
                <section className={styles.heroSectionText}>
                    <div className={styles.circle1}></div>
                    <div className={styles.circle2}></div>
                    <div className={styles.circle3}></div>
                    <h1 className={styles.helpTitle}>
                        Hello, how can we help you?
                    </h1>
                    <section className={styles.buttonContainer}>
                        <Link
                            href="/help-center?option=faqs"
                            className={`${styles.optionButton} ${styles.active}`}
                        >
                            {faqIcon}
                            <p className={styles.optionText}>FAQ&apos;s</p>
                        </Link>
                        <Link
                            href="/help-center?option=tutorials"
                            className={`${styles.optionButton} `}
                        >
                            {videoIcon}
                            <p className={styles.optionText}>Tutorials</p>
                        </Link>
                    </section>
                </section>
            </section>
            <section className={styles.contentSection}>
                {<FaqComponent />}
                {<Tutorials />}
            </section>
            <section className={styles.footerSection}>
                <Footer />
            </section>
        </main>
    );
};

export default Home;
