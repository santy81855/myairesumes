"use client";
import styles from "./PageCounter.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { backArrow, forwardArrow } from "@/components/icons/iconSVG";

type PageCounterProps = {
    resumeId: string;
};

const PageCounter = ({ resumeId }: PageCounterProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    useEffect(() => {
        const currentDocument = documentArray.find(
            (document) => document.id === resumeId
        );
        setCurrentDocument(currentDocument);
    }, [documentArray]);

    return currentDocument ? (
        <div className={styles.pageCounter}>
            <p>Page</p>
            {currentDocument.currentPage > 1 && (
                <div className={styles.pageChanger}>{backArrow}</div>
            )}
            <p>{currentDocument.currentPage}</p>
            <p>of</p>
            <p>{currentDocument.information.numPages}</p>
            {currentDocument.currentPage <
                currentDocument.information.numPages && (
                <div className={styles.pageChanger}>{forwardArrow}</div>
            )}
        </div>
    ) : (
        <p>Page ...</p>
    );
};

export default PageCounter;
