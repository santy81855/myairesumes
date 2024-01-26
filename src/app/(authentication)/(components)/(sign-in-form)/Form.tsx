"use client";
import styles from "./Form.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Form = () => {
    const [page, setPage] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const submitPressed = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", emailAddress);
        formData.append("password", password);
        const response = await fetch("/api/sign-in", {
            method: "POST",
            body: formData,
            redirect: "manual",
        });

        if (response.status === 0) {
            // redirected
            // when using `redirect: "manual"`, response status 0 is returned
            return router.refresh();
        } else {
            toast.warning("Invalid credentials.");
        }
    };

    return (
        <>
            <section className={styles.optionsContainer}>
                <Link
                    href="/sign-up"
                    className={`${styles.optionButton} ${styles.unselected}`}
                >
                    Sign-Up
                </Link>
                <Link
                    href="/sign-in"
                    className={`${styles.optionButton} ${styles.selected}`}
                >
                    Sign-In
                </Link>
            </section>
            <form className={styles.form} onSubmit={submitPressed}>
                <h1>Sign In</h1>
                <Link href="/sign-in/google" className={styles.socialButton}>
                    <i className="fa-brands fa-google"></i>Sign In with Google
                </Link>
                <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <p>or</p>
                    <div className={styles.line}></div>
                </div>
                <section className={styles.inputSection}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(event) => {
                            setEmailAddress(event.target.value);
                        }}
                    />
                </section>
                <section className={styles.inputSection}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </section>

                <button
                    type="submit"
                    className={styles.nextButton}
                    disabled={emailAddress === "" || password === ""}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Form;
