"use client";
import {
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
} from "@/features/editor";
import styles from "./DocumentCardDisplay.module.css";
import {
    Basic,
    Fresh,
    Impact,
    Nexus,
    Nova,
    Sharp,
    Vivid,
} from "@/features/resume";
import { formatDateMonthDayYear } from "@/lib/date";
import { useState, useEffect } from "react";

type DocumentCardDisplayProps = {
    documents: any[];
    type: string;
};

const DocumentCardDisplay = ({ documents, type }: DocumentCardDisplayProps) => {
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
                {currentDocuments.map((doc: any) => {
                    // update the resume object to include a 'currentPage' field set to 1
                    doc.currentPage = 1;
                    const templates =
                        type === "resume"
                            ? getAllResumeTemplates(doc, false)
                            : getAllCoverLetterTemplates(doc, false);
                    return (
                        <section className={styles.resumeCard} key={doc.id}>
                            <div className={styles.resumeContainer}>
                                <div className={styles.resume}>
                                    {
                                        templates[
                                            doc.information
                                                .template as keyof typeof templates
                                        ]?.previewComponent
                                    }
                                </div>
                            </div>
                            <div className={styles.resumeInfoContainer}>
                                <div className={styles.resumeInfo}>
                                    <p className={styles.title}>
                                        {doc.information.documentName}
                                    </p>
                                    <p className={styles.date}>
                                        {formatDateMonthDayYear(doc.updatedAt)}
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
