import Image from "next/image";
import styles from "./page.module.css";
import Resume from "@/components/landing-page/resume/Resume";
import Title from "@/components/landing-page/title/Title";

import { getPageSession } from "@/lib/session";

export default function Home() {
    const session = getPageSession();
    return (
        <main className={styles.main}>
            <section className={styles.heroSectionContainer}>
                <div className={styles.heroSection}>
                    <section className={styles.heroSectionText}>
                        <Title />
                    </section>
                    <section className={styles.heroResume}>
                        <Resume />
                    </section>
                </div>
            </section>
        </main>
    );
}
