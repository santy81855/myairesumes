import styles from "./page.module.css";
import Resume from "@/components/landing-page/resume/Resume";

const Page = () => {
    return (
        <main className={styles.main}>
            <section className={styles.resumeContainer}>
                <Resume key="resume-viewer" />
            </section>
        </main>
    );
};

export default Page;
