"use client";
import styles from "../shared/AuthForm.module.css";
import { useState } from "react";
import { resendEmailVerificationCodeAction, validateEmailVerificationCodeAction } from "@/features/authentication";
import VerificationInput from "react-verification-input";
import { useRouter } from "next/navigation";

export default function Card() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const resendClicked = async () => {
        setIsLoading(true); setError(""); setMessage("");
        try {
            const response = await resendEmailVerificationCodeAction();
            if (response.success) { setMessage("A fresh verification code is on its way. Check your inbox and spam folder."); }
            else if (response.error) { setError(response.error); }
        } catch { setError("We couldn’t send a new code. Please try again."); }
        setIsLoading(false);
    };
    const codeEntered = async (value: string) => {
        setIsLoading(true); setError(""); setMessage("");
        try {
            const response = await validateEmailVerificationCodeAction(value);
            if (response.success) { router.push("/"); router.refresh(); }
            else if (response.error) { setError(response.error); setIsLoading(false); }
        } catch { setError("We couldn’t verify the code. Please try again."); setIsLoading(false); }
    };

    return (
        <section className={styles.container} aria-busy={isLoading}>
            <span className={styles.statusIcon} aria-hidden="true"><i className="fa-regular fa-envelope" /></span>
            <div className={styles.heading}><p className={styles.eyebrow}>ONE LAST LITTLE STEP</p><h1>Check your inbox.</h1><p className={styles.description}>We’ve sent a five-digit verification code to your email. Enter it below to make your workspace yours.</p></div>
            <VerificationInput length={5} placeholder="" validChars="0-9" onComplete={codeEntered} inputProps={{ inputMode: "numeric", autoComplete: "one-time-code", "aria-label": "Five-digit email verification code", disabled: isLoading }} autoFocus classNames={{ container: styles.verificationContainer, character: styles.character, characterInactive: styles.characterInactive, characterSelected: styles.characterSelected, characterFilled: styles.characterFilled }} />
            {isLoading && <p className={styles.loadingText} role="status">Just a moment…</p>}
            {error && <p className={styles.notice} role="alert">{error}</p>}
            {message && <p className={styles.success} role="status">{message}</p>}
            <div className={styles.resendContainer}><p>No email yet? Check your spam folder.</p><button type="button" className={styles.textButton} onClick={resendClicked} disabled={isLoading}>Send a new code <span aria-hidden="true">↗</span></button></div>
        </section>
    );
}
