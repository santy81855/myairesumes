import styles from "./page.module.css";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";
import UpgradeModal from "@/components/modals/payment/upgrade-plan-modal/UpgradeModal";
import SpecialModal from "@/components/modals/payment/upgrade-special/SpecialModal";
import { validateRequest } from "@/lib/auth";
import { getUser } from "@/lib/user";

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { user } = await validateRequest();
    const currentUser = user && (await getUser(user.id));
    const status = currentUser && currentUser.status;

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
                        and cover letters today!
                    </p>
                </section>
                <section className={styles.priceSection}>
                    <PriceOptions searchParams={searchParams} />
                </section>
                {status && (
                    <p className={styles.infoMessage}>
                        *To manage your current subscription, visit your account
                        page in the dashboard.
                    </p>
                )}
            </section>
            {pro && <UpgradeModal returnUrl="/pricing" />}
            {special && <SpecialModal returnUrl="/pricing" />}
        </main>
    );
};

export default Page;
