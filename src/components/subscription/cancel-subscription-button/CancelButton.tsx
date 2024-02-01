"use client";
import styles from "./CancelButton.module.css";
import { useState } from "react";
import Spinner from "@/components/loaders/Spinner/Spinner";
import { cancelSubscription } from "@/actions/stripe";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CancelButton = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await cancelSubscription();
        if (response.error) {
            setIsLoading(false);
            toast.error(response.error);
            return;
        }
        if (response.success) {
            setIsLoading(false);
            toast.success(response.success);
            router.refresh();
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

export default CancelButton;
