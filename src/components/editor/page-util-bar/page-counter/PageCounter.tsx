"use client";
import styles from "./PageCounter.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import {
    backArrow,
    forwardArrow,
    plusIcon,
    trashIcon,
} from "@/components/icons/iconSVG";
import { updateDocumentArray } from "@/lib/document";

type PageCounterProps = {
    documentId: string;
};

const PageCounter = ({ documentId }: PageCounterProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [document, setDocument] = useState(
        documentArray.find((document) => document.id === documentId)
    );

    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === documentId)
        );
    }, [documentArray]);

    const handleAddPage = () => {
        if (!document) return;
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                sectionOrder: [
                    ...document.information.sectionOrder,
                    ["summary", "education"],
                ],
                numPages: document.information.numPages + 1,
            },
            currentPage: document.currentPage + 1,
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

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
        <div className={styles.pageCounter}>
            {document ? (
                <>
                    <p>Page</p>
                    {document.currentPage > 1 && (
                        <button
                            title="previous"
                            className={styles.pageChanger}
                            onClick={handleBack}
                        >
                            {backArrow}
                        </button>
                    )}
                    <p>{document.currentPage}</p>
                    <p>of</p>
                    <p>{document.information.numPages}</p>
                    {document.currentPage < document.information.numPages && (
                        <button
                            title="next"
                            className={styles.pageChanger}
                            onClick={handleForward}
                        >
                            {forwardArrow}
                        </button>
                    )}
                    <button
                        title="add page"
                        className={styles.addPageButton}
                        onClick={handleAddPage}
                    >
                        {plusIcon}
                    </button>
                </>
            ) : (
                <p>Page ...</p>
            )}
        </div>
    );
};

export default PageCounter;
