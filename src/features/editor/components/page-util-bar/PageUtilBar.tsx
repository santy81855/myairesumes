"use client";
import styles from "./PageUtilBar.module.css";

import { minusIcon, plusIcon } from "@/components/icons/iconSVG";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import {
    updateDocumentArray,
    PageCounter,
    PageButtons,
} from "@/features/editor";

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
                    <PageButtons documentId={documentId} />

                    <PageCounter documentId={documentId} />
                </>
            )}
        </section>
    );
};

export default PageUtilBar;
