"use client";
import styles from "./MobileMenu.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { signOutAction } from "@/features/authentication";
import {
    profileIcon,
    accountIcon,
    jobIcon,
    resumeIcon,
    coverLetterIcon,
    logoutIcon,
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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect to track the window width
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenuClick = (section: string) => {
        if (section === "account")
            router.replace(`?menu=account&invoicePage=1`);
        else router.replace(`?menu=${section}`);
    };

    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signOutAction();
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
                    <Link
                        href="/"
                        className={styles.logo}
                        style={
                            state
                                ? { opacity: 1 }
                                : window.innerWidth < 620
                                ? { opacity: 1 }
                                : { opacity: 0 }
                        }
                    >
                        <div className={styles.logo}></div>
                    </Link>
                    <section className={styles.buttonContainer}>
                        <Link
                            title="Profile"
                            className={`${styles.menuItem} ${
                                menuSection === "profile" && styles.active
                            }`}
                            href="/dashboard?menu=profile"
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
                        </Link>
                        <Link
                            title="Account"
                            className={`${styles.menuItem} ${
                                menuSection === "account" && styles.active
                            }`}
                            href="/dashboard?menu=account&invoicePage=1"
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
                        </Link>
                        <Link
                            title="Applications"
                            className={`${styles.menuItem} ${
                                menuSection === "jobs" && styles.active
                            }`}
                            href="/dashboard?menu=jobs&documentPage=1"
                        >
                            {jobIcon}
                            {state && (
                                <motion.p
                                    variants={word}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {"applications"
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
                        </Link>
                        <Link
                            title="Resumes"
                            className={`${styles.menuItem} ${
                                menuSection === "resumes" && styles.active
                            }`}
                            href="/dashboard?menu=resumes&documentPage=1"
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
                        </Link>
                        <Link
                            title="Cover Letters"
                            className={`${styles.menuItem} ${
                                menuSection === "cover-letters" && styles.active
                            }`}
                            href="/dashboard?menu=cover-letters&documentPage=1"
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
                        </Link>
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
                                    animate="visible"
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
