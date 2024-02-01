import styles from "./page.module.css";
import CheckoutButton from "@/components/subscription/checkout-button/CheckoutButton";
import CancelButton from "@/components/subscription/cancel-subscription-button/CancelButton";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSubscription } from "@/lib/subscription";

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

    return (
        <main className={styles.main}>
            {!subscription ? (
                <>
                    <p>BUY PLS</p>
                    <CheckoutButton />
                </>
            ) : (
                <>
                    <p>DONT CANCEL PLS</p>
                    <CancelButton />
                </>
            )}
        </main>
    );
};

export default Page;
