"use client";
import styles from "./SectionMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";

const StyleMenu = () => {
    const { resumeInformation, setResumeInformation, resumeId } =
        useAppContext();
    console.log(resumeInformation);
    const [searchText, setSearchText] = useState("");

    return (
        <motion.section className={styles.container}>
            <motion.p className={styles.title}>Sections</motion.p>
            <motion.section className={styles.itemContainer}>
                {resumeInformation &&
                    resumeInformation.sectionOrder[0].map((section: string) => (
                        <motion.div className={styles.item}>
                            {section}
                        </motion.div>
                    ))}
            </motion.section>
        </motion.section>
    );
};

export default StyleMenu;
