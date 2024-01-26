"use client";
import styles from "./Card.module.css";
import { ToastContainer, toast } from "react-toastify";

type CardProps = {
    session: any;
};

const Card = ({ session }: CardProps) => {
    const resendClicked = async () => {
        const formData = new FormData();
        const response = await fetch("/api/email-verification", {
            method: "POST",
            body: formData,
            redirect: "manual",
        });

        if (response.status === 0) {
            toast.success("Email verification link sent.");
        }
    };
    return (
        <section className={styles.container}>
            <i className="fa-solid fa-envelope"></i>
            <h1>Email Verification</h1>
            <p>Your email verification link was sent to your email inbox.</p>
            <p>Click the link in the email to verify your account.</p>
            <section className={styles.resendContainer}>
                <p>Didn't receive an email?</p>
                <button onClick={resendClicked}>Resend Email</button>
            </section>
        </section>
    );
};

export default Card;
