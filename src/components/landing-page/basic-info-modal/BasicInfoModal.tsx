import styles from "./BasicInfoModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import Link from "next/link";
import { initializeUserBasicInfoAction } from "@/features/dashboard";

type BasicInfoModalProps = {
    currentUser: any;
};

const BasicInfoModal = async ({ currentUser }: BasicInfoModalProps) => {
    const updateBasicInfo = initializeUserBasicInfoAction.bind(
        null,
        currentUser
    );
    return (
        <StaticModal>
            <section className={styles.modalContent}>
                <div className={styles.logo}></div>
                <h1 className={styles.title}>Welcome to My Resume Hero</h1>
                <p className={styles.text}>
                    Click below to go to your dashboard and learn how to use My
                    Resume Hero!
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
