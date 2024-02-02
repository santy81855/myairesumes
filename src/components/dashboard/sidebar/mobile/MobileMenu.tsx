"use client";
import styles from "./MobileMenu.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { signout } from "@/actions/authentication";
import {
    profileIcon,
    accountIcon,
    jobIcon,
    resumeIcon,
    coverLetterIcon,
    logoutIcon,
    magicResumeLogo,
    arrowRightIcon,
} from "@/components/icons/iconSVG";
import { motion } from "framer-motion";

const word = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { delay: 0.5, staggerChildren: 0.08 },
    },
};

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const button = {
    hidden: { transform: "translateX(0px)", transition: { duration: 0.5 } },
    visible: {
        transform: "translateX(105px) rotate(540deg)",
        transition: { duration: 0.5 },
    },
};

const MobileMenu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const menuSection = searchParams.get("menu") || "";
    const handleMenuClick = (section: string) => {
        router.replace(`?menu=${section}`);
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
        <>
            <motion.aside
                className={styles.wrapper}
                animate={
                    state
                        ? {
                              width: 200,
                              transition: { duration: 0.5 },
                              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
                          }
                        : {
                              width: 60,
                              transition: { duration: 0.5 },
                          }
                }
            >
                <section className={styles.mobileSidebar}>
                    <Link href="/" className={styles.logo}>
                        {magicResumeLogo}
                    </Link>
                    <section className={styles.buttonContainer}>
                        <button
                            title="Profile"
                            className={`${styles.menuItem} ${
                                menuSection === "profile" && styles.active
                            }`}
                            onClick={() => handleMenuClick("profile")}
                        >
                            {profileIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"profile"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <button
                            title="Account"
                            className={`${styles.menuItem} ${
                                menuSection === "account" && styles.active
                            }`}
                            onClick={() => handleMenuClick("account")}
                        >
                            {accountIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"account"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <button
                            title="Jobs"
                            className={`${styles.menuItem} ${
                                menuSection === "jobs" && styles.active
                            }`}
                            onClick={() => handleMenuClick("jobs")}
                        >
                            {jobIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"jobs"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <button
                            title="Resumes"
                            className={`${styles.menuItem} ${
                                menuSection === "resumes" && styles.active
                            }`}
                            onClick={() => handleMenuClick("resumes")}
                        >
                            {resumeIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"resumes"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <button
                            title="Cover Letters"
                            className={`${styles.menuItem} ${
                                menuSection === "cover-letters" && styles.active
                            }`}
                            onClick={() => handleMenuClick("cover-letters")}
                        >
                            {coverLetterIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"cover letters"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <button
                            title="Logout"
                            className={`${styles.menuItem} ${styles.logoutButton}`}
                            onClick={signoutPressed}
                        >
                            {logoutIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visiible"
                                    className={styles.logoutText}
                                >
                                    {"logout"
                                        .split("")
                                        .map((curLetter, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letter}
                                            >
                                                {curLetter}
                                            </motion.span>
                                        ))}
                                </motion.p>
                            )}
                        </button>
                        <section className={styles.openButtonContainer}>
                            <motion.button
                                className={styles.openMenuButton}
                                onClick={() => setState(!state)}
                                variants={button}
                                initial="hidden"
                                animate={state ? "visible" : "hidden"}
                            >
                                {arrowRightIcon}
                            </motion.button>
                        </section>
                    </section>
                </section>
            </motion.aside>
            {isLoading && <LoadingScreen />}
        </>
    );
};

export default MobileMenu;
