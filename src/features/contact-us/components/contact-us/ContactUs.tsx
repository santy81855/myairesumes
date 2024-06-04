"use client";
import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import {
    messageIcon,
    circledXIcon,
    sendIcon,
    homeIcon,
    faqIcon,
} from "@/components/icons/iconSVG";
import { motion, AnimatePresence } from "framer-motion";
import FaqComponentLandingPage from "@/components/landing-page/faq-section/FaqComponent";

const dropIn = {
    hidden: {
        transform: "scaleY(0)",
        opacity: 0,
        transformOrigin: "bottom",
        transition: {
            duration: 0.2,
        },
    },
    visible: {
        transform: "scaleY(1)",
        opacity: 1,
        transition: {
            duration: 0.2,
        },
        transformOrigin: "bottom",
    },
    exit: {
        transform: "scaleY(0)",
        height: 0,
        opacity: 0,
        transformOrigin: "bottom",
        transition: {
            duration: 0.2,
        },
    },
};

type ContactUsProps = {
    user: any;
};

const ContactUs = ({ user }: ContactUsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleButtonHover = () => {
        // get the button title and change its color to #007acc
        const buttonTitle = document.getElementById("buttonTitle");
        if (buttonTitle) {
            buttonTitle.style.color = "#007acc";
        }
    };

    const handleButtonLeave = () => {
        // get the button title and change its color to #000000
        const buttonTitle = document.getElementById("buttonTitle");
        if (buttonTitle) {
            buttonTitle.style.color = "#000000";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the form submission logic

        handleClose();
    };

    return (
        <div className={styles.contactUs}>
            <AnimatePresence>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.box}
                    onClick={() => (isOpen ? handleClose() : handleOpen())}
                >
                    {messageIcon}
                </motion.button>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.modalContent}
                    variants={dropIn}
                    initial={isOpen ? "hidden" : "visible"}
                    animate={isOpen ? "visible" : "hidden"}
                >
                    <section className={styles.sectionContainer}>
                        {page === 0 && (
                            <section className={styles.topHalf}>
                                <button
                                    title="Close"
                                    className={styles.closeButton}
                                    onClick={handleClose}
                                >
                                    {circledXIcon}
                                </button>
                                <div className={styles.circle1}></div>
                                <div className={styles.circle2}></div>
                                <div className={styles.circle3}></div>
                                <section className={styles.blur}></section>
                                <section className={styles.textContent}>
                                    <h1>
                                        Hi {user ? user.firstName : "there"}!
                                    </h1>
                                    <p>How can we help?</p>
                                </section>
                            </section>
                        )}
                        {page === 0 && (
                            <section className={styles.bottomHalf}>
                                {page === 0 && (
                                    <button
                                        title="Send a message"
                                        className={styles.createButton}
                                        onMouseEnter={handleButtonHover}
                                        onMouseLeave={handleButtonLeave}
                                    >
                                        <section className={styles.buttonText}>
                                            <p
                                                className={styles.buttonTitle}
                                                id="buttonTitle"
                                            >
                                                Message us
                                            </p>
                                            <p
                                                className={
                                                    styles.buttonSubtitle
                                                }
                                            >
                                                We typically reply in a few
                                                minutes
                                            </p>
                                        </section>
                                        {sendIcon}
                                    </button>
                                )}
                            </section>
                        )}
                        {page === 1 && (
                            <section className={styles.faqSection}>
                                <button
                                    title="Close"
                                    className={styles.closeButton}
                                    onClick={handleClose}
                                >
                                    {circledXIcon}
                                </button>
                                <FaqComponentLandingPage />
                            </section>
                        )}
                    </section>
                    <section className={styles.optionsMenu}>
                        <button
                            className={styles.option}
                            onClick={() => setPage(0)}
                        >
                            {homeIcon}
                            <p>Home</p>
                        </button>
                        <button
                            className={styles.option}
                            onClick={() => setPage(1)}
                        >
                            {faqIcon}
                            <p>FAQ's</p>
                        </button>
                    </section>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ContactUs;
