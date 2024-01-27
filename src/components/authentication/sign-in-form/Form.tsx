"use client";
import styles from "./Form.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spincube from "@/components/loaders/Spincube/Spincube";

const Form = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const submitPressed = async (event: any) => {
        event.preventDefault();
        if (emailAddress === "" || password === "") {
            toast.warning("Please enter your email and password.");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("email", emailAddress);
        formData.append("password", password);
        axios
            .post("/api/sign-in", formData)
            .then((response) => {
                return router.refresh();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.warning("Incorrect username or password.");
                    setIsLoading(false);
                    return;
                }
                toast.warning("An unknown error occurred.");
                setIsLoading(false);
            });
    };

    return (
        <>
            {isLoading && (
                <section className={styles.loadingBackground}>
                    <div className={styles.loaderContainer}>
                        <Spincube />
                    </div>
                </section>
            )}
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

                <button type="submit" className={styles.nextButton}>
                    Submit
                </button>
                <Link href="/password-reset" className={styles.forgotPassword}>
                    Forgot Password?
                </Link>
            </form>
        </>
    );
};

export default Form;
