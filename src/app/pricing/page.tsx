import styles from "./page.module.css";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";

const Page = () => {
    return (
        <main id="pricingPage" className={styles.main}>
            <section className={styles.titleContainer}>
                <h1>Choose your plan</h1>
                <p>
                    Creating customized resumes for every application will
                    drastically increase your chances of getting hired. Choose
                    the best plan for you and start creating resumes today!
                </p>
            </section>
            <section className={styles.priceSection}>
                <PriceOptions />
            </section>
        </main>
    );
};

export default Page;
