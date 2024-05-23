"use client";
import styles from "./Menu.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { signOutAction } from "@/features/authentication";
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
import Link from "next/link";

const Menu = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const menuSection = searchParams.get("menu") || "";
    const [isLoading, setIsLoading] = useState(false);

    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signOutAction();
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
            return;
        }
    };

    const handleMenuClick = (section: string) => {
        if (section === "account")
            router.replace(`?menu=account&invoicePage=1`);
        else router.replace(`?menu=${section}`);
    };

    return (
        <section className={styles.menu}>
            <p className={styles.name}>My Resume Hero</p>
            <Link
                title="Profile"
                className={
                    menuSection === "profile" ? styles.active : styles.menuItem
                }
                href="/dashboard?menu=profile"
            >
                <div className={styles.iconContainer}>{profileIcon}</div>
                Profile
            </Link>
            <Link
                title="Account"
                className={
                    menuSection === "account" ? styles.active : styles.menuItem
                }
                href="/dashboard?menu=account&invoicePage=1"
            >
                <div className={styles.iconContainer}>{accountIcon}</div>
                Account
            </Link>
            <Link
                title="Applications"
                className={
                    menuSection === "jobs" ? styles.active : styles.menuItem
                }
                href="/dashboard?menu=jobs&documentPage=1"
            >
                <div className={styles.iconContainer}>{jobIcon}</div>
                Applications
            </Link>
            <Link
                title="Resumes"
                className={
                    menuSection === "resumes" ? styles.active : styles.menuItem
                }
                href="/dashboard?menu=resumes&documentPage=1"
            >
                <div className={styles.iconContainer}>{resumeIcon}</div>
                Resumes
            </Link>
            <Link
                title="Cover Letters"
                className={
                    menuSection === "cover-letters"
                        ? styles.active
                        : styles.menuItem
                }
                href="/dashboard?menu=cover-letters&documentPage=1"
            >
                <div className={styles.iconContainer}>{coverLetterIcon}</div>
                Cover Letters
            </Link>
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
