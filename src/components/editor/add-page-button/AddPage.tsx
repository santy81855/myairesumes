"use client";
import styles from "./AddPage.module.css";

type AddPageProps = {
    resumeId: string;
};
const AddPage = ({ resumeId }: AddPageProps) => {
    return (
        <form className={styles.container}>
            <button type="submit" className={styles.button}>
                + Add a new page
            </button>
        </form>
    );
};

export default AddPage;
