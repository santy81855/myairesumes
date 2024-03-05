"use client";
import styles from "./PageButtons.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { updateDocumentArray } from "@/features/editor";
import { minusIcon, plusIcon } from "@/components/icons/iconSVG";

type PageButtonsProps = {
    documentId: string;
};

const PageButtons = ({ documentId }: PageButtonsProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [document, setDocument] = useState<any>(null);
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
                sectionOrder: [...document.information.sectionOrder, []],
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

    const handleDeletePage = () => {
        if (!document) return;
        if (document.information.numPages === 1) return;
        // remove the sectionOrder array for this page from the document
        let newSectionOrder = [...document.information.sectionOrder];
        newSectionOrder.splice(document.currentPage - 1, 1);
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
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };
    return (
        document && (
            <section className={styles.functionButtonContainer}>
                <button
                    title="delete page"
                    className={
                        document.information.numPages > 1
                            ? styles.button
                            : styles.disabledButton
                    }
                    onClick={handleDeletePage}
                >
                    {minusIcon}
                </button>

                <button
                    title="add page"
                    className={styles.button}
                    onClick={handleAddPage}
                >
                    {plusIcon}
                </button>
            </section>
        )
    );
};

export default PageButtons;
