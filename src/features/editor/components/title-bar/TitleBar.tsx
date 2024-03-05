"use client";
import styles from "./TitleBar.module.css";
import { useAppContext } from "@/app/providers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const TitleBar = () => {
    const { documentArray } = useAppContext();
    const params = useParams();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );

        setCurrentDocument(doc);
    }, [documentArray]);

    return (
        <section className={styles.container}>
            {currentDocument && (
                <p className={styles.title} title="title">
                    {currentDocument.information.documentName}
                </p>
            )}
        </section>
    );
};

export default TitleBar;
