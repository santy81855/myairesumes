import styles from "./Title.module.css";
import Link from "next/link";
import Image from "next/image";

const Title = () => {
    return (
        <section className={styles.textContainer}>
            <h1 className={styles.title}>
                Writing Resumes Just Got Easier - Apply To Jobs Faster
            </h1>
            <p className={styles.subTitle}>
                My Resume Hero is a resume builder that uses AI to help you
                create a resume that stands out.
            </p>
            <section className={styles.linkContainer}>
                <Link
                    href="/sign-up"
                    className={`${styles.linkLeft} ${styles.link}`}
                >
                    <p>Get Started</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </section>

            <div className={styles.squiggleArrow}></div>
        </section>
    );
};

export default Title;
