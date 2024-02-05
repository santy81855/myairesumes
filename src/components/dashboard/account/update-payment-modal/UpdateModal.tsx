import styles from "./UpdateModal.module.css";
import { debitCardIcon } from "@/components/icons/iconSVG";
import StaticModal from "@/components/static-modal/StaticModal";
import { updatePayment } from "@/actions/stripe";
import { getCustomerSubscriptions } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import Link from "next/link";

type UpdateModalProps = {
    currentUser: any;
};

const UpdateModal = async ({ currentUser }: UpdateModalProps) => {
    const subscriptionData = (await getCustomerSubscriptions(
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
                    Click the{" "}
                    <span className={styles.continueText}>Continue</span> to
                    fill in your new payment details or click{" "}
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
