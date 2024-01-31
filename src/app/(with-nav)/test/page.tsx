import styles from "./page.module.css";
import CheckoutButton from "@/components/subscription/checkout-button/CheckoutButton";

const Page = () => {
    return (
        <main className={styles.main}>
            <p>BUY PLS</p>
            <CheckoutButton />
        </main>
    );
};

export default Page;
