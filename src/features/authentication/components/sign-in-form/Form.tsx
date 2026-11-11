"use client";
import styles from "../shared/AuthForm.module.css";
import Link from "next/link";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState, type FormEvent } from "react";
import { signInAction } from "@/features/authentication";

export default function Form() {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const submitPressed = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (!emailAddress.trim() || !password) { setError("Please enter your email and password."); return; }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("email", emailAddress.trim());
        formData.append("password", password);
        try {
            const response = await signInAction(formData);
            if (response?.error) { setError(response.error); setIsLoading(false); }
        } catch (error) { if (isRedirectError(error)) throw error; setError("We couldn’t sign you in. Please try again."); setIsLoading(false); }
    };

    return (
        <form className={styles.form} onSubmit={submitPressed} aria-busy={isLoading}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>PICK UP WHERE YOU LEFT OFF</p>
                <h1>Welcome back.</h1>
                <p className={styles.description}>Your next chapter is waiting. Sign in to your workspace.</p>
            </div>
            <Link href="/sign-in/google" className={styles.socialButton}><span className={styles.googleIcon} aria-hidden="true">G</span> Continue with Google</Link>
            <div className={styles.divider}>or sign in with email</div>
            <div className={styles.inputSection}>
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} required />
            </div>
            <div className={styles.inputSection}>
                <div className={styles.labelRow}><label htmlFor="password">Password</label><Link href="/password-reset">Forgot password?</Link></div>
                <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error && <p className={styles.notice} role="alert">{error}</p>}
            <button type="submit" className={styles.nextButton} disabled={isLoading}>{isLoading ? "Signing you in…" : <>Sign in <span aria-hidden="true">↗</span></>}</button>
            <p className={styles.switchAccount}>New here? <Link href="/sign-up">Create an account</Link></p>
        </form>
    );
}
