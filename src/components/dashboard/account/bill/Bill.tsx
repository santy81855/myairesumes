import styles from "./Bill.module.css";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import {
    getCustomerSubscriptions,
    getStripePaymentDetails,
    getStripeSessionUpdatePayment,
} from "@/lib/stripe";
import Stripe from "stripe";
import {
    calendarIcon,
    priceIcon,
    debitCardIcon,
} from "@/components/icons/iconSVG";
import Link from "next/link";

type BillProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Bill = async ({ currentUser, searchParams }: BillProps) => {
    const { status } = currentUser;
    let upcomingBill = null;
    let subscription = null;
    let paymentDetails = null;
    if (status !== "free") {
        subscription = (await getCustomerSubscriptions(
            currentUser.stripeCustomerId
        )) as Stripe.Subscription;
        if (subscription) {
            paymentDetails = await getStripePaymentDetails(
                subscription.default_payment_method as string
            );
            console.log("paymentDetails", paymentDetails);
        }
    }
    let paymentInfo = null;
    if (paymentDetails) {
        const type = paymentDetails.type;
        if (type === "card") {
            const card = paymentDetails.card as Stripe.PaymentMethod.Card;
            paymentInfo = {
                // capitalize the first letter of the brand
                name: card.brand
                    ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1)
                    : "Card",
                info: `**** **** **** ${card.last4}`,
            };
        }
        if (type === "cashapp") {
            const cashapp =
                paymentDetails.cashapp as Stripe.PaymentMethod.Cashapp;
            paymentInfo = { name: "CashApp", info: cashapp.cashtag };
        }
    }

    return (
        <Card gridArea="bill" title="Upcoming Bill">
            {!subscription ? (
                <p className={styles.noSubscriptionText}>
                    No upcoming bill. You are on the free plan.
                </p>
            ) : (
                <section className={styles.container}>
                    <section className={styles.list}>
                        <section className={styles.itemContainer}>
                            <section className={styles.item}>
                                <div className={styles.iconContainer}>
                                    {calendarIcon}
                                </div>
                                <p className={styles.text}>Renews</p>
                            </section>
                            <p className={styles.subText}>
                                {" "}
                                {new Date(
                                    subscription.current_period_end * 1000
                                ).toLocaleString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </section>
                        <section className={styles.itemContainer}>
                            <section className={styles.item}>
                                <div className={styles.iconContainer}>
                                    {debitCardIcon}
                                </div>
                                <p className={styles.text}>Source</p>
                                <Link
                                    href="/dashboard?menu=account&editPayment=true"
                                    className={styles.updateLink}
                                >
                                    (Update)
                                </Link>
                            </section>
                            <section className={styles.paymentInfo}>
                                <p className={styles.paymentTextTitle}>
                                    {paymentInfo?.name}:
                                </p>
                                <p className={styles.paymentText}>
                                    {paymentInfo?.info}
                                </p>
                            </section>
                        </section>
                        <section className={styles.itemContainer}>
                            <section className={styles.item}>
                                <div className={styles.iconContainer}>
                                    {priceIcon}
                                </div>
                                <p className={styles.text}>Total</p>
                            </section>
                            <p className={styles.subText}>$4.99</p>
                        </section>
                    </section>
                </section>
            )}
        </Card>
    );
};

export default Bill;
