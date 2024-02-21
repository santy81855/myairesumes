"use client";
import styles from "./SectionContainerEditor.module.css";

const SectionContainerEditor = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.addButton}></div>
            {children}
        </div>
    );
};

export default SectionContainerEditor;
