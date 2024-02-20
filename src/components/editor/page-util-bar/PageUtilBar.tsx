"use client";
import styles from "./PageUtilBar.module.css";
import ReorderButton from "./reorder-button/ReorderButton";
import PageCounter from "./page-counter/PageCounter";

type PageUtilBarProps = {
    resumeId: string;
};
const PageUtilBar = ({ resumeId }: PageUtilBarProps) => {
    return (
        <section className={styles.container}>
            <ReorderButton />
            <PageCounter resumeId={resumeId} />
        </section>
    );
};

export default PageUtilBar;
