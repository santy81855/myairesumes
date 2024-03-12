"use client";
import styles from "./JobCard.module.css";
import { formatDateMonthDayYear } from "@/lib/date";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
} from "@/features/editor";

type JobCardProps = {
    doc: any;
    type: string;
    setJob: (job: any) => void;
};

const JobCard = ({ doc, type, setJob }: JobCardProps) => {
    const [hover, setHover] = useState(false);

    const getUpdatedTime = (doc: any) => {
        // get the most recent update between the doc.resume and doc.coverLetter objects
        const resumeUpdated = doc.resume ? doc.resume.updatedAt : null;
        const coverLetterUpdated = doc.coverLetter
            ? doc.coverLetter.updatedAt
            : null;
        // if both resume and cover letter then choose the most recent between job, resume, and cover letter
        if (resumeUpdated && coverLetterUpdated) {
            return resumeUpdated > coverLetterUpdated
                ? resumeUpdated > doc.updatedAt
                    ? timeAgo(resumeUpdated)
                    : timeAgo(doc.updatedAt)
                : coverLetterUpdated > doc.updatedAt
                ? timeAgo(coverLetterUpdated)
                : timeAgo(doc.updatedAt);
        }
        // if only a resume then choose the most recent between resume and job
        return resumeUpdated > doc.updatedAt
            ? timeAgo(resumeUpdated)
            : timeAgo(doc.updatedAt);
    };

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

    const resumeTemplates = doc.resume
        ? getAllResumeTemplates(doc.resume, false)
        : null;
    const coverLetterTemplates = doc.coverLetter
        ? getAllCoverLetterTemplates(doc.coverLetter, false)
        : null;

    return (
        <section
            className={styles.resumeCard}
            key={doc.id}
            onMouseOverCapture={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={styles.resumeContainer}>
                {resumeTemplates && (
                    <motion.div
                        className={`${
                            coverLetterTemplates ? styles.left : styles.resume
                        }`}
                        initial={{ y: 0 }}
                        animate={{ y: hover ? "-3%" : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {
                            resumeTemplates[
                                doc.resume.information
                                    .template as keyof typeof resumeTemplates
                            ]?.previewComponent
                        }
                    </motion.div>
                )}
                {coverLetterTemplates && (
                    <motion.div
                        className={`${
                            resumeTemplates ? styles.right : styles.resume
                        }`}
                        initial={{ y: 0 }}
                        animate={{ y: hover ? "-3%" : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {
                            coverLetterTemplates[
                                doc.coverLetter.information
                                    .template as keyof typeof coverLetterTemplates
                            ]?.previewComponent
                        }
                    </motion.div>
                )}
            </div>
            <div
                className={styles.colorBar}
                style={{
                    backgroundColor: doc.color,
                }}
            />
            <div className={styles.resumeInfoContainer}>
                <div className={styles.resumeInfo}>
                    <div className={styles.textItem}>
                        <p className={styles.label}>Company Name</p>
                        <p className={styles.title}>{doc.companyName}</p>
                    </div>
                    <div className={styles.textItem}>
                        <p className={styles.label}>Position</p>
                        <p className={styles.title}>{doc.jobName}</p>
                    </div>
                </div>
            </div>

            <section className={styles.optionContainer}>
                <button
                    type="button"
                    title="Manage Job"
                    className={styles.option}
                    onClick={(e: any) => {
                        e.preventDefault();
                        setJob(doc);
                    }}
                >
                    Manage
                </button>
                <p
                    title={formatDateMonthDayYear(doc.updatedAt)}
                    className={styles.date}
                >
                    {getUpdatedTime(doc)}
                </p>
            </section>
        </section>
    );
};

export default JobCard;
