"use client";
import styles from "./TitleBar.module.css";
import { useAppContext } from "@/app/providers";
import { useEffect, useState } from "react";
import {
    editIcon,
    checkOutlineIcon,
    cancelIcon,
} from "@/components/icons/iconSVG";
import {
    updateDocumentArray,
    updateCoverLetterAction,
    updateResumeAction,
} from "@/features/editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter, permanentRedirect } from "next/navigation";

const TitleBar = () => {
    const { documentArray, setDocumentArray, setIsDocumentLoading } =
        useAppContext();
    const params = useParams();
    const type = params.slug[0];
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
        if (!doc) return;
        setInputValue(doc.information.documentName);
        setCurrentDocument(doc);
    }, [documentArray]);

    const handleSave = async (e: any) => {
        if (!currentDocument) return;
        // update the orderArray in the document
        const updatedDocument = {
            ...currentDocument,
            information: {
                ...currentDocument.information,
                documentName: inputValue,
            },
        };
        // update the documentArray
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        setIsDocumentLoading(true);
        const formData = new FormData();
        formData.append("document", JSON.stringify(updatedDocument));
        const response =
            type === "resume"
                ? await updateResumeAction(formData)
                : await updateCoverLetterAction(formData);
        if (response.error) {
            toast.error("Error updating document.");
            setIsEditing(false);
            setIsDocumentLoading(false);
        } else {
            toast.success("Document updated successfully.");
            setIsEditing(false);
            setIsDocumentLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            {currentDocument &&
                (isEditing ? (
                    <form className={styles.inputContainer} action={handleSave}>
                        <input
                            type="text"
                            className={styles.titleInput}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            className={`${styles.saveIconContainer} ${styles.cancelIconContainer}`}
                            title="Cancel editing"
                            onClick={() => {
                                setIsEditing(false);
                            }}
                        >
                            {cancelIcon}
                        </button>
                        <button
                            type="submit"
                            className={styles.saveIconContainer}
                            title="Save document name"
                        >
                            {checkOutlineIcon}
                        </button>
                    </form>
                ) : (
                    <section className={styles.titleContainer}>
                        <p className={styles.title} title="Document name">
                            {currentDocument.information.documentName}
                        </p>
                        <button
                            className={styles.iconContainer}
                            title="Edit document name"
                            onClick={() => setIsEditing(true)}
                        >
                            {editIcon}
                        </button>
                    </section>
                ))}
        </section>
    );
};

export default TitleBar;
