"use client";
import styles from "./DocumentCardDisplay.module.css";
import Basic from "@/components/resume-templates/basic/Basic";
import { formatDateMonthDayYear } from "@/lib/date";
import { useState } from "react";

type DocumentCardDisplayProps = {
    documents: any[];
};

const DocumentCardDisplay = ({ documents }: DocumentCardDisplayProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsPerPage, setDocumentsPerPage] = useState(10);
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = documents.slice(
        indexOfFirstDocument,
        indexOfLastDocument
    );

    const handleNextPage = () => {
        if (indexOfLastDocument < documents.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstDocument > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(Math.ceil(documents.length / documentsPerPage));
    };

    return (
        <>
            <section className={styles.resumesContainer}>
                {currentDocuments.map((resume: any) => {
                    return (
                        <section className={styles.resumeCard} key={resume.id}>
                            <div className={styles.resumeContainer}>
                                <div className={styles.resume}>
                                    <Basic document={resume} isPreview={true} />
                                </div>
                            </div>
                            <div className={styles.resumeInfoContainer}>
                                <div className={styles.resumeInfo}>
                                    <p className={styles.title}>
                                        {resume.information.documentName}
                                    </p>
                                    <p className={styles.date}>
                                        {formatDateMonthDayYear(
                                            resume.updatedAt
                                        )}
                                    </p>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </section>
            <section className={styles.paginationContainer}>
                <button
                    className={styles.paginationButton}
                    onClick={handleFirstPage}
                >
                    First
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                >
                    Next
                </button>
                <button
                    className={styles.paginationButton}
                    onClick={handleLastPage}
                >
                    Last
                </button>
            </section>
        </>
    );
};

export default DocumentCardDisplay;
