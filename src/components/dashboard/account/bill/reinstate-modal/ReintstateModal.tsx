import styles from "./ReinstateModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import { reinstateSubscription } from "@/actions/stripe";
import { getCustomerSubscription } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";
import { checkIcon, unlockIcon } from "@/components/icons/iconSVG";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import FormLoading from "@/components/form-loading/FormLoading";

const ReinstateModal = async () => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the current user
    const currentUser = await getUser(user.id);
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{unlockIcon}</div>
                <h1 className={styles.title}>Reactivate Your Account</h1>
                <section className={styles.benefitsContainer}>
                    <p className={styles.subTitle}>
                        Reactivate your subscription to stay on the{" "}
                        <span>Pro</span> plan and keep access to:
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
                <p className={styles.smallText}>
                    Reactivating your subscription <span>will not</span> charge
                    you anything right now.{" "}
                </p>
                <p className={styles.smallText}>
                    It will simply reactivate your subscription, and you will be
                    charged on your next billing date.
                </p>
                <p className={styles.text}>
                    Click <span className={styles.continueText}>Continue</span>{" "}
                    to reactivate or click{" "}
                    <span className={styles.cancelText}>Cancel</span> to go
                    back.
                </p>
                <form className={styles.form} action={reinstateSubscription}>
                    <Link
                        href="/dashboard?menu=account"
                        className={styles.cancelButton}
                    >
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

export default ReinstateModal;
