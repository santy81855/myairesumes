import styles from "./Blur.module.css";

const Blur = () => {
    return (
        <>
            <div className={styles.blurMoving}></div>
            <div className={styles.blurLeft}></div>
            <div className={styles.blurRight}></div>
            <div className={styles.blurMiddle}></div>
            <div className={styles.blurRight2}></div>
            <div className={styles.blurTop}></div>
        </>
    );
};

export default Blur;
