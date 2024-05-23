"use client";
import styles from "./Tutorials.module.css";
import VideoEmbed from "@/components/landing-page/video-embed/VideoEmbed";

const Tutorials = () => {
    return (
        <section className={styles.tutorialContainer}>
            <section className={styles.titleContainer}>
                <h1 className={styles.title}>Video Tutorials</h1>
                <p className={styles.description}>
                    Learn how to use our platform to its full potential with
                    these video tutorials.
                </p>
            </section>
            <div className={styles.horizontalLine}></div>
            <section className={styles.tutorial}>
                <section className={styles.titleContainer}>
                    <p className={styles.tutorialTitle}>Introduction</p>
                    <p className={styles.tutorialDescription}>
                        Get an overview of the platform and its features.
                    </p>
                </section>
                <VideoEmbed link="miexUYMx4tM" />
            </section>
        </section>
    );
};

export default Tutorials;
