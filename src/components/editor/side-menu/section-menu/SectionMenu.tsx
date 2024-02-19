"use client";
import styles from "./SectionMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";

import { motion } from "framer-motion";
import { useState } from "react";

const StyleMenu = () => {
    const [searchText, setSearchText] = useState("");
    return (
        <motion.section className={styles.searchBarContainer}>
            <motion.p>Sections</motion.p>
            <motion.div className={styles.searchIconContainer}>
                {searchIcon}
            </motion.div>
            <motion.input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchBarInput}
                placeholder="Search Templates"
            />
        </motion.section>
    );
};

export default StyleMenu;
