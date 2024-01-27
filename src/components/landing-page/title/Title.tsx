import styles from "./Title.module.css";

const Title = () => {
    return (
        <>
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
        </>
    );
};

export default Title;
