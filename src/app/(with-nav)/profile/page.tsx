import styles from "./page.module.css";
import CheckoutButton from "@/components/subscription/checkout-button/CheckoutButton";
import CancelButton from "@/components/subscription/cancel-subscription-button/CancelButton";
import { validateRequest } from "@/lib/auth";

const Page = async () => {
    const { user } = await validateRequest();
    if (!user) {
        return { redirect: { destination: "/sign-in", permanent: false } };
    }
    // Fetch subscription status using a revalidateTag so that the page will revalidate when the subscription status changes
    const res = await fetch(
        `${process.env.APP_DOMAIN}/api/subscription?userId=${user.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: ["subscription"] },
        }
    );
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
