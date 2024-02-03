import styles from "./Work.module.css";
import { plusIcon } from "@/components/icons/iconSVG";

type WorkProps = {
    currentUser: any;
};

const Work = ({ currentUser }: WorkProps) => {
    const { imageUrl, basicInfo, firstName, lastName, email } = currentUser;
    const url = imageUrl || "/images/icons/default-profile-picture.svg";
    const name = `${firstName} ${lastName}`;
    const phone = basicInfo ? basicInfo.phone : "(123) 456-7890";
    const website = basicInfo ? basicInfo.website : "www.example.com";

    return (
        <section className={styles.workSection}>
            <p className={styles.title}>Work</p>
            <section className={styles.workGrid}>
                <section className={styles.workItem}>
                    <p className={styles.company}>Example Company Name</p>
                    <p className={styles.position}>Example Position</p>
                    <section className={styles.dateRange}>
                        <p className={styles.startDate}>Jan 2020{" - "}</p>
                        <p className={styles.endDate}>Present</p>
                    </section>
                </section>
                <section className={styles.workItem}>
                    <p className={styles.company}>Example Company Name</p>
                    <p className={styles.position}>Example Position</p>
                    <section className={styles.dateRange}>
                        <p className={styles.startDate}>Jan 2020{" - "}</p>
                        <p className={styles.endDate}>Present</p>
                    </section>
                </section>
                <section className={styles.workItem}>
                    <p className={styles.company}>Example Company Name</p>
                    <p className={styles.position}>Example Position</p>
                    <section className={styles.dateRange}>
                        <p className={styles.startDate}>Jan 2020{" - "}</p>
                        <p className={styles.endDate}>Present</p>
                    </section>
                </section>
                <section className={styles.workItem}>
                    <p className={styles.company}>Example Company Name</p>
                    <p className={styles.position}>Example Position</p>
                    <section className={styles.dateRange}>
                        <p className={styles.startDate}>Jan 2020{" - "}</p>
                        <p className={styles.endDate}>Present</p>
                    </section>
                </section>
                <button className={styles.addWorkButton}>
                    <div className={styles.svgContainer}>{plusIcon}</div>
                </button>
            </section>
        </section>
    );
};

export default Work;
