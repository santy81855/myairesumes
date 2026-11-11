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
        const searchableFields = type === "job"
            ? [doc.companyName, doc.jobName]
            : [doc.information?.documentName, doc.information?.jobTitle, doc.information?.position, doc.job?.companyName, doc.job?.jobName];
        const matchesSearchQuery = searchableFields.some((value) =>
            String(value ?? "").toLowerCase().includes(searchQuery.toLowerCase())
        );

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
                placeholder={type === "job" ? "Search applications by role or company…" : "Search your documents…"}
                aria-label={type === "job" ? "Search applications" : "Search documents"}
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
                        aria-pressed={selectedColor === ""}
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
                            aria-label={`Filter applications by color ${color}`}
                            aria-pressed={color === selectedColor}
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
            <p className={styles.resultCount} aria-live="polite">{filteredDocuments.length} {filteredDocuments.length === 1 ? "result" : "results"}</p>
            {filteredDocuments.length === 0 && <p className={styles.empty}>No matches yet. Try a different search or choose another color.</p>}
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
                        aria-label="Previous page"
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
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
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
                        aria-label="Next page"
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
