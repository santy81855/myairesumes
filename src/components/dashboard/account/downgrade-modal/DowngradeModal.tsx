import styles from "./DowngradeModal.module.css";
import StaticModal from "@/components/static-modal/StaticModal";
import { cancelSubscription } from "@/actions/stripe";
import { getCustomerSubscription } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";
import { checkIcon, lockIcon } from "@/components/icons/iconSVG";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";
import FormLoading from "@/components/form-loading/FormLoading";
import Form from "@/components/authentication/sign-up-form/Form";

const DowngradeModal = async () => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the current user
    const res = await getUser(user.id);
    const currentUser = await getUser(user.id);
    const subscriptionData = await getCustomerSubscription(
        currentUser.stripeCustomerId
    );
    if (!subscriptionData) {
        redirect("/dashboard?menu=account&invoicePage=1");
    }
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{lockIcon}</div>
                <h1 className={styles.title}>Downgrade Your Account</h1>
                <section className={styles.benefitsContainer}>
                    <p className={styles.subTitle}>
                        Keep your <span>Pro</span> plan to continue having
                        access to:
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
                    Once you downgrade, you will only have access to these
                    features for the remainder of your billing period, and then
                    you will go back to the free plan.
                </p>
                <p className={styles.text}>
                    Click <span className={styles.continueText}>Continue</span>{" "}
                    to downgrade or click{" "}
                    <span className={styles.cancelText}>Cancel</span> to go
                    back.
                </p>
                <form className={styles.form} action={cancelSubscription}>
                    <Link
                        href="/dashboard?menu=account&invoicePage=1"
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

export default DowngradeModal;
