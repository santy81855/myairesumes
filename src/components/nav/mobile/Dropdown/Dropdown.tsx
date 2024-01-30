"use client";
import styles from "./Dropdown.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { signout } from "@/actions/authentication";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/loaders/Spinner/Spinner";

type MenuProps = {
    session: any;
    user: any;
    links: { name: string; to: string; id: string }[];
    state: boolean;
    setState: (state: boolean) => void;
};

const Dropdown = ({ links, state, setState, session, user }: MenuProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
    const [width, setWidth] = useState(250);
    const [height, setHeight] = useState(300);

    useEffect(() => {
        const handleScroll = () => {
            if (state) setState(false);
        };
        const buttonElement = document.getElementById("mobileMenuButton");
        if (buttonElement) {
            const boundingBox = buttonElement.getBoundingClientRect();
            setButtonPosition({
                top: boundingBox.top + window.scrollY,
                right: boundingBox.right + window.scrollX,
            });
        }

        // Attach the event listener
        // get the element with id landingPage
        const landingPage = document.getElementById("landingPage");
        if (!landingPage) return;
        landingPage.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            const landingPage = document.getElementById("landingPage");
            if (!landingPage) return;
            landingPage.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [state]);

    const itemVariants = {
        closed: {
            opacity: 0,
        },
        open: { opacity: 1 },
    };
    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1,
            },
        },
    };

    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signout();
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        }
    };
    return (
        <section className={styles.container}>
            <AnimatePresence>
                {state && (
                    <motion.aside
                        initial={{
                            width: 50,
                            height: 30,
                            borderRadius: "50%",
                            left: buttonPosition.right,
                            transform: "translateX(-100%)",
                            top: buttonPosition.top,
                            zIndex: -1,
                        }}
                        animate={{
                            width: width,
                            height: height,
                            borderRadius: "15px",
                            left: buttonPosition.right,
                            transform: "translateX(-100%)",
                            top: 70,
                            transition: { duration: 0.3 },
                            zIndex: 1,
                        }}
                        exit={{
                            width: 50,
                            height: 30,
                            borderRadius: "50%",
                            top: buttonPosition.top,
                            left: buttonPosition.right,
                            transition: { duration: 0.3 },
                            zIndex: -1,
                        }}
                        className={styles.aside}
                    >
                        <motion.div
                            className={styles.menuContainer}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}
                        >
                            <motion.div>
                                <motion.p
                                    className={styles.greeting}
                                    variants={itemVariants}
                                >
                                    Hi{" "}
                                    {user === null || user.firstName.length > 8
                                        ? "there"
                                        : user.firstName}
                                    ,
                                </motion.p>
                                <motion.div
                                    className={styles.bar}
                                    variants={itemVariants}
                                />
                            </motion.div>
                            <motion.div className={styles.menuItemContainer}>
                                {links.map(({ name, to, id }) => {
                                    return (
                                        <motion.a
                                            key={id}
                                            href={to}
                                            whileHover={{ scale: 1.1 }}
                                            variants={itemVariants}
                                        >
                                            {name}
                                        </motion.a>
                                    );
                                })}
                                {isLoading ? (
                                    <Spinner />
                                ) : (
                                    session && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            variants={itemVariants}
                                            className={styles.signOutButton}
                                            onClick={signoutPressed}
                                        >
                                            Log Out
                                        </motion.button>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Dropdown;
