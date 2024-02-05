import styles from "./page.module.css";
import CheckoutButton from "@/components/subscription/checkout-button/CheckoutButton";
import CancelButton from "@/components/subscription/cancel-subscription-button/CancelButton";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSubscription } from "@/lib/subscription";
import { getUser } from "@/lib/user";
import {
    getAllCustomerSessions,
    getCustomerSubscriptions,
    getStripePaymentDetails,
} from "@/lib/stripe";
import { updatePayment } from "@/actions/stripe";

const Page = async () => {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/sign-in");
    }
    // Fetch subscription status using a revalidateTag so that the page will revalidate when the subscription status changes
    const res = await getSubscription(user.id);
    let subscription;
    if (!res.ok) {
        subscription = null;
    } else {
        subscription = await res.json();
    }
    const userRes = await getUser(user.id);
    let currentUser;
    if (!userRes.ok) {
        currentUser = null;
    } else {
        currentUser = await userRes.json();
    }

    const data = await getAllCustomerSessions(currentUser.stripeCustomerId);
    const subscriptionData = (await getCustomerSubscriptions(
        currentUser.stripeCustomerId
    )) as any;
    console.log(subscriptionData);

    if (subscriptionData) {
        const paymentData = await getStripePaymentDetails(
            subscriptionData.default_payment_method
        );
    }
    const updatePaymentStripe = updatePayment.bind(
        null,
        currentUser.stripeCustomerId,
        subscriptionData?.id
    );

    return (
        <main className={styles.main}>
            {currentUser?.status === "free" ? (
                <>
                    <p>BUY PLS</p>
                    <CheckoutButton />
                </>
            ) : (
                <>
                    <p>DONT CANCEL PLS</p>
                    <CancelButton />
                    <form action={updatePaymentStripe}>
                        <button type="submit">update</button>
                    </form>
                </>
            )}
        </main>
    );
};

export default Page;
