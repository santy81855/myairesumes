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
    getAllCoverLetterTemplates,
    updateDocument,
    updateCoverLetter,
} from "@/features/editor";
import { useSearchParams } from "next/navigation";
import EditModalWrapper from "@/components/modals/edit/edit-modal-wrapper/EditModalWrapper";

type DocumentContainerProps = {
    document: any;
    type: string;
};

const DocumentContainer = ({ document, type }: DocumentContainerProps) => {
    const searchParams = useSearchParams();
    const showEditModal = searchParams.get("edit") || null;
    //  const search = searchParams.get('search')
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
            const template =
                type === "resume"
                    ? getAllResumeTemplates(doc, true)
                    : getAllCoverLetterTemplates(doc, true);
            const updatedDoc =
                type === "resume"
                    ? updateDocument(doc, doc.information.template, true)
                    : updateCoverLetter(doc, doc.information.template, true);
            setCurrentTemplate(
                template[doc.information.template as keyof typeof template]
                    ?.editorComponent
            );
            setCurrentDocument(updatedDoc);
        } else {
            const template =
                type === "resume"
                    ? getAllResumeTemplates(doc, false)
                    : getAllCoverLetterTemplates(doc, false);
            const updatedDoc =
                type === "resume"
                    ? updateDocument(doc, doc.information.template, false)
                    : updateCoverLetter(doc, doc.information.template, false);
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
        <>
            <section className={styles.documentContainer}>
                <section className={styles.document}>
                    {(isDocumentLoading || !currentDocument) && (
                        <LoadingScreen />
                    )}
                    {currentDocument && (
                        <DndProvider backend={HTML5Backend}>
                            {currentTemplate}
                        </DndProvider>
                    )}
                </section>
            </section>
            {showEditModal && currentDocument && (
                <EditModalWrapper
                    document={currentDocument}
                    sectionId={showEditModal}
                />
            )}
        </>
    );
};

export default DocumentContainer;
