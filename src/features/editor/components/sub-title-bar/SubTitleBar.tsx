"use client";
import styles from "./SubTitleBar.module.css";
import {
    downloadIcon,
    saveIcon,
    orderIcon,
    trashIcon,
    editIcon,
} from "@/components/icons/iconSVG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "@/app/providers";
import { useEffect, useState } from "react";
import { useParams, useRouter, permanentRedirect } from "next/navigation";
// import PDFDownloadLink dynamically to avoid SSR
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <></>,
    }
);
import {
    updateResumeAction,
    updateCoverLetterAction,
    deleteResumeAction,
    deleteCoverLetterAction,
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
    updateDocument,
    updateCoverLetter,
    isLastJobDocumentAction,
    deleteJobAction,
} from "@/features/editor";

const SubTitleBar = () => {
    const {
        documentArray,
        setDocumentArray,
        setIsDocumentLoading,
        isReordering,
        setIsReordering,
        setIsEditing,
        isEditing,
    } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    const [warningJob, setWarningJob] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const type = params.slug[0];
    const id = params.slug[1];

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

    const handleFinalDelete = async (e: any) => {
        e.preventDefault();
        if (!currentDocument) return;
        setIsDocumentLoading(true);
        try {
            const jobId = warningJob.id;
            setWarningJob(null);
            // remove the current document from the documentArray and set the new documentArray
            const newDocumentArray = documentArray.filter(
                (doc) => doc.id !== currentDocument.id
            );
            setDocumentArray(newDocumentArray);

            if (type === "resume") {
                await deleteResumeAction(currentDocument.id);
            } else {
                await deleteCoverLetterAction(currentDocument.id);
            }

            // delete the job
            await deleteJobAction(jobId);

            // wait for 1 second and then redirect to the dashboard
            if (type === "resume") {
                // wait for 1 second and then redirect to the dashboard
                router.push("/dashboard?menu=resumes&documentPage=1");
            } else {
                // wait for 1 second and then redirect to the dashboard
                router.push("/dashboard?menu=cover-letters&documentPage=1");
            }
        } catch (error) {
            toast.error("Error deleting document.");
            setIsDocumentLoading(false);
        }
    };

    const handleInitialDelete = async (e: any) => {
        e.preventDefault();
        if (!currentDocument) {
            return;
        }
        setIsDocumentLoading(true);
        try {
            // check if it is the last job document
            const isLastJobDocument = await isLastJobDocumentAction(
                currentDocument.id,
                type
            );

            if (isLastJobDocument) {
                setWarningJob(isLastJobDocument);
                setIsDocumentLoading(false);
                return;
            }

            // remove the current document from the documentArray and set the new documentArray
            const newDocumentArray = documentArray.filter(
                (doc) => doc.id !== currentDocument.id
            );
            setDocumentArray(newDocumentArray);

            if (type === "resume") {
                await deleteResumeAction(currentDocument.id);
            } else {
                await deleteCoverLetterAction(currentDocument.id);
            }

            // wait for 1 second and then redirect to the dashboard
            if (type === "resume") {
                // wait for 1 second and then redirect to the dashboard
                router.push("/dashboard?menu=resumes&documentPage=1");
            } else {
                // wait for 1 second and then redirect to the dashboard
                router.push("/dashboard?menu=cover-letters&documentPage=1");
            }
        } catch (error) {
            toast.error("Error deleting document.");
            setIsDocumentLoading(false);
        }
    };

    const handleClickReorder = () => {
        setIsEditing(false);
        setIsReordering(!isReordering);
    };

    const handleClickEdit = () => {
        setIsReordering(false);
        setIsEditing(!isEditing);
    };

    return (
        <section className={styles.container}>
            {currentDocument && (
                <>
                    <form title="delete" onSubmit={handleInitialDelete}>
                        {warningJob && (
                            <section className={styles.warningModal}>
                                <p>
                                    Since you are going to delete the only
                                    document for your job application at{" "}
                                    {warningJob.companyName}, this job will also
                                    be deleted.
                                </p>
                                <p>Continue?</p>
                                <section className={styles.warningButtons}>
                                    <button
                                        onClick={() => setWarningJob(null)}
                                        className={styles.cancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleFinalDelete}
                                        className={styles.delete}
                                    >
                                        Delete
                                    </button>
                                </section>
                            </section>
                        )}
                        <button
                            type="submit"
                            className={`${styles.iconContainer} ${styles.deleteIcon}`}
                            disabled={warningJob || isLoading}
                        >
                            {trashIcon}
                            <p>Delete</p>
                        </button>
                    </form>
                    <section className={styles.right}>
                        <button
                            title="edit mode"
                            className={`${styles.iconContainer} ${
                                isEditing && styles.active
                            }`}
                            onClick={handleClickEdit}
                        >
                            {editIcon}
                            {!isEditing && <p>Edit Mode</p>}
                            {isEditing && <p>Exit Edit Mode</p>}
                        </button>
                        <button
                            title="reorder mode"
                            className={`${styles.iconContainer} ${
                                isReordering && styles.active
                            }`}
                            onClick={handleClickReorder}
                        >
                            {orderIcon}
                            {!isReordering && <p>Reorder Mode</p>}
                            {isReordering && <p>Exit Reorder Mode</p>}
                        </button>
                        <form title="save" onSubmit={handleUpdate}>
                            <button
                                type="submit"
                                className={styles.iconContainer}
                            >
                                {saveIcon}
                                <p>Save</p>
                            </button>
                        </form>
                        <PDFDownloadLink
                            document={currentTemplate}
                            fileName={`${currentDocument.information.documentName}.pdf`}
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    ""
                                ) : (
                                    <button
                                        className={styles.iconContainer}
                                        title="download"
                                    >
                                        {downloadIcon}
                                        <p>Download</p>
                                    </button>
                                )
                            }
                        </PDFDownloadLink>
                    </section>
                </>
            )}
        </section>
    );
};

export default SubTitleBar;
