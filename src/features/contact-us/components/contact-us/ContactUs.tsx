"use client";
import React, { useState, useEffect } from "react";
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
import { send } from "@/actions/email";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type ContactUsProps = {
    user: any;
};

const ContactUs = ({ user }: ContactUsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        // add a delay to the initial load to prevent the modal from appearing on page load for a split second
        if (initialLoad) {
            setTimeout(() => {
                setInitialLoad(false);
            }, 200);
        }
    }, [initialLoad]);

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
            display: initialLoad ? "none" : "block",
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

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setPage(0);
        setEmail("");
        setSubject("");
        setMessage("");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await send({
                email,
                firstName: "",
                lastName: "",
                subject,
                type: "general-message",
                content: message,
            });
            toast.success(
                "Message sent! We will get back to you as soon as possible."
            );
        } catch (e) {
            toast.error("Message failed to send");
        }
        setLoading(false);
        setPage(0);
        setEmail("");
        setSubject("");
        setMessage("");
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
                                        onClick={() => setPage(2)}
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
                        {loading && <LoadingScreen />}
                        {page === 2 && (
                            <section className={styles.messageSection}>
                                <button
                                    title="Close"
                                    className={styles.closeButton}
                                    onClick={handleClose}
                                >
                                    {circledXIcon}
                                </button>
                                <h1>Send us a message</h1>
                                <form onSubmit={handleSubmit}>
                                    <section className={styles.inputGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            title="email"
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            className={styles.input}
                                        />
                                    </section>
                                    <section className={styles.inputGroup}>
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            title="subject"
                                            id="subject"
                                            type="text"
                                            placeholder="Subject"
                                            value={subject}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                            required
                                            className={styles.input}
                                        />
                                    </section>
                                    <section className={styles.inputGroup}>
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            title="message"
                                            id="message"
                                            placeholder="Your message"
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            required
                                            rows={4}
                                            className={styles.textarea}
                                        />
                                    </section>
                                    <div className={styles.buttonGroup}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPage(0);
                                                setEmail("");
                                                setSubject("");
                                                setMessage("");
                                            }}
                                            className={styles.cancelButton}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={styles.sendButton}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
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
                            <p>FAQ&apos;s</p>
                        </button>
                    </section>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ContactUs;
