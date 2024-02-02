import styles from "./BasicInfoModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import Link from "next/link";

const BasicInfoModal = () => {
    return (
        <StaticModal>
            <section className={styles.modalContent}>
                <i className={`fa-solid fa-address-card ${styles.icon}`}></i>
                <h1 className={styles.title}>Welcome to My AI Resumes</h1>
                <p className={styles.text}>
                    To get started on your personalized resumes and cover
                    letters, we'd love to learn a bit more about you.
                </p>
                <p className={styles.text}>
                    Click below to store some basic details to kickstart the
                    process!
                </p>
                <Link href="/dashboard?menu=profile" className={styles.button}>
                    <p>Get Started</p>
                </Link>
            </section>
        </StaticModal>
    );
};

export default BasicInfoModal;
