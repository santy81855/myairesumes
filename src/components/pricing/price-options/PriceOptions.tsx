import styles from "./PriceOptions.module.css";
import Card from "@/components/pricing/price-card/Card";

const PriceOptions = () => {
    const freeAvailableFeatures = [
        "Create 1 job",
        "Create 1 resume",
        "Create 1 cover letter",
        "Access to two templates",
    ];
    const freeLockedFeatures = [
        "Unlimited jobs",
        "Unlimited resumes",
        "Unlimited cover letters",
        "Access to all templates",
    ];
    const proAvailableFeatures = [
        "Unlimited jobs",
        "Unlimited resumes",
        "Unlimited cover letters",
        "Access to all templates",
    ];
    /*
            <Card
                key="proCardSpecial"
                title="SPECIAL"
                price="19.99"
                rate="/6 months"
                accentColor="#F0BD39"
                isCurrentPlan={true}
                unlockedFeatures={proAvailableFeatures}
                lockedFeatures={[]}
                style={{ backgroundColor: "7963FF", color: "black" }}
            />
            <Card
                key="proCard"
                title="PRO"
                price="19.99"
                rate="/month"
                accentColor="#AD6CFF"
                isCurrentPlan={false}
                unlockedFeatures={proAvailableFeatures}
                lockedFeatures={[]}
                style={{ backgroundColor: "white", color: "black" }}
            />
*/

    return (
        <main id="priceOptions" className={styles.container}>
            <Card
                key="freeCard"
                title="FREE"
                price="0"
                accentColor="#899CFF"
                isCurrentPlan={true}
                unlockedFeatures={freeAvailableFeatures}
                lockedFeatures={freeLockedFeatures}
                style={{ backgroundColor: "white", color: "black" }}
            />
            <Card
                key="proCardSpecial"
                title="SPECIAL"
                price="19.99"
                rate="/6 months"
                accentColor="#F0BD39"
                isCurrentPlan={false}
                unlockedFeatures={proAvailableFeatures}
                lockedFeatures={[]}
                style={{ backgroundColor: "#7963FF", color: "white" }}
                specialText="Normally $30"
            />
            <Card
                key="proCard"
                title="PRO"
                price="19.99"
                rate="/month"
                accentColor="#AD6CFF"
                isCurrentPlan={false}
                unlockedFeatures={proAvailableFeatures}
                lockedFeatures={[]}
                style={{ backgroundColor: "white", color: "black" }}
            />
        </main>
    );
};

export default PriceOptions;
