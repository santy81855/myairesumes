import styles from "./page.module.css";
import Button from "@/components/authentication/sign-out-button/Button";

export default function Home() {
    return (
        <main className={styles.main}>
            <Button />
        </main>
    );
}

// Compare this snippet from src/app/%28with-nav%29/account/page.tsx:
