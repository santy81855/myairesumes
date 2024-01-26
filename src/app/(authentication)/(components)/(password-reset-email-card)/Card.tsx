"use client";
import styles from "./Card.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

type CardProps = {
    session: any;
};

const Card = ({ session }: CardProps) => {
    const searchParams = useSearchParams();
    const hasSearched = searchParams.get("email");
    const [email, setEmail] = useState("");

    const submitPressed = async () => {
        const formData = new FormData();
        formData.append("email", email);
        const response = await fetch("/api/password-reset", {
            method: "POST",
            body: formData,
            redirect: "manual",
        });
        console.log(response);
        if (response.status === 0) {
            toast.success("Password reset link sent.");
        } else {
            toast.success("hello");
        }
    };
    return (
        <form className={styles.container} onSubmit={submitPressed}>
            <i className="fa-solid fa-lock"></i>
            <h1>Reset Password</h1>
            <section className={styles.inputSection}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </section>
            {hasSearched && (
                <p className={styles.alert}>
                    A password reset link has been sent to your email.
                </p>
            )}
            <button type="submit" className={styles.submitButton}>
                Continue
            </button>
        </form>
    );
};

export default Card;
