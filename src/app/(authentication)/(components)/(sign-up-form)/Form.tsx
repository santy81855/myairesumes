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

    const nextButtonPressed = () => {
        var validEmail = true;
        var matchingPasswords = true;
        if (isValidEmail(emailAddress) === false) {
            validEmail = false;
        }
        if (
            password !== confirmPassword ||
            password === "" ||
            confirmPassword === ""
        ) {
            matchingPasswords = false;
        }
        if (validEmail === false && matchingPasswords === true) {
            toast.warning("Please use a valid email address.");
        }
        if (validEmail === true && matchingPasswords === false) {
            toast.warning("Passwords do not match.");
        }
        if (validEmail === false && matchingPasswords === false) {
            toast.warning(
                "Please use a valid email address and matching passwords."
            );
        }
        if (validEmail === true && matchingPasswords === true) {
            setPage(1);
        }
    };

    const isValidEmail = (email: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

    const googleClicked = () => {};

    const submitPressed = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
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
            toast.warning("Error creating account.");
        }
    };

    return (
        <>
            <section className={styles.optionsContainer}>
                <Link
                    href="/sign-up"
                    className={`${styles.optionButton} ${styles.selected}`}
                >
                    Sign-Up
                </Link>
                <Link
                    href="/sign-in"
                    className={`${styles.optionButton} ${styles.unselected}`}
                >
                    Sign-In
                </Link>
            </section>
            <form className={styles.form} onSubmit={submitPressed}>
                <h1>Sign Up</h1>
                <button
                    type="button"
                    className={styles.socialButton}
                    onClick={googleClicked}
                >
                    <i className="fa-brands fa-google"></i>Sign Up with Google
                </button>
                <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <p>or</p>
                    <div className={styles.line}></div>
                </div>
                {page === 0 && (
                    <>
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
                        <section className={styles.inputSection}>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
                                }}
                            />
                        </section>
                        <button
                            type="button"
                            className={styles.nextButton}
                            onClick={nextButtonPressed}
                        >
                            Next
                        </button>
                    </>
                )}
                {page === 1 && (
                    <>
                        <section className={styles.inputSection}>
                            <label htmlFor="first">First Name</label>
                            <input
                                id="first"
                                type="text"
                                placeholder="First Name"
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                        </section>
                        <section className={styles.inputSection}>
                            <label htmlFor="last">Last Name</label>
                            <input
                                id="last"
                                type="text"
                                placeholder="Last Name"
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                        </section>
                        <button
                            type="submit"
                            className={styles.nextButton}
                            disabled={firstName === "" || lastName === ""}
                        >
                            Submit
                        </button>
                    </>
                )}
            </form>
        </>
    );
};

export default Form;
