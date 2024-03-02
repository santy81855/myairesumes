import styles from "./PriceOptions.module.css";
import Card from "@/components/pricing/price-card/Card";
import { getUser } from "@/lib/user";
import { getCustomerSubscription } from "@/lib/stripe";
import { validateRequest } from "@/features/authentication/lib/auth";
import { UpdateUrl } from "@/lib/updateUrl";
import Stripe from "stripe";

type PriceOptionsProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

const PriceOptions = async ({ searchParams }: PriceOptionsProps) => {
    const freemiumFeatures = [
        "1 job",
        "1 resume",
        "1 cover letter",
        "Access to basic templates",
        "Artificial intelligence helper",
    ];
    const proAvailableFeatures = [
        "Unlimited jobs",
        "Unlimited resumes",
        "Unlimited cover letters",
        "Access to all templates",
        "Artificial intelligence helper",
    ];
    const { user } = await validateRequest();
    const currentUser = user && (await getUser(user.id));
    const status = currentUser && currentUser.status;
    const subscription =
        status && status === "pro"
            ? ((await getCustomerSubscription(
                  currentUser.stripeCustomerId
              )) as Stripe.Subscription)
            : null;
    const isPro =
        subscription && subscription.items.data[0].plan.interval_count === 1
            ? true
            : false;
    const isSpecial =
        subscription && subscription.items.data[0].plan.interval_count === 6
            ? true
            : false;

    const isActive =
        subscription && subscription.cancel_at_period_end === false;
    const isCancelled =
        subscription && subscription.cancel_at_period_end === true;

    return (
        <main id="priceOptions" className={styles.container}>
            <div className={styles.freeCard}>
                <Card
                    key="freeCard"
                    title="FREE"
                    price="0"
                    accentColor="#008DD5"
                    isCurrentPlan={subscription === null}
                    unlockedFeatures={[]}
                    lockedFeatures={freemiumFeatures}
                    style={{ backgroundColor: "white", color: "black" }}
                    showButton={false} // never show upgrade button for free tier
                />
            </div>
            <div className={styles.specialCard}>
                <Card
                    key="proCardSpecial"
                    title="SPECIAL"
                    price="19.99"
                    rate="/6 months"
                    accentColor="#FDCA40"
                    isCurrentPlan={isSpecial}
                    unlockedFeatures={proAvailableFeatures}
                    lockedFeatures={[]}
                    style={{ backgroundColor: "#1E3888", color: "white" }}
                    specialText="Normally $30"
                    url={UpdateUrl(
                        searchParams ? searchParams : {},
                        [{ key: "special", value: "true" }],
                        "/pricing"
                    )}
                    showButton={subscription === null} // show the upgrade button if the user is free tier
                />
            </div>
            <div className={styles.proCard}>
                <Card
                    key="proCard"
                    title="PRO"
                    price="4.99"
                    rate="/month"
                    accentColor="#D35269"
                    isCurrentPlan={isPro}
                    unlockedFeatures={proAvailableFeatures}
                    lockedFeatures={[]}
                    style={{ backgroundColor: "white", color: "black" }}
                    url={UpdateUrl(
                        searchParams ? searchParams : {},
                        [{ key: "pro", value: "true" }],
                        "/pricing"
                    )}
                    showButton={subscription === null} // show the upgrade button if the user is free tier
                />
            </div>
        </main>
    );
};

export default PriceOptions;
