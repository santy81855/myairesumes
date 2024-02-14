import styles from "./TitleBar.module.css";
import { downloadIcon } from "@/components/icons/iconSVG";

const TitleBar = () => {
    return (
        <section className={styles.container}>
            <p className={styles.title}>Resume Title</p>
            <div className={styles.iconContainer}>{downloadIcon}</div>
        </section>
    );
};

export default TitleBar;
