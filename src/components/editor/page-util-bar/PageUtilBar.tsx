"use client";
import styles from "./PageUtilBar.module.css";
import ReorderButton from "./reorder-button/ReorderButton";
import PageCounter from "./page-counter/PageCounter";
import { trashIcon } from "@/components/icons/iconSVG";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { updateDocumentArray } from "@/lib/document";

type PageUtilBarProps = {
    resumeId: string;
};
const PageUtilBar = ({ resumeId }: PageUtilBarProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [document, setDocument] = useState(
        documentArray.find((document) => document.id === resumeId)
    );
    useEffect(() => {
        setDocument(documentArray.find((document) => document.id === resumeId));
    }, [documentArray]);
    console.log(document);
    const handleDeletePage = () => {
        if (!document) return;
        if (document.information.numPages === 1) return;
        // remove the sectionOrder array for this page from the document
        let newSectionOrder = [...document.information.sectionOrder];
        newSectionOrder.splice(document.currentPage - 1, 1);
        console.log(newSectionOrder);
        const newNumPages = document.information.numPages - 1;
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                numPages: newNumPages,
                sectionOrder: newSectionOrder,
            },
            currentPage:
                document.currentPage === 1 ? 1 : document.currentPage - 1,
        };
        console.log(updatedDocument);
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        console.log(newDocumentArray);
        setDocumentArray(newDocumentArray);
    };

    return (
        <section className={styles.container}>
            <ReorderButton />
            <section className={styles.pageFunctionContainer}>
                <PageCounter resumeId={resumeId} />
                {document && document.information.numPages > 1 && (
                    <button
                        title="delete page"
                        className={styles.deletePageButton}
                        onClick={handleDeletePage}
                    >
                        {trashIcon}
                    </button>
                )}
            </section>
        </section>
    );
};

export default PageUtilBar;
