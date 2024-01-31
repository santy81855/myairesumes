"use client";
import styles from "./CheckoutButton.module.css";
import { useState } from "react";
import Spinner from "@/components/loaders/Spinner/Spinner";
import { createSubscription } from "@/actions/stripe";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const checkout = await createSubscription();
        if (checkout.error) {
            setIsLoading(false);
            toast.error(checkout.error);
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className={styles.button}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <p className={styles.text}>SUBSCRIPTION</p>
                )}
            </button>
        </form>
    );
};

export default CheckoutButton;
