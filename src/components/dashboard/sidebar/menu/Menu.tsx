"use client";
import styles from "./Menu.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { signout } from "@/actions/authentication";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import Spinner from "@/components/loaders/Spinner/Spinner";

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
                className={
                    menuSection === "profile" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("profile")}
            >
                Profile
            </button>
            <button
                className={
                    menuSection === "account" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("account")}
            >
                Account
            </button>
            <button
                className={
                    menuSection === "jobs" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("jobs")}
            >
                Jobs
            </button>
            <button
                className={
                    menuSection === "resumes" ? styles.active : styles.menuItem
                }
                onClick={() => handleMenuClick("resumes")}
            >
                Resumes
            </button>
            <button
                className={
                    menuSection === "cover-letters"
                        ? styles.active
                        : styles.menuItem
                }
                onClick={() => handleMenuClick("cover-letters")}
            >
                Cover Letters
            </button>
            <button className={styles.menuItem} onClick={signoutPressed}>
                Logout
            </button>
            {isLoading && <LoadingScreen />}
        </section>
    );
};

export default Menu;
