"use client";
import styles from "./Button.module.css";
import { useRouter } from "next/navigation";

const Button = () => {
    const router = useRouter();
    const signOutPressed = async () => {
        const response = await fetch("/api/sign-out", {
            method: "POST",
            redirect: "manual",
        });

        if (response.status === 0) {
            // redirected
            // when using `redirect: "manual"`, response status 0 is returned
            // go to /sign-in
            return router.push("/sign-in");
        }
    };

    return (
        <button className={styles.container} onClick={signOutPressed}>
            Logout
        </button>
    );
};

export default Button;
