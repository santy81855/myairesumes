"use client";
import styles from "./PageUtilBar.module.css";
import ReorderButton from "./reorder-button/ReorderButton";
import { minusIcon, plusIcon } from "@/components/icons/iconSVG";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { updateDocumentArray, PageCounter } from "@/features/editor";

type PageUtilBarProps = {
    documentId: string;
};
const PageUtilBar = ({ documentId }: PageUtilBarProps) => {
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
        <section className={styles.container}>
            {document && (
                <>
                    <ReorderButton />
                    <section className={styles.pageFunctionContainer}>
                        <section className={styles.functionButtonContainer}>
                            {document.information.numPages > 1 && (
                                <button
                                    title="delete page"
                                    className={styles.deletePageButton}
                                    onClick={handleDeletePage}
                                >
                                    {minusIcon}
                                </button>
                            )}
                            <button
                                title="add page"
                                className={styles.addPageButton}
                                onClick={handleAddPage}
                            >
                                {plusIcon}
                            </button>
                        </section>
                        <PageCounter documentId={documentId} />
                    </section>
                </>
            )}
        </section>
    );
};

export default PageUtilBar;
