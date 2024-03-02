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

    return (
        <section className={styles.container}>
            {document && (
                <>
                    <ReorderButton />
                    <section className={styles.pageFunctionContainer}>
                        <PageCounter documentId={documentId} />
                    </section>
                </>
            )}
        </section>
    );
};

export default PageUtilBar;
