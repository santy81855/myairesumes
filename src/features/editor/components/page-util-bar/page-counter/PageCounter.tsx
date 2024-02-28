"use client";
import styles from "./PageCounter.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { backArrow, forwardArrow } from "@/components/icons/iconSVG";
import { updateDocumentArray } from "@/features/editor";

type PageCounterProps = {
    documentId: string;
    fullWidth?: boolean;
};

const PageCounter = ({ documentId, fullWidth }: PageCounterProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [document, setDocument] = useState(
        documentArray.find((document) => document.id === documentId)
    );

    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === documentId)
        );
    }, [documentArray]);

    const handleBack = () => {
        if (!document) return;
        if (document.currentPage === 1) return;
        const updatedDocument = {
            ...document,
            currentPage: document.currentPage - 1,
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );

        setDocumentArray(newDocumentArray);
    };

    const handleForward = () => {
        if (!document) return;
        if (document.currentPage === document.information.numPages) return;
        const updatedDocument = {
            ...document,
            currentPage: document.currentPage + 1,
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    return (
        <div
            className={styles.pageCounter}
            style={fullWidth ? { width: "100%" } : {}}
        >
            {document ? (
                <>
                    <p>Page</p>
                    <p>{document.currentPage}</p>
                    <p>of</p>
                    <p>{document.information.numPages}</p>
                    {document.currentPage > 1 && (
                        <button
                            title="previous"
                            className={styles.pageChanger}
                            onClick={handleBack}
                        >
                            {backArrow}
                        </button>
                    )}
                    {document.currentPage < document.information.numPages && (
                        <button
                            title="next"
                            className={styles.pageChanger}
                            onClick={handleForward}
                        >
                            {forwardArrow}
                        </button>
                    )}
                </>
            ) : (
                <p>Page ...</p>
            )}
        </div>
    );
};

export default PageCounter;
