"use client";
import React, { useState } from "react";
import styles from "./CookiesModal.module.css";

const CookiesModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleContinue = () => {
        // Handle cookie consent logic here, e.g., set a cookie or local storage
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <p className={styles.message}>
                    This website uses cookies to ensure you get the best
                    experience on our site and to keep you logged in. By
                    continuing to use this site, you agree to our use of
                    cookies.
                </p>
                <button className={styles.button} onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CookiesModal;
