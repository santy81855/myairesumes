import styles from "./SpecialModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import { createSpecialSubscription } from "@/actions/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { checkIcon, unlockIcon } from "@/components/icons/iconSVG";
import { validateRequest } from "@/features/authentication/lib/auth";
import FormLoading from "@/components/form-loading/FormLoading";

type UpgradeModalProps = {
    returnUrl: string;
};
const SpecialModal = async ({ returnUrl }: UpgradeModalProps) => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{unlockIcon}</div>
                <h1 className={styles.title}>Unlock Your Account</h1>
                <section className={styles.benefitsContainer}>
                    <p className={styles.subTitle}>
                        Upgrading to the <span>Pro</span> plan with this
                        discount deal will give you access to:
                    </p>
                    <section className={styles.list}>
                        <section className={styles.listItem}>
                            <div className={styles.checkIconContainer}>
                                {checkIcon}
                            </div>
                            <p className={styles.text}>Unlimited jobs</p>
                        </section>
                        <section className={styles.listItem}>
                            <div className={styles.checkIconContainer}>
                                {checkIcon}
                            </div>
                            <p className={styles.text}>Unlimited resumes</p>
                        </section>
                        <section className={styles.listItem}>
                            <div className={styles.checkIconContainer}>
                                {checkIcon}
                            </div>
                            <p className={styles.text}>
                                Unlimited cover letters
                            </p>
                        </section>
                        <section className={styles.listItem}>
                            <div className={styles.checkIconContainer}>
                                {checkIcon}
                            </div>
                            <p className={styles.text}>
                                Access to every template
                            </p>
                        </section>
                    </section>
                </section>

                <p className={styles.text}>
                    Click <span className={styles.continueText}>Continue</span>{" "}
                    to upgrade or click{" "}
                    <span className={styles.cancelText}>Cancel</span> to go
                    back.
                </p>
                <form
                    className={styles.form}
                    action={createSpecialSubscription}
                >
                    <Link href={returnUrl} className={styles.cancelButton}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.button}>
                        Continue
                    </button>
                    <FormLoading />
                </form>
            </section>
        </StaticModal>
    );
};

export default SpecialModal;
