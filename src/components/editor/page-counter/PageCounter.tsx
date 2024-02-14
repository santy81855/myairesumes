import styles from "./PageCounter.module.css";

const PageCounter = () => {
    return (
        <section className={styles.container}>
            <p className={styles.pageCounter}>Page 1 of 1</p>
        </section>
    );
};

export default PageCounter;
