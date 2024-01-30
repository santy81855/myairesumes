"use client";
import ProfileMenu from "@/components/nav/profile-menu/ProfileMenu";
import { useState } from "react";
import HamburgerButton from "@/components/hamburger-menu/HamburgerButton";
import { motion } from "framer-motion";
import styles from "./ProfileButton.module.css";

type Props = {
    session: any;
    user: any;
};

const ProfileButton = ({ session, user }: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const handleClick = () => {
        setShowMenu(!showMenu);
    };
    return (
        <>
            <motion.button
                className={styles.button}
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                    backgroundColor: "white",
                }}
            >
                {showMenu ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <i className="fa-solid fa-user"></i>
                )}
            </motion.button>
            <ProfileMenu
                session={session}
                user={user}
                state={showMenu}
                setState={setShowMenu}
            />
        </>
    );
};

export default ProfileButton;
