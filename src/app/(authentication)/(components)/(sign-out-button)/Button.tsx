"use client";
import styles from "./Button.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Button = () => {
    const router = useRouter();
    const signOutPressed = async () => {
        axios.post("/api/sign-out").then((response) => {
            return router.push("/sign-in");
        });
    };

    return (
        <button className={styles.container} onClick={signOutPressed}>
            Logout
        </button>
    );
};

export default Button;
