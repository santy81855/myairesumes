"use client";
import styles from "./MenuContainer.module.css";
import { motion } from "framer-motion";

const MenuContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.section className={styles.container}>{children}</motion.section>
    );
};

export default MenuContainer;
