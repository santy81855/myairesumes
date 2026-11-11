"use client";
import styles from "../shared/AuthForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendEmailVerificationAction } from "@/features/authentication";

export default function Card() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const resendClicked = async () => {
        setIsLoading(true); setError(""); setMessage("");
        try {
            const response = await resendEmailVerificationAction();
            if (response.success) { setMessage("A new verification link is on its way. Check your inbox and spam folder."); }
            else if (response.error) { setError(response.error); }
        } catch { setError("We couldn’t send the link. Please try again."); }
        setIsLoading(false);
    };
    return (
        <section className={styles.container} aria-busy={isLoading}>
            <span className={styles.statusIcon} aria-hidden="true"><i className="fa-regular fa-envelope" /></span>
            <div className={styles.heading}><p className={styles.eyebrow}>ONE LAST LITTLE STEP</p><h1>You’ve got mail.</h1><p className={styles.description}>Follow the verification link in your inbox to finish setting up your account. Then come back here to continue.</p></div>
            {error && <p className={styles.notice} role="alert">{error}</p>}
            {message && <p className={styles.success} role="status">{message}</p>}
            <button type="button" className={styles.submitButton} onClick={() => router.refresh()}>I’ve verified my email <span aria-hidden="true">↗</span></button>
            <div className={styles.resendContainer}><p>No email yet? Check your spam folder.</p><button type="button" className={styles.textButton} onClick={resendClicked} disabled={isLoading}>{isLoading ? "Sending your link…" : "Send a new verification link"}</button></div>
        </section>
    );
}
