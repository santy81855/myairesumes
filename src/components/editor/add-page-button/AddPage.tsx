import styles from "./AddPage.module.css";

const AddPage = () => {
    return (
        <form className={styles.container}>
            <button type="submit" className={styles.button}>
                + Add a new page
            </button>
        </form>
    );
};

export default AddPage;
