import styles from "./Title.module.css";

const Title = () => {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>
                Artificial Intelligence Resume Builder
            </h1>
            <h2 className={styles.subtitle}>
                Create your perfect resume in <span>minutes</span> with the help
                of <span>AI.</span>
            </h2>
            <p className={styles.getStartedText}>
                Click on any section of the resume to enhance its content.
            </p>
        </div>
    );
};

export default Title;
