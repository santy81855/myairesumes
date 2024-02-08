"use client";
import styles from "./Menu.module.css";
import Dropdown from "@/components/nav/mobile/Dropdown/Dropdown";
import { useState } from "react";
import Link from "next/link";
import HamburgerButton from "@/components/hamburger-menu/HamburgerButton";

type MenuProps = {
    session: any;
    user: any;
    style?: object;
    isAuth?: boolean;
};

const Menu = ({ session, user, style, isAuth }: MenuProps) => {
    const [state, setState] = useState(false);
    const extraStyle = style ? style : {};
    const menuLinks = [];
    if (session) {
        menuLinks.push(
            { name: "Home", to: "/", id: "home" },
            { name: "Dashboard", to: "/dashboard", id: "dashboard" },
            { name: "Pricing", to: "/pricing", id: "pricing" }
        );
    } else if (!session && !isAuth) {
        menuLinks.push(
            { name: "Home", to: "/", id: "home" },
            { name: "Pricing", to: "/pricing", id: "pricing" },
            { name: "Create a Resume", to: "/sign-up", id: "sign-up" }
        );
    } else if (!session && isAuth) {
        menuLinks.push({ name: "Home", to: "/", id: "home" });
    }

    return (
        <section className={styles.container}>
            <Link href="/">
                <p className={styles.name} style={extraStyle}>
                    MyAIResumes
                </p>
            </Link>
            <div
                id="mobileMenuButton"
                className={styles.buttonContainer}
                onClick={() => setState(!state)}
            >
                <HamburgerButton
                    isOpen={state}
                    strokeWidth="1.5"
                    color="black"
                    lineProps={{ strokeLinecap: "round" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    width="16"
                    height="12"
                />
            </div>
            <Dropdown
                session={session}
                user={user}
                state={state}
                setState={setState}
                links={menuLinks}
            />
        </section>
    );
};

export default Menu;
