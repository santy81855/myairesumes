"use client";
import styles from "./Dropdown.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { signout } from "@/actions/authentication";
import React, { useState } from "react";
import Spinner from "@/components/loaders/Spinner/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MenuProps = {
    links: { name: string; to: string; id: string }[];
    state: boolean;
    setState: (state: boolean) => void;
};

const Dropdown = ({ links, state, setState }: MenuProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const itemVariants = {
        closed: {
            opacity: 0,
        },
        open: { opacity: 1 },
    };
    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.2,
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
                        initial={{ width: 0 }}
                        animate={{
                            width: "100%",
                        }}
                        exit={{
                            width: 0,
                            transition: { delay: 0.7, duration: 0.3 },
                        }}
                        className={styles.aside}
                    >
                        <motion.div
                            className={styles.linkContainer}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}
                        >
                            {links.map(({ name, to, id }) => {
                                return id === "sign-out" ? (
                                    isLoading ? (
                                        <Spinner />
                                    ) : (
                                        <motion.button
                                            key={id}
                                            onClick={signoutPressed}
                                            whileHover={{ scale: 1.1 }}
                                            variants={itemVariants}
                                            className={styles.signOutButton}
                                        >
                                            {name}
                                        </motion.button>
                                    )
                                ) : (
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
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Dropdown;
