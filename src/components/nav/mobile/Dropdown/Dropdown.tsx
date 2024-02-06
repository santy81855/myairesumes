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
    const calculateWidth = (length: number) => {
        // if a length of 200 allows around 8 letters, then we can calculate the width of the menu while giving a buffer of 20px
        const buffer = 20;
        if (length > 7) {
            return 200 + buffer;
        }
        return 200;
    };
    const [isLoading, setIsLoading] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
    const [width, setWidth] = useState(
        user !== null ? calculateWidth(user.firstName.length) : 200
    );
    const [height, setHeight] = useState(300);

    useEffect(() => {
        const handleScroll = () => {
            setState(false);
        };
        const handleResize = () => {
            setState(false);
        };
        const handleClick = (e: any) => {
            const menu = document.getElementById("mobilePopupMenu");
            if (!menu) return;
            if (!menu.contains(e.target as Node)) {
                const button = document.getElementById("mobileMenuButton");
                if (!button) {
                    return;
                }
                if (!button.contains(e.target as Node)) {
                    setState(false);
                    return;
                }
            }
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
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("click", handleClick);
        };
    }, [state]);

    const itemVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
        open: { opacity: 1 },
    };
    const sideVariants = {
        closed: {
            transition: {
                duration: 0,
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
        <section id="mobilePopupMenu" className={styles.container}>
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
                            borderRadius: "5px",
                            left: buttonPosition.right,
                            transform: "translateX(-100%)",
                            top: 70,
                            transition: { duration: 0.3 },
                            zIndex: 1,
                        }}
                        exit={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            top: buttonPosition.top,
                            left: buttonPosition.right - 10,
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
                                            className={styles.menuItem}
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
