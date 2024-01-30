"use client";
import ProfileMenu from "@/components/nav/profile-menu/ProfileMenu";
import { useState } from "react";
import HamburgerButton from "@/components/hamburger-menu/HamburgerButton";

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
            <HamburgerButton
                isOpen={showMenu}
                onClick={() => setShowMenu(!showMenu)}
                strokeWidth="3"
                color="white"
                lineProps={{ strokeLinecap: "round" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                width="24"
                height="20"
            />
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
