"use client";
import ProfileMenu from "@/components/nav/profile-menu/ProfileMenu";
import { useEffect, useRef, useState } from "react";
import styles from "./ProfileButton.module.css";
import type { CSSProperties } from "react";

type Props = {
    session: any;
    user: any;
    style?: CSSProperties;
};

const ProfileButton = ({ session, user, style }: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!showMenu) return;
        const closeOutside = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setShowMenu(false);
        };
        const closeWithEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowMenu(false);
                buttonRef.current?.focus();
            }
        };
        const close = () => setShowMenu(false);
        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", closeWithEscape);
        window.addEventListener("resize", close);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", closeWithEscape);
            window.removeEventListener("resize", close);
        };
    }, [showMenu]);

    return (
        <div className={styles.container} ref={containerRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setShowMenu(false);
        }}>
            <button ref={buttonRef} id="profileButton" type="button" style={style} className={styles.button} onClick={() => setShowMenu(!showMenu)} aria-label="Your account" aria-expanded={showMenu} aria-controls="profilePopupMenu">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>
            </button>
            <ProfileMenu session={session} user={user} state={showMenu} setState={setShowMenu} />
        </div>
    );
};

export default ProfileButton;
