import styles from "./DocumentContainer.module.css";

const DocumentContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>{children}</section>
        </section>
    );
};

export default DocumentContainer;
