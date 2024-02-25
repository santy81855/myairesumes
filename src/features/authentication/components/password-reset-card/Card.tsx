"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Spincube from "@/components/loaders/Spincube/Spincube";
import { resetPasswordAction } from "@/features/authentication";

type CardProps = {
    token: string;
};

const Card = ({ token }: CardProps) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitPressed = async (event: any) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("password", password);
        const response = await resetPasswordAction(formData, token);
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        }
    };
    return (
        <>
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
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                <section className={styles.inputSection}>
                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </section>

                <button type="submit" className={styles.submitButton}>
                    Continue
                </button>
            </form>
        </>
    );
};

export default Card;
