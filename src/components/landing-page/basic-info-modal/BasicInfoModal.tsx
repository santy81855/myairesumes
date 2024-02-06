import styles from "./BasicInfoModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import Link from "next/link";
import { magicResumeLogo } from "@/components/icons/iconSVG";
import { initializeUserBasicInfo } from "@/actions/user";

type BasicInfoModalProps = {
    currentUser: any;
};

const BasicInfoModal = ({ currentUser }: BasicInfoModalProps) => {
    const updateBasicInfo = initializeUserBasicInfo.bind(null, currentUser);
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
                <form className={styles.form} action={updateBasicInfo}>
                    <button type="submit" className={styles.button}>
                        Get Started
                    </button>
                </form>
            </section>
        </StaticModal>
    );
};

export default BasicInfoModal;
