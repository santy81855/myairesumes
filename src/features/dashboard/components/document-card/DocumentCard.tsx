"use client";
import styles from "./DocumentCard.module.css";
import { formatDateMonthDayYear } from "@/lib/date";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type DocumentCardProps = {
    doc: any;
    type: string;
    templates: any;
};

const DocumentCard = ({ templates, doc, type }: DocumentCardProps) => {
    const [hover, setHover] = useState(false);

    const timeAgo = (timestamp: string) => {
        const currentDate = new Date();
        const targetDate = new Date(timestamp);
        const elapsedMs = currentDate.getTime() - targetDate.getTime();

        // Calculate elapsed time in minutes
        const elapsedMinutes = Math.round(elapsedMs / (1000 * 60));

        if (elapsedMinutes < 1) {
            return "just now";
        } else if (elapsedMinutes === 1) {
            return "1 minute ago";
        } else if (elapsedMinutes < 60) {
            return `${elapsedMinutes} minutes ago`;
        } else if (elapsedMinutes < 1440) {
            const hours = Math.floor(elapsedMinutes / 60);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        } else {
            const days = Math.floor(elapsedMinutes / 1440);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
        }
    };

    return (
        <section
            className={styles.resumeCard}
            key={doc.id}
            onMouseOverCapture={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={styles.resumeContainer}>
                <motion.div
                    className={styles.resume}
                    initial={{ y: 0 }}
                    animate={{ y: hover ? "-3%" : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {
                        templates[
                            doc.information.template as keyof typeof templates
                        ]?.previewComponent
                    }
                </motion.div>
            </div>
            <div className={styles.resumeInfoContainer}>
                <div className={styles.resumeInfo}>
                    <div className={styles.textItem}>
                        <p className={styles.label}>Name</p>
                        <p className={styles.title}>
                            {doc.information.documentName}
                        </p>
                    </div>

                    <div className={styles.textItem}>
                        <p className={styles.label}>Description</p>
                        <p className={styles.description}>
                            {doc.information.description}
                        </p>
                    </div>
                </div>
            </div>
            <section className={styles.optionContainer}>
                <a
                    className={styles.option}
                    title={`Edit ${
                        type === "resume" ? "Resume" : "Cover Letter"
                    }`}
                    href={`/editor/${type}/${doc.id}`}
                >
                    Edit
                </a>
                <p
                    title={formatDateMonthDayYear(doc.updatedAt)}
                    className={styles.date}
                >
                    {timeAgo(doc.updatedAt)}
                </p>
            </section>
        </section>
    );
};

export default DocumentCard;
