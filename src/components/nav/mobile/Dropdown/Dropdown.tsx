"use client";
import styles from "./Dropdown.module.css";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { signOutAction } from "@/features/authentication";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MenuProps = {
    session: any;
    user: any;
    links: { name: string; to: string; id: string }[];
    state: boolean;
    setState: (state: boolean) => void;
};

const Dropdown = ({ links, state, setState, session, user }: MenuProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const reduceMotion = useReducedMotion();
    const signoutPressed = async () => {
        setIsLoading(true);
        try {
            const response = await signOutAction();
            if (response?.error) toast.warning(response.error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <AnimatePresence>
            {state && (
                <motion.div id="mobilePopupMenu" className={styles.container} initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
                    <p className={styles.greeting}>{session ? `Hello, ${user?.firstName || "there"}.` : "Your next chapter starts here."}</p>
                    <div className={styles.menuItemContainer}>
                        {links.map(({ name, to, id }) => (
                            <Link key={id} href={to} onClick={() => setState(false)} className={id === "sign-up" ? styles.cta : styles.menuItem}>{name}<span aria-hidden="true">↗</span></Link>
                        ))}
                        {session && <button type="button" disabled={isLoading} className={styles.signOutButton} onClick={signoutPressed}>{isLoading ? "Signing out…" : "Log out"}</button>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dropdown;
