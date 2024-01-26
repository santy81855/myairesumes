"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type CardProps = {
    session: any;
};

const Card = ({ session }: CardProps) => {
    const resendClicked = async () => {
        axios
            .post("/api/email-verification")
            .then((response) => {
                toast.success("Email verification link sent.");
            })
            .catch((error) => {
                toast.warning("An unknown error occurred.");
            });
    };
    return (
        <section className={styles.container}>
            <i className="fa-solid fa-envelope"></i>
            <h1>Email Verification</h1>
            <p>Your email verification link was sent to your email inbox.</p>
            <p>Click the link in the email to verify your account.</p>
            <p>
                Refresh the page if you have already clicked the verification
                link.
            </p>
            <section className={styles.resendContainer}>
                <p>Didn't receive an email?</p>
                <button onClick={resendClicked}>Resend Email</button>
            </section>
        </section>
    );
};

export default Card;
