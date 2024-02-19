"use client";
import styles from "./ExpandedMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const item = {
    hidden: { opacity: 0, transition: { duration: 0.5 } },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const button = {
    hidden: { transform: "translateX(0px)", transition: { duration: 0.5 } },
    visible: {
        transform: "translateX(105px) rotate(540deg)",
        transition: { duration: 0.5 },
    },
};

const ExpandedMenu = ({
    state,
    setState,
    children,
}: {
    state: boolean;
    setState: (state: boolean) => void;
    children: React.ReactNode;
}) => {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const menuSection = searchParams.get("menu") || "";
    const menuWidth = 350;

    return (
        <motion.aside
            className={styles.wrapper}
            animate={
                state
                    ? {
                          width: menuWidth,
                          left: 60,
                          transition: { duration: 0.5 },
                          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
                      }
                    : {
                          width: menuWidth,
                          left: -menuWidth,
                          transition: { duration: 0.5 },
                      }
            }
        >
            <section className={styles.container}>{children}</section>
        </motion.aside>
    );
};

export default ExpandedMenu;
