"use client";
import styles from "./SectionMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";

const StyleMenu = () => {
    return (
        <motion.section className={styles.container}>
            <motion.p className={styles.title}>Sections</motion.p>
            <motion.section className={styles.itemContainer}>hi</motion.section>
        </motion.section>
    );
};

export default StyleMenu;
