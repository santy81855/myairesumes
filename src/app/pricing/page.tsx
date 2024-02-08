import styles from "./page.module.css";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";
import UpgradeModal from "@/components/modals/payment/upgrade-plan-modal/UpgradeModal";
import SpecialModal from "@/components/modals/payment/upgrade-special/SpecialModal";

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const pro = searchParams?.pro || false;
    const special = searchParams?.special || false;
    return (
        <main id="pricingPage" className={styles.main}>
            <section className={styles.content}>
                <section className={styles.titleContainer}>
                    <h1>Choose your plan</h1>
                    <p>
                        Creating customized resumes for every application will
                        drastically increase your chances of getting hired.
                        Choose the best plan for you and start creating resumes
                        today!
                    </p>
                </section>
                <section className={styles.priceSection}>
                    <PriceOptions searchParams={searchParams} />
                </section>
            </section>
            {pro && <UpgradeModal returnUrl="/pricing" />}
            {special && <SpecialModal returnUrl="/pricing" />}
        </main>
    );
};

export default Page;
