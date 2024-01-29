"use client";
import styles from "./Button.module.css";
import React, { useState } from "react";
import Spinner from "@/components/loaders/Spinner/Spinner";
import { signout } from "@/actions/authentication";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Button = () => {
    const [isLoading, setIsLoading] = useState(false);
    const signOutPressed = async () => {
        setIsLoading(true);
        const response = await signout();
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        }
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <form
                    onSubmit={signOutPressed}
                    className={styles.buttonContainer}
                >
                    <button
                        type="submit"
                        className={styles.container}
                        onClick={signOutPressed}
                    >
                        Logout
                    </button>
                </form>
            )}
        </>
    );
};

export default Button;
