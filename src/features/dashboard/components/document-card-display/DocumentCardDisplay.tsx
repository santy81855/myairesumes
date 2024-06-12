"use client";
import {
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
} from "@/features/editor";
import styles from "./DocumentCardDisplay.module.css";
import { DocumentCard, JobCard } from "@/features/dashboard";
import { useState } from "react";
import { nextIcon, previousIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { jobCardColorArray } from "@/features/dashboard";

type DocumentCardDisplayProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
    type: string;
    setJob?: (job: any) => void;
};

const DocumentCardDisplay = ({
    searchParams,
    documents,
    type,
    setJob,
}: DocumentCardDisplayProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showColorOptions, setShowColorOptions] = useState(false);
    const maxDocuments = 20;

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearchQuery =
            // filter jobs by the company name and job name and filter resumes and cover letters by the document name, job title, and position
            type === "job"
                ? doc.companyName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  doc.jobName.toLowerCase().includes(searchQuery.toLowerCase())
                : doc.information.documentName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  doc.information.jobTitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  doc.information.position
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  doc.job.companyName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  doc.job.jobName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());

        const matchesColor = selectedColor ? doc.color === selectedColor : true;

        return matchesSearchQuery && matchesColor;
    });

    const start = (currentPage - 1) * maxDocuments;
    const end = start + maxDocuments;
    const paginatedDocuments = filteredDocuments
        .sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
        )
        .slice(start, end);

    const pages = Array.from(
        { length: Math.ceil(filteredDocuments.length / maxDocuments) },
        (_, i) => i + 1
    );

    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    const handleColorFilter = (color: string) => {
        setSelectedColor(color);
        setCurrentPage(1);
    };

    return (
        <section className={styles.container}>
            <input
                type="text"
                placeholder="Search..."
                className={styles.searchBar}
                value={searchQuery}
                onChange={(e) => {
                    if (currentPage !== 1) {
                        setCurrentPage(1);
                    }
                    setSearchQuery(e.target.value);
                }}
            />
            {type === "job" && (
                <motion.section className={styles.buttonOptions}>
                    <button
                        type="button"
                        className={`${styles.allButton} ${
                            selectedColor === "" && styles.activeColor
                        }`}
                        onClick={() => {
                            setSelectedColor("");
                            setCurrentPage(1);
                        }}
                    >
                        All
                    </button>
                    {jobCardColorArray.map((color) => (
                        <motion.button
                            key={color}
                            type="button"
                            style={{ backgroundColor: color }}
                            className={`${styles.colorButton} ${
                                color === selectedColor && styles.activeColor
                            }`}
                            onClick={() => {
                                handleColorFilter(color);
                            }}
                        ></motion.button>
                    ))}
                </motion.section>
            )}
            <section className={styles.resultsContainer}>
                {type === "job" ? (
                    <section className={styles.resumesContainer}>
                        {paginatedDocuments.map((doc: any) => {
                            if (doc.resume) {
                                doc.resume.currentPage = 1;
                            }
                            return (
                                <JobCard
                                    key={doc.id}
                                    doc={doc}
                                    type={type}
                                    setJob={setJob ? setJob : () => {}}
                                />
                            );
                        })}
                    </section>
                ) : (
                    <section className={styles.resumesContainer}>
                        {paginatedDocuments.map((doc: any) => {
                            doc.currentPage = 1;
                            const templates =
                                type === "resume"
                                    ? getAllResumeTemplates(doc, false)
                                    : getAllCoverLetterTemplates(doc, false);
                            return (
                                <DocumentCard
                                    key={doc.id}
                                    templates={templates}
                                    doc={doc}
                                    type={type}
                                />
                            );
                        })}
                    </section>
                )}
            </section>
            {pages.length > 1 && (
                <section className={styles.paginationContainer}>
                    <button
                        type="button"
                        onClick={() => setCurrentPage(1)}
                        className={styles.longButton}
                    >
                        First
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(
                                prevPage > 0 ? prevPage : pages.length
                            )
                        }
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>
                            {previousIcon}
                        </div>
                    </button>
                    {pages.map((page: number) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`${
                                currentPage === page
                                    ? styles.active
                                    : styles.buttonNumber
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(
                                nextPage <= pages.length ? nextPage : 1
                            )
                        }
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>{nextIcon}</div>
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrentPage(pages.length)}
                        className={styles.longButton}
                    >
                        Last
                    </button>
                </section>
            )}
        </section>
    );
};

export default DocumentCardDisplay;
