"use client";
import styles from "./DocumentContainer.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    PageButtons,
    getAllResumeTemplates,
    updateDocument,
} from "@/features/editor";

type DocumentContainerProps = {
    document: any;
};

const DocumentContainer = ({ document }: DocumentContainerProps) => {
    const id = document.id;
    const { documentArray, setDocumentArray, isDocumentLoading } =
        useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);

    useEffect(() => {
        const doc = documentArray.find((document) => document.id === id);
        if (!doc) return;

        // Update the current document only if it's not already set
        if (
            currentDocument &&
            doc.information.template !== currentDocument?.information.template
        ) {
            const template = getAllResumeTemplates(doc, true);
            const updatedDoc = updateDocument(
                doc,
                doc.information.template,
                true
            );
            setCurrentTemplate(
                template[doc.information.template as keyof typeof template]
                    ?.editorComponent
            );
            setCurrentDocument(updatedDoc);
        } else {
            const template = getAllResumeTemplates(doc, false);
            const updatedDoc = updateDocument(
                doc,
                doc.information.template,
                false
            );
            setCurrentTemplate(
                template[doc.information.template as keyof typeof template]
                    ?.editorComponent
            );
            setCurrentDocument(updatedDoc);
        }
    }, [documentArray]);

    useEffect(() => {
        // add the document to the document array if it is not already there
        const tempArray = [...documentArray];
        if (!tempArray.some((document: any) => document.id === id)) {
            tempArray.push({
                id,
                currentPage: 1,
                information: document.information,
            });
            setCurrentDocument({
                id,
                currentPage: 1,
                information: document.information,
            });
            setDocumentArray(tempArray);
        } else {
            const updatedDocument = documentArray.find(
                (document) => document.id === id
            );
            setCurrentDocument(updatedDocument);
        }
    }, []);

    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>
                {(isDocumentLoading || !currentDocument) && <LoadingScreen />}
                {currentDocument && (
                    <DndProvider backend={HTML5Backend}>
                        {currentTemplate}
                    </DndProvider>
                )}
            </section>
            <PageButtons documentId={id} />
        </section>
    );
};

export default DocumentContainer;
