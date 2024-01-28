import styles from "./Blur.module.css";

const Blur = () => {
    return (
        <>
            <div className={styles.blurLeft}></div>
            <div className={styles.blurRight}></div>
            <div className={styles.blurRight2}></div>
            <div className={styles.blurTop}></div>
            <div className={styles.blurMiddle}></div>
        </>
    );
};

export default Blur;
