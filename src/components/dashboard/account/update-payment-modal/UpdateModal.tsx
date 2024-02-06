import styles from "./UpdateModal.module.css";
import { debitCardIcon } from "@/components/icons/iconSVG";
import StaticModal from "@/components/static-modal/StaticModal";
import { updatePayment } from "@/actions/stripe";
import { getCustomerSubscription } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";

const UpdateModal = async () => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // get the current user
    const res = await getUser(user.id);
    const currentUser = await getUser(user.id);
    const subscriptionData = (await getCustomerSubscription(
        currentUser.stripeCustomerId
    )) as Stripe.Subscription;
    if (!subscriptionData) {
        redirect("/dashboard?menu=account");
    }
    const updatePaymentStripe = updatePayment.bind(
        null,
        currentUser.stripeCustomerId,
        subscriptionData?.id
    );
    return (
        <StaticModal>
            <section className={styles.container}>
                <div className={styles.iconContainer}>{debitCardIcon}</div>
                <h1 className={styles.title}>Update Payment Details</h1>
                <p className={styles.text}>
                    Update your payment details for your subscription with just
                    a click.
                </p>
                <p className={styles.text}>
                    Click <span className={styles.continueText}>Continue</span>{" "}
                    to fill in your new payment details or click{" "}
                    <span className={styles.cancelText}>Cancel</span> to go
                    back.
                </p>
                <form className={styles.form} action={updatePaymentStripe}>
                    <Link
                        href="/dashboard?menu=account"
                        className={styles.cancelButton}
                    >
                        Cancel
                    </Link>
                    <button type="submit" className={styles.button}>
                        Continue
                    </button>
                </form>
            </section>
        </StaticModal>
    );
};

export default UpdateModal;
