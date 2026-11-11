"use client";
import styles from "./Menu.module.css";
import { useSearchParams } from "next/navigation";
import { signOutAction } from "@/features/authentication";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { profileIcon, accountIcon, jobIcon, resumeIcon, coverLetterIcon, logoutIcon } from "@/components/icons/iconSVG";
import Link from "next/link";

const navigation = [
    { key: "profile", label: "Your profile", href: "/dashboard?menu=profile", icon: profileIcon },
    { key: "jobs", label: "Applications", href: "/dashboard?menu=jobs&documentPage=1", icon: jobIcon },
    { key: "resumes", label: "Resumes", href: "/dashboard?menu=resumes&documentPage=1", icon: resumeIcon },
    { key: "cover-letters", label: "Cover letters", href: "/dashboard?menu=cover-letters&documentPage=1", icon: coverLetterIcon },
    { key: "account", label: "Account & billing", href: "/dashboard?menu=account&invoicePage=1", icon: accountIcon },
];

const Menu = () => {
    const menuSection = useSearchParams().get("menu") || "profile";
    const [isLoading, setIsLoading] = useState(false);
    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signOutAction();
        if (response.error) {
            toast.warning(response.error);
            setIsLoading(false);
        }
    };

    return (
        <nav className={styles.menu} aria-label="Workspace navigation">
            <Link href="/" className={styles.brand} aria-label="My Resume Hero home"><span className={styles.logo} aria-hidden="true">m<span>h</span></span><span>My Resume Hero<span className={styles.dot}>.</span></span></Link>
            <p className={styles.sectionLabel}>YOUR WORKSPACE</p>
            <div className={styles.links}>{navigation.map(({ key, label, href, icon }) => <Link key={key} href={href} aria-current={menuSection === key ? "page" : undefined} className={`${styles.menuItem} ${menuSection === key ? styles.active : ""}`}><span className={styles.iconContainer} aria-hidden="true">{icon}</span>{label}{menuSection === key && <span className={styles.activeDot} aria-hidden="true" />}</Link>)}</div>
            <div className={styles.bottom}><p>A little clarity.<br /><em>A lot more possibility.</em></p><Link href="/help-center?option=faqs" className={styles.helpLink}>Need a hand? <span aria-hidden="true">↗</span></Link><button type="button" className={`${styles.menuItem} ${styles.signOut}`} onClick={signoutPressed} disabled={isLoading}><span className={styles.iconContainer} aria-hidden="true">{logoutIcon}</span>{isLoading ? "Signing out…" : "Sign out"}</button></div>
            {isLoading && <LoadingScreen />}
        </nav>
    );
};
export default Menu;
