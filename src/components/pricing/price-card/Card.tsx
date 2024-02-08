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
                {title}
            </div>
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
                {isCurrentPlan && (
                    <p className={styles.currentPlan}>
                        *You are currently subscribed to this plan.
                    </p>
                )}
            </section>
        </main>
    );
};

export default Card;