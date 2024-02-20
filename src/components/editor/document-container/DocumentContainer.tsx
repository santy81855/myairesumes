"use client";
import styles from "./DocumentContainer.module.css";
import Basic from "@/components/resume-templates/basic/Basic";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

type DocumentContainerProps = {
    resume: any;
};

const DocumentContainer = ({ resume }: DocumentContainerProps) => {
    const id = resume.id;
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const { documentArray, setDocumentArray } = useAppContext();
    useEffect(() => {
        if (!localStorage.getItem("documentArray")) {
            localStorage.setItem("documentArray", JSON.stringify([]));
        } else {
            const initialArray = JSON.parse(
                localStorage.getItem("documentArray") as string
            );
            // add the resume to the document array if it is not already there
            if (!initialArray.some((document: any) => document.id === id)) {
                initialArray.push({
                    id,
                    currentPage: 1,
                    information: resume.information,
                });
            }
            setDocumentArray(initialArray);
            setCurrentDocument({
                id,
                currentPage: 1,
                information: resume.information,
            });
        }
    }, []);

    useEffect(() => {
        // whenever the document array changes, update the currentDocument
        const currentDocument = documentArray.find(
            (document) => document.id === id
        );
        setCurrentDocument(currentDocument);
    }, [documentArray]);

    const updateDocument = (updatedDocument: any) => {
        const { id } = updatedDocument;
        // update the documentArray with the new information
        const newDocumentArray = documentArray.map((document) => {
            if (document.id === id) {
                return updatedDocument;
            }
            return document;
        });
        setDocumentArray(newDocumentArray);
    };

    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>
                <DndProvider backend={HTML5Backend}>
                    {!currentDocument && <LoadingScreen />}
                    {currentDocument && (
                        <Basic
                            document={currentDocument}
                            updateDocument={updateDocument}
                        />
                    )}
                </DndProvider>
            </section>
        </section>
    );
};

export default DocumentContainer;
