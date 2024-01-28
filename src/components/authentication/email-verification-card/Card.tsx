"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Spincube from "@/components/loaders/Spincube/Spincube";
import { resendEmailVerification } from "@/actions/authentication";

const Card = () => {
    const [isLoading, setIsLoading] = useState(false);
    const resendClicked = async () => {
        setIsLoading(true);
        const response = await resendEmailVerification();
        if (response.success) {
            toast.success("Email verification link sent.");
            setIsLoading(false);
        } else if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
        }
    };
    return (
        <section className={styles.container}>
            {isLoading && (
                <section className={styles.loadingBackground}>
                    <div className={styles.loaderContainer}>
                        <Spincube />
                    </div>
                </section>
            )}
            <i className="fa-solid fa-envelope"></i>
            <h1>Email Verification</h1>
            <p>Your email verification link was sent to your email inbox.</p>
            <p>Click the link in the email to verify your account.</p>
            <p>
                Refresh the page if you have already clicked the verification
                link.
            </p>
            <section className={styles.resendContainer}>
                <p>Didn&apos;t receive an email?</p>
                <button onClick={resendClicked}>Resend Email</button>
            </section>
        </section>
    );
};

export default Card;
