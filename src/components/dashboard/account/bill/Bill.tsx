import styles from "./Bill.module.css";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import {
    getCustomerSubscription,
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
import { UpdateUrl } from "@/lib/updateUrl";

type BillProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Bill = async ({ currentUser, searchParams }: BillProps) => {
    const { status } = currentUser;

    const subscription =
        status === "pro"
            ? await getCustomerSubscription(currentUser.stripeCustomerId)
            : null;
    const isActive =
        subscription && subscription.cancel_at_period_end === false;
    const isCancelled =
        subscription && subscription.cancel_at_period_end === true;
    const paymentDetails = isActive
        ? await getStripePaymentDetails(
              subscription.default_payment_method as string
          )
        : null;
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
    const subscriptionEndDate = isCancelled
        ? (subscription.cancel_at as number)
        : null;

    return (
        <Card key="bill-card" gridArea="bill" title="Upcoming Bill">
            {!subscription && (
                <p className={styles.noSubscriptionText}>
                    No upcoming bill. You are on the free plan.
                </p>
            )}
            {isCancelled && subscriptionEndDate && (
                <section className={styles.cancelledContainer}>
                    <p className={styles.noSubscriptionText}>
                        No upcoming bill. Your subscription is set to end on{" "}
                        {new Date(subscriptionEndDate * 1000).toLocaleString(
                            "en-US",
                            {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </p>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                { key: "menu", value: "account" },
                                { key: "reinstatePlan", value: "true" },
                            ],
                            "/dashboard"
                        )}
                        className={styles.renewButton}
                    >
                        Renew Subscription
                    </Link>
                </section>
            )}
            {isActive && (
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
                                    href={UpdateUrl(
                                        searchParams ? searchParams : {},
                                        [
                                            { key: "menu", value: "account" },
                                            {
                                                key: "editPayment",
                                                value: "true",
                                            },
                                        ],
                                        "/dashboard"
                                    )}
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
