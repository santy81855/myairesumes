import styles from "./Title.module.css";
import Link from "next/link";
import Image from "next/image";

const Title = () => {
    return (
        <section className={styles.textContainer}>
            <p className={styles.description}>AI Resume Builder</p>
            <h1 className={styles.title}>
                Effortlessly Craft Tailored Resumes for Every Job - Outshine
                with Ease!
            </h1>
            <p className={styles.subtitle}>
                Harness the power of artificial intelligence to tailor your
                resume uniquely for each job, significantly enhancing your
                prospects of landing the job.
            </p>
            <section className={styles.linkContainer}>
                <Link
                    href="/sign-up"
                    className={`${styles.linkLeft} ${styles.link}`}
                >
                    <p>Get Started</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <Link
                    href="/sign-up"
                    className={`${styles.linkRight} ${styles.link}`}
                >
                    <p>Learn More</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </section>
            <div className={styles.squiggleArrow}></div>
        </section>
    );
};

export default Title;
