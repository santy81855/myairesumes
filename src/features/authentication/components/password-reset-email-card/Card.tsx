"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Spincube from "@/components/loaders/Spincube/Spincube";
import { sendPasswordResetEmailAction } from "@/features/authentication";

const Card = () => {
    const searchParams = useSearchParams();
    const hasSearched = searchParams.get("email");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitPressed = async (e: any) => {
        e.preventDefault();
        if (email === "") {
            toast.warning("Please enter your email.");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("email", email);
        const response = await sendPasswordResetEmailAction(formData);
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        } else {
            toast.success("Password reset link sent.");
            setIsLoading(false);
        }
        /*
        axios
            .post("/api/password-reset", formData)
            .then((response) => {
                toast.success("Password reset link sent.");
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response.status === 400) {
                    toast.warning(
                        "That email is not registered to an account."
                    );
                    return;
                }
                toast.warning("An unknown error occurred.");
            });
        */
    };
    return (
        <form className={styles.container} onSubmit={submitPressed}>
            {isLoading && (
                <section className={styles.loadingBackground}>
                    <div className={styles.loaderContainer}>
                        <Spincube />
                    </div>
                </section>
            )}
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
