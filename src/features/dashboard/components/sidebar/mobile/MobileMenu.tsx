"use client";
import styles from "./MobileMenu.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { signOutAction } from "@/features/authentication";
import { profileIcon, accountIcon, jobIcon, resumeIcon, coverLetterIcon, logoutIcon } from "@/components/icons/iconSVG";

const navigation = [
    { key: "profile", label: "Profile", href: "/dashboard?menu=profile", icon: profileIcon },
    { key: "jobs", label: "Applications", href: "/dashboard?menu=jobs&documentPage=1", icon: jobIcon },
    { key: "resumes", label: "Resumes", href: "/dashboard?menu=resumes&documentPage=1", icon: resumeIcon },
    { key: "cover-letters", label: "Letters", href: "/dashboard?menu=cover-letters&documentPage=1", icon: coverLetterIcon },
    { key: "account", label: "Account", href: "/dashboard?menu=account&invoicePage=1", icon: accountIcon },
];

const MobileMenu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuSection = useSearchParams().get("menu") || "profile";
    const wrapperRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const outside = (event: PointerEvent) => { if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false); };
        const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setIsOpen(false); buttonRef.current?.focus(); } };
        document.addEventListener("pointerdown", outside);
        document.addEventListener("keydown", key);
        return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", key); };
    }, [isOpen]);

    const signoutPressed = async () => {
        setIsLoading(true);
        const response = await signOutAction();
        if (response.error) { toast.warning(response.error); setIsLoading(false); }
    };

    return (
        <nav ref={wrapperRef} className={styles.wrapper} aria-label="Workspace navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsOpen(false); }}>
            <Link href="/" className={styles.logo} aria-label="My Resume Hero home">m<span>h</span></Link>
            <div className={styles.links}>{navigation.map(({ key, label, href, icon }) => <Link key={key} href={href} className={`${styles.menuItem} ${menuSection === key ? styles.active : ""}`} aria-current={menuSection === key ? "page" : undefined} onClick={() => setIsOpen(false)}><span aria-hidden="true">{icon}</span><span>{label}</span></Link>)}<button ref={buttonRef} className={`${styles.menuItem} ${styles.more}`} type="button" aria-expanded={isOpen} aria-controls="workspace-more" aria-label="More workspace options" onClick={() => setIsOpen(!isOpen)}><span className={styles.dots} aria-hidden="true">···</span><span>More</span></button></div>
            {isOpen && <div id="workspace-more" className={styles.panel}><p>My Resume Hero<span>.</span></p><Link href="/" onClick={() => setIsOpen(false)}>Back to home <span aria-hidden="true">↗</span></Link><Link href="/help-center?option=faqs" onClick={() => setIsOpen(false)}>Help center <span aria-hidden="true">↗</span></Link><button type="button" onClick={signoutPressed} disabled={isLoading}>{logoutIcon}{isLoading ? "Signing out…" : "Sign out"}</button></div>}
        </nav>
    );
};
export default MobileMenu;
