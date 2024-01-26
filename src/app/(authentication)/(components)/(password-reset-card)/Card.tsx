"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type CardProps = {
    session: any;
    token: string;
};

const Card = ({ session, token }: CardProps) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitPressed = async (event: any) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match.");
            return;
        }
        const formData = new FormData();
        formData.append("password", password);
        const response = await fetch(`/api/password-reset/${token}`, {
            method: "POST",
            body: formData,
            redirect: "manual",
        });

        if (response.status === 0) {
            toast.success("Password reset successfully.");
            return router.push("/");
        }
    };
    return (
        <>
            <form className={styles.container} onSubmit={submitPressed}>
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
