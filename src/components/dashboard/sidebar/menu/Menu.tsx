"use client";
import styles from "./Menu.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { signout } from "@/actions/authentication";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import {
    profileIcon,
    accountIcon,
    jobIcon,
    resumeIcon,
    coverLetterIcon,
    logoutIcon,
} from "@/components/icons/iconSVG";

const Menu = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const menuSection = searchParams.get("menu") || "";
    const [isLoading, setIsLoading] = useState(false);

    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signout();
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        }
    };

    const handleMenuClick = (section: string) => {
        router.replace(`?menu=${section}`);
    };

    return (
        <section className={styles.menu}>
            <p className={styles.name}>MAGIC RESUME</p>
            <button
                title="Profile"
                className={
                    menuSection === "profile" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("profile")}
            >
                <div className={styles.iconContainer}>{profileIcon}</div>
                Profile
            </button>
            <button
                title="Account"
                className={
                    menuSection === "account" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("account")}
            >
                <div className={styles.iconContainer}>{accountIcon}</div>
                Account
            </button>
            <button
                title="Jobs"
                className={
                    menuSection === "jobs" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("jobs")}
            >
                <div className={styles.iconContainer}>{jobIcon}</div>
                Jobs
            </button>
            <button
                title="Resumes"
                className={
                    menuSection === "resumes" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("resumes")}
            >
                <div className={styles.iconContainer}>{resumeIcon}</div>
                Resumes
            </button>
            <button
                title="Cover Letters"
                className={
                    menuSection === "cover-letters"
                        ? styles.active
                        : styles.menuItem
                }
                onClick={() => handleMenuClick("cover-letters")}
            >
                <div className={styles.iconContainer}>{coverLetterIcon}</div>
                Cover Letters
            </button>
            <button
                title="Logout"
                className={styles.menuItem}
                onClick={signoutPressed}
            >
                <div className={styles.iconContainer}>{logoutIcon}</div>
                Logout
            </button>
            {isLoading && <LoadingScreen />}
        </section>
    );
};

export default Menu;
