"use client";
import styles from "../shared/AuthForm.module.css";
import Link from "next/link";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState, type FormEvent } from "react";
import { resetPasswordAction } from "@/features/authentication";

export default function Card({ token }: { token: string }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const submitPressed = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (!password || password !== confirmPassword) { setError("Please enter matching passwords."); return; }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("password", password);
        try {
            const response = await resetPasswordAction(formData, token);
            if (response?.error) { setError(response.error); setIsLoading(false); }
        } catch (error) { if (isRedirectError(error)) throw error; setError("We couldn’t reset your password. Please try again."); setIsLoading(false); }
    };
    return (
        <form className={styles.form} onSubmit={submitPressed} aria-busy={isLoading}>
            <span className={styles.statusIcon} aria-hidden="true"><i className="fa-solid fa-lock" /></span>
            <div className={styles.heading}><p className={styles.eyebrow}>A FRESH START</p><h1>Set a new password.</h1><p className={styles.description}>Choose a new password for your account, and get back to what’s next.</p></div>
            <div className={styles.inputSection}><label htmlFor="password">New password</label><input type="password" name="password" id="password" placeholder="Create a new password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
            <div className={styles.inputSection}><label htmlFor="confirmPassword">Confirm new password</label><input type="password" name="confirmPassword" id="confirmPassword" placeholder="Enter your new password again" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></div>
            {error && <p className={styles.notice} role="alert">{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={isLoading}>{isLoading ? "Updating your password…" : "Update password"}<span aria-hidden="true">↗</span></button>
            <Link href="/sign-in" className={styles.backLink}><span aria-hidden="true">←</span> Back to sign in</Link>
        </form>
    );
}
