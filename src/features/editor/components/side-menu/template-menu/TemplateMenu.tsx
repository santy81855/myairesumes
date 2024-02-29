"use client";
import styles from "./TemplateMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState } from "react";
import { MenuContainer } from "@/features/editor";

type TemplateMenuProps = {
    document: any;
};

const TemplateMenu = ({ document }: TemplateMenuProps) => {
    const [searchText, setSearchText] = useState("");
    return (
        <MenuContainer>
            <motion.section className={styles.searchBarContainer}>
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
        </MenuContainer>
    );
};

export default TemplateMenu;
