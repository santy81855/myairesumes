"use client";
import styles from "./TitleBar.module.css";
import { downloadIcon, saveIcon } from "@/components/icons/iconSVG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PDFDownloadLink dynamically to avoid SSR
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <></>,
    }
);
import { useAppContext } from "@/app/providers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    updateResumeAction,
    updateCoverLetterAction,
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
    updateDocument,
    updateCoverLetter,
} from "@/features/editor";

const TitleBar = () => {
    const { documentArray, isDocumentLoading, setIsDocumentLoading } =
        useAppContext();
    const params = useParams();
    const type = params.slug[0];
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
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
                    ?.downloadComponent
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
                    ?.downloadComponent
            );
            setCurrentDocument(updatedDoc);
        }
    }, [documentArray]);

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        if (!currentDocument) return;
        setIsDocumentLoading(true);
        const formData = new FormData();
        formData.append("document", JSON.stringify(currentDocument));
        const response =
            type === "resume"
                ? await updateResumeAction(formData)
                : await updateCoverLetterAction(formData);
        if (response.error) {
            toast.error("Error saving currentDocument.");
            setIsDocumentLoading(false);
        } else {
            toast.success("Document saved successfully.");
            setIsDocumentLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            {currentDocument && (
                <>
                    <p className={styles.title} title="title">
                        {currentDocument.information.documentName}
                    </p>
                    <div className={styles.downloadContainer}>
                        <form
                            className={styles.saveIconContainer}
                            title="save"
                            onSubmit={handleUpdate}
                        >
                            <button type="submit">{saveIcon}</button>
                        </form>
                        <PDFDownloadLink
                            document={currentTemplate}
                            fileName={`${currentDocument.information.documentName}.pdf`}
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    ""
                                ) : (
                                    <div
                                        className={styles.iconContainer}
                                        title="download"
                                    >
                                        {downloadIcon}
                                    </div>
                                )
                            }
                        </PDFDownloadLink>
                    </div>
                </>
            )}
        </section>
    );
};

export default TitleBar;
