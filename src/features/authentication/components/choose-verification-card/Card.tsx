"use client";
import styles from "./Card.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Spincube from "@/components/loaders/Spincube/Spincube";
import {
    resendEmailVerificationAction,
    resendEmailVerificationCodeAction,
    validateEmailVerificationCodeAction,
} from "@/features/authentication";
import VerificationInput from "react-verification-input";
import { useRouter } from "next/navigation";

const Card = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const resendClicked = async () => {
        setIsLoading(true);
        const response = await resendEmailVerificationCodeAction();
        if (response.success) {
            toast.success("Email verification link sent.");
            setIsLoading(false);
        } else if (response.error) {
            toast.error(
                "Error sending email verification link. Please try again."
            );
            setIsLoading(false);
        }
    };

    const codeEntered = async (value: string) => {
        setIsLoading(true);
        const response = await validateEmailVerificationCodeAction(value);
        if (response.success) {
            // redirect to home page
            router.push("/");
        } else if (response.error) {
            toast.error(response.error);
            setIsLoading(false);
        }
    };

    return (
        <section
            className={styles.container}
            onClick={() => {
                const inputElement = document.querySelector(
                    "input"
                ) as HTMLInputElement;
                if (inputElement) {
                    inputElement.focus();
                }
            }}
        >
            {isLoading && (
                <section className={styles.loadingBackground}>
                    <div className={styles.loaderContainer}>
                        <Spincube />
                    </div>
                </section>
            )}
            <i className="fa-solid fa-envelope"></i>
            <h1>Email Verification</h1>
            <p>
                An email with a verification code has been sent to your email
                address.
            </p>
            <p>
                Please check your inbox for the email containing the code and
                enter it here.
            </p>
            <VerificationInput
                length={5}
                placeholder=""
                validChars="0-9"
                onComplete={codeEntered}
                inputProps={{
                    inputMode: "numeric",
                    autoComplete: "one-time-code",
                }}
                autoFocus
                classNames={{
                    container: styles.verificationContainer,
                    character: styles.character,
                    characterInactive: styles.characterInactive,
                    characterSelected: styles.characterSelected,
                    characterFilled: styles.characterFilled,
                }}
            />
            <section className={styles.resendContainer}>
                <p>Didn&apos;t receive an email?</p>
                <button onClick={resendClicked}>Resend Email</button>
            </section>
        </section>
    );
};

export default Card;
