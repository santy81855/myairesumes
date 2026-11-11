"use client";
import styles from "./Menu.module.css";
import Dropdown from "@/components/nav/mobile/Dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type MenuProps = {
    session: any;
    user: any;
    style?: object;
    isAuth?: boolean;
};

const Menu = ({ session, user, isAuth }: MenuProps) => {
    const [state, setState] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuLinks = [
        { name: "Features", to: "/#features", id: "features" },
        { name: "Templates", to: "/#templates", id: "templates" },
        { name: "Pricing", to: "/pricing", id: "pricing" },
        { name: "Help Center", to: "/help-center?option=faqs", id: "help-center" },
    ];
    if (session) menuLinks.push({ name: "Dashboard", to: "/dashboard", id: "dashboard" });
    if (!session && !isAuth) {
        menuLinks.push(
            { name: "Sign in", to: "/sign-in", id: "sign-in" },
            { name: "Get started", to: "/sign-up", id: "sign-up" }
        );
    }
    if (!session && isAuth) menuLinks.push({ name: "Back to home", to: "/", id: "home" });

    useEffect(() => {
        if (!state) return;
        const handleOutside = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setState(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setState(false);
                buttonRef.current?.focus();
            }
        };
        const close = () => setState(false);
        document.addEventListener("pointerdown", handleOutside);
        document.addEventListener("keydown", handleKey);
        window.addEventListener("resize", close);
        return () => {
            document.removeEventListener("pointerdown", handleOutside);
            document.removeEventListener("keydown", handleKey);
            window.removeEventListener("resize", close);
        };
    }, [state]);

    return (
        <div className={styles.container} ref={containerRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setState(false);
        }}>
            <Link href="/" className={styles.brand} onClick={() => setState(false)} aria-label="My Resume Hero home">
                <span className={styles.logo} aria-hidden="true">m<span>h</span></span>
                <span className={styles.name}>My Resume Hero<span className={styles.dot}>.</span></span>
            </Link>
            <button ref={buttonRef} id="mobileMenuButton" type="button" className={styles.buttonContainer} onClick={() => setState(!state)} aria-label={state ? "Close navigation" : "Open navigation"} aria-expanded={state} aria-controls="mobilePopupMenu">
                <span className={`${styles.menuIcon} ${state ? styles.isOpen : ""}`} aria-hidden="true"><span /><span /></span>
            </button>
            <Dropdown session={session} user={user} state={state} setState={setState} links={menuLinks} />
        </div>
    );
};

export default Menu;
