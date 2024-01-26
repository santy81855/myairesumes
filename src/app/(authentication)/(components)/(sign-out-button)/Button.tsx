"use client";
import styles from "./Button.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "@/components/loaders/Spinner/Spinner";

const Button = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const signOutPressed = async () => {
        setIsLoading(true);
        axios.post("/api/sign-out").then((response) => {
            router.refresh();
        });
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <button className={styles.container} onClick={signOutPressed}>
                    Logout
                </button>
            )}
        </>
    );
};

export default Button;
