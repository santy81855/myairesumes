"use client";
import styles from "../shared/AuthForm.module.css";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { sendPasswordResetEmailAction } from "@/features/authentication";

export default function Card() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(Boolean(searchParams.get("email")));
    const [error, setError] = useState("");

    const submitPressed = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (!email.trim()) { setError("Please enter your email address."); return; }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("email", email.trim());
        try {
            const response = await sendPasswordResetEmailAction(formData);
            if (response.error) { setError(response.error); } else { setIsSent(true); }
        } catch { setError("We couldn’t send the link. Please try again."); }
        setIsLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={submitPressed} aria-busy={isLoading}>
            <span className={styles.statusIcon} aria-hidden="true"><i className={`fa-solid ${isSent ? "fa-envelope" : "fa-lock"}`} /></span>
            <div className={styles.heading}><p className={styles.eyebrow}>LET’S GET YOU BACK IN</p><h1>{isSent ? "Check your inbox." : "Forgot your password?"}</h1><p className={styles.description}>{isSent ? "We’ve sent a link to reset your password. Check your inbox and spam folder, then follow the link to continue." : "It happens. Enter the email address you use for your account, and we’ll send you a reset link."}</p></div>
            {isSent && <p className={styles.success} role="status">Your password reset link is on its way{email ? ` to ${email}` : ""}.</p>}
            <div className={styles.inputSection}><label htmlFor="email">Email address</label><input type="email" name="email" id="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
            {error && <p className={styles.notice} role="alert">{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={isLoading}>{isLoading ? "Sending your link…" : isSent ? "Send another reset link" : "Send reset link"}<span aria-hidden="true">↗</span></button>
            <Link href="/sign-in" className={styles.backLink}><span aria-hidden="true">←</span> Back to sign in</Link>
        </form>
    );
}
