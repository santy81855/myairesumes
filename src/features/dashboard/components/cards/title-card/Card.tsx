"use client";
import styles from "./Card.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    jobIcon,
    resumeIcon,
    coverLetterIcon,
} from "@/components/icons/iconSVG";

type CardProps = {
    title: string;
    number: number;
    url: string;
    gridArea: string;
    key: string;
};

const Card = ({ title, number, url, gridArea }: CardProps) => {
    const [hover, setHover] = useState(false);

    const initialText = (
        <>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.number}>{number}</p>
        </>
    );
    return (
        <Link
            href={`/dashboard?menu=${title.toLowerCase().split(" ").join("-")}`}
            title={title}
            className={styles.container}
            style={{
                gridArea,
                backgroundImage: `url(${url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div className={styles.overlayTouch}>
                <motion.p className={styles.textTouch}>{title}</motion.p>
                <motion.p className={styles.numberTextTouch}>{number}</motion.p>
                {title === "Jobs" && jobIcon}
                {title === "Resumes" && resumeIcon}
                {title === "Cover Letters" && coverLetterIcon}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hover ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={styles.overlay}
            >
                <motion.p className={styles.text}>{title}</motion.p>
                <motion.p className={styles.numberText}>{number}</motion.p>
                {title === "Jobs" && jobIcon}
                {title === "Resumes" && resumeIcon}
                {title === "Cover Letters" && coverLetterIcon}
            </motion.div>
        </Link>
    );
};

export default Card;
