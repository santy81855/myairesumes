import VideoEmbed from "@/components/landing-page/video-embed/VideoEmbed";
import Link from "next/link";
import styles from "./Tutorials.module.css";

export default function Tutorials() {
    return (
        <section className={styles.container} aria-labelledby="tutorial-heading">
            <div className={styles.intro}><p className={styles.eyebrow}>THE WALKTHROUGH</p><h2 id="tutorial-heading">See how it<br /><em>comes together.</em></h2><p>Learn how to use our platform to its full potential with these video tutorials.</p><Link href="/help-center?option=faqs">Explore questions & answers <span aria-hidden="true">↗</span></Link></div>
            <article className={styles.tutorial}>
                <div className={styles.videoContainer}><VideoEmbed link="miexUYMx4tM" /></div>
                <div className={styles.tutorialText}><span className={styles.number}>01 / GETTING STARTED</span><h3>Introduction</h3><p>Get an overview of the platform and its features. Get an idea of how to navigate the platform in order to create and manage your job applications.</p><a href="https://www.youtube.com/watch?v=miexUYMx4tM" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a></div>
            </article>
        </section>
    );
}
