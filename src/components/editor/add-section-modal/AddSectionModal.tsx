"use client";
import styles from "./AddSectionModal.module.css";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";

const AddSectionModal = () => {
    const { documentArray, showComponentModal, setShowComponentModal } =
        useAppContext();
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.id)
        );
    }, [documentArray]);

    return (
        showComponentModal &&
        showComponentModal.hasOwnProperty(params.id as string) &&
        document && (
            <section
                className={styles.background}
                onClick={() => {
                    const { [params.id as string]: _, ...newState } =
                        showComponentModal;
                    setShowComponentModal(newState);
                }}
            >
                <section className={styles.searchContainer}>
                    <p>{showComponentModal[params.id as string]}</p>
                </section>
                <section className={styles.resultContainer}>
                    <p>results</p>
                </section>
            </section>
        )
    );
};

export default AddSectionModal;
