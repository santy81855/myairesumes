import Link from "next/link";
import styles from "./Card.module.css";
import { checkIcon } from "@/components/icons/iconSVG";

type CardProps = {
    title: string;
    price: string;
    style?: object;
    accentColor: string;
    isCurrentPlan: boolean;
    unlockedFeatures: string[];
    lockedFeatures: string[];
    rate?: string;
    specialText?: string;
    url?: string;
};

const Card = ({
    title,
    rate,
    price,
    style,
    accentColor,
    isCurrentPlan,
    unlockedFeatures,
    lockedFeatures,
    specialText,
    url,
}: CardProps) => {
    return (
        <main
            id="priceCard"
            className={styles.container}
            style={style ? style : {}}
        >
            <div
                className={styles.angledRectangle}
                style={{ backgroundColor: accentColor }}
            >
                <p>{title}</p>
            </div>
            {specialText && (
                <section className={styles.overflowHidden}>
                    <div className={styles.specialMessage}>
                        <p>{specialText}</p>
                    </div>
                </section>
            )}
            <section className={styles.textContainer}>
                <section className={styles.priceContainer}>
                    <p className={styles.price}>${price}</p>
                    <p className={styles.rate}>{rate}</p>
                </section>
                <section className={styles.featuresContainer}>
                    {unlockedFeatures.map((feature, index) => {
                        return (
                            <section className={styles.item}>
                                <div className={styles.greenIconContainer}>
                                    {checkIcon}
                                </div>
                                <p
                                    key={index}
                                    className={styles.unlockedFeature}
                                >
                                    {feature}
                                </p>
                            </section>
                        );
                    })}
                    {lockedFeatures.map((feature, index) => {
                        return (
                            <section className={styles.item}>
                                <div className={styles.redIconContainer}>
                                    {checkIcon}
                                </div>
                                <p
                                    key={index}
                                    className={styles.unlockedFeature}
                                >
                                    {feature}
                                </p>
                            </section>
                        );
                    })}
                </section>
            </section>
            {isCurrentPlan ? (
                <section className={styles.currentPlanContainer}>
                    <p className={styles.currentPlan}>
                        *You are currently subscribed to this plan.
                    </p>
                </section>
            ) : title === "FREE" ? null : (
                <section className={styles.buttonContainer}>
                    <Link
                        href={url ? url : "/pricing"}
                        className={styles.upgradeButton}
                        style={{ backgroundColor: accentColor }}
                    >
                        Upgrade
                    </Link>
                </section>
            )}
        </main>
    );
};

export default Card;
