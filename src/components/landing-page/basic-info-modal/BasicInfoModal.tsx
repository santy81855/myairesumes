import styles from "./BasicInfoModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import Link from "next/link";
import { magicResumeLogo } from "@/components/icons/iconSVG";

const BasicInfoModal = () => {
    return (
        <StaticModal>
            <section className={styles.modalContent}>
                <div className={styles.logo}>{magicResumeLogo}</div>
                <h1 className={styles.title}>Welcome to Magic Resume</h1>
                <p className={styles.text}>
                    To get started on your personalized resumes and cover
                    letters, we&apos;d love to learn a bit more about you.
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
