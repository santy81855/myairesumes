"use client";
import styles from "./Card.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    coloredJobIcon,
    coloredResumeIcon,
    coloredCoverLetterIcon,
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

    return (
        <section
            className={styles.cardContainer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <section className={styles.titleTab}>
                <p className={styles.tabNumber}>{number}</p>
                <h3 className={styles.tabTitle}>
                    {" "}
                    {title === "Jobs" ? "Applications" : title}
                </h3>
            </section>
            <Link
                href={`/dashboard?menu=${title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}&documentPage=1`}
                title={title}
                className={styles.container}
                style={{
                    gridArea,
                    backgroundImage: `url(${url})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <motion.div className={styles.overlayTouch}>
                    {title === "Jobs" && coloredJobIcon}
                    {title === "Resumes" && coloredResumeIcon}
                    {title === "Cover Letters" && coloredCoverLetterIcon}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hover ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.overlay}
                >
                    {title === "Jobs" && (
                        <motion.div
                            initial={{ y: "200%" }}
                            animate={{ y: hover ? "100%" : "200%" }}
                            transition={{ duration: 0.2 }}
                            className={styles.iconContainer}
                        >
                            {coloredJobIcon}
                        </motion.div>
                    )}
                    {title === "Resumes" && (
                        <motion.div
                            initial={{ y: "200%" }}
                            animate={{ y: hover ? "100%" : "200%" }}
                            transition={{ duration: 0.2 }}
                            className={styles.iconContainer}
                        >
                            {coloredResumeIcon}
                        </motion.div>
                    )}
                    {title === "Cover Letters" && (
                        <motion.div
                            initial={{ y: "200%" }}
                            animate={{ y: hover ? "100%" : "200%" }}
                            transition={{ duration: 0.2 }}
                            className={styles.iconContainer}
                        >
                            {coloredCoverLetterIcon}
                        </motion.div>
                    )}
                </motion.div>
            </Link>
        </section>
    );
};

export default Card;
