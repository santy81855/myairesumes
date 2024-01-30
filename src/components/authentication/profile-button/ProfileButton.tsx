"use client";
import styles from "./ProfileButton.module.css";
import ProfileMenu from "@/components/nav/profile-menu/ProfileMenu";
import { useState } from "react";

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
            <button className={styles.button} onClick={handleClick}>
                <i className={`${styles.icon} fa-solid fa-user`}></i>
            </button>
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
