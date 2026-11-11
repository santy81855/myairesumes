"use client";
import styles from "./ProfileMenu.module.css";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { signOutAction } from "@/features/authentication";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    session: any;
    user: any;
    state: boolean;
    setState: (state: boolean) => void;
};

const ProfileMenu = ({ user, state, setState }: Props) => {
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
                <motion.div id="profilePopupMenu" className={styles.container} initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={{ duration: reduceMotion ? 0 : .16 }}>
                    <p className={styles.greeting}>Hello, {user?.firstName || "there"}.</p>
                    <Link href="/" className={styles.menuItem} onClick={() => setState(false)}>Home <span aria-hidden="true">↗</span></Link>
                    <Link href="/dashboard?menu=profile" className={styles.menuItem} onClick={() => setState(false)}>Dashboard <span aria-hidden="true">↗</span></Link>
                    <button type="button" className={styles.signOutButton} disabled={isLoading} onClick={signoutPressed}>{isLoading ? "Signing out…" : "Log out"}</button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileMenu;
