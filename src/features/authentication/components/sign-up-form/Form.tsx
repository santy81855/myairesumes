"use client";
import styles from "../shared/AuthForm.module.css";
import Link from "next/link";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState, type FormEvent } from "react";
import { signUpAction } from "@/features/authentication";

export default function Form() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const submitPressed = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if (page === 0) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) { setError("Please use a valid email address."); return; }
            if (!password || password !== confirmPassword) { setError("Please enter matching passwords."); return; }
            setPage(1);
            return;
        }
        if (!firstName.trim() || !lastName.trim()) { setError("Please enter your first and last name."); return; }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("email", emailAddress.trim());
        formData.append("password", password);
        formData.append("firstName", firstName.trim());
        formData.append("lastName", lastName.trim());
        try {
            const response = await signUpAction(formData);
            if (response?.error) { setError(response.error); setIsLoading(false); }
        } catch (error) { if (isRedirectError(error)) throw error; setError("We couldn’t create your account. Please try again."); setIsLoading(false); }
    };

    return (
        <form className={styles.form} onSubmit={submitPressed} aria-busy={isLoading}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</p>
                <h1>{page === 0 ? "Make your next move." : "Let’s make it yours."}</h1>
                <p className={styles.description}>{page === 0 ? "Create your account and give your experience a place to shine." : "Just your name, and you’re ready to get started."}</p>
            </div>
            <div className={styles.stepRow} aria-label={`Step ${page + 1} of 2`}><span className={styles.activeStep} /><span className={page === 1 ? styles.activeStep : ""} /><p>{page === 0 ? "01 / Account details" : "02 / A little about you"}</p></div>
            {page === 0 ? <>
                <Link href="/sign-in/google" className={styles.socialButton}><span className={styles.googleIcon} aria-hidden="true">G</span> Continue with Google</Link>
                <div className={styles.divider}>or sign up with email</div>
                <div className={styles.inputSection}><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} required /></div>
                <div className={styles.inputSection}><label htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
                <div className={styles.inputSection}><label htmlFor="confirmPassword">Confirm password</label><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Enter your password again" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></div>
            </> : <div className={styles.nameFields}>
                <div className={styles.inputSection}><label htmlFor="first">First name</label><input id="first" name="firstName" type="text" placeholder="First name" autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoFocus required /></div>
                <div className={styles.inputSection}><label htmlFor="last">Last name</label><input id="last" name="lastName" type="text" placeholder="Last name" autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} required /></div>
            </div>}
            {error && <p className={styles.notice} role="alert">{error}</p>}
            <button type="submit" className={styles.nextButton} disabled={isLoading}>{isLoading ? "Creating your account…" : <>{page === 0 ? "Continue" : "Create my account"} <span aria-hidden="true">↗</span></>}</button>
            {page === 1 && <button type="button" className={styles.textButton} disabled={isLoading} onClick={() => { setPage(0); setError(""); }}><span aria-hidden="true">←</span> Back to account details</button>}
            <p className={styles.switchAccount}>Already have an account? <Link href="/sign-in">Sign in</Link></p>
        </form>
    );
}
