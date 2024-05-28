import styles from "./Title.module.css";
import Link from "next/link";
import { validateRequest } from "@/features/authentication/lib/auth";

const Title = async () => {
    const { user } = await validateRequest();
    return (
        <section className={styles.textContainer}>
            <h1 className={styles.title}>Applying to Jobs Just Got Easier</h1>
            <p className={styles.subTitle}>
                My Resume Hero is a job application manager that helps you keep
                track of your job applications, and create and manage resumes
                and cover letters with the help of an AI assistant.
            </p>
            <section className={styles.linkContainer}>
                <Link
                    href={
                        user
                            ? "/dashboard?menu=jobs&documentPage=1"
                            : "/sign-up"
                    }
                    className={`${styles.linkLeft} ${styles.link}`}
                >
                    {user ? <p>Go to Dashboard</p> : <p>Get Started</p>}
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </section>

            <div className={styles.squiggleArrow}></div>
        </section>
    );
};

export default Title;
