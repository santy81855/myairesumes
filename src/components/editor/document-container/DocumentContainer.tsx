"use client";
import styles from "./DocumentContainer.module.css";
import Basic from "@/components/resume-templates/basic/Basic";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { updateDocumentArray } from "@/lib/document";

type DocumentContainerProps = {
    resume: any;
};

const DocumentContainer = ({ resume }: DocumentContainerProps) => {
    const id = resume.id;
    const { documentArray, setDocumentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);

    useEffect(() => {
        setCurrentDocument(
            documentArray.find((document) => document.id === id)
        );
    }, [documentArray]);

    useEffect(() => {
        // add the resume to the document array if it is not already there
        const tempArray = [...documentArray];
        if (!tempArray.some((document: any) => document.id === id)) {
            tempArray.push({
                id,
                currentPage: 1,
                information: resume.information,
            });
            setCurrentDocument({
                id,
                currentPage: 1,
                information: resume.information,
            });
            setDocumentArray(tempArray);
        } else {
            const updatedDocument = documentArray.find(
                (document) => document.id === id
            );
            setCurrentDocument(updatedDocument);
        }
    }, []);

    const updateDocument = (updatedDocument: any) => {
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const documentPages =
        currentDocument &&
        Array.from({ length: currentDocument.information.numPages }).map(
            (_, index) => (
                <Basic
                    key={`page${index}`}
                    resumeId={id}
                    updateDocument={updateDocument}
                    index={index}
                />
            )
        );

    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>
                <DndProvider backend={HTML5Backend}>
                    {!currentDocument && <LoadingScreen />}
                    {currentDocument &&
                        documentPages[currentDocument.currentPage - 1]}
                </DndProvider>
            </section>
        </section>
    );
};

export default DocumentContainer;
