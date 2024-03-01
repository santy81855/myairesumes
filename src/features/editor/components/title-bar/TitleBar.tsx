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
import { updateResumeAction, getResumeTemplate } from "@/features/editor";
import Basic from "@/components/resume-templates/basic/Basic";

const TitleBar = () => {
    const { documentArray, isDocumentLoading, setIsDocumentLoading } =
        useAppContext();
    const params = useParams();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    useEffect(() => {
        setCurrentDocument(
            documentArray.find(
                (currentDocument) => currentDocument.id === params.slug[1]
            )
        );
    }, [documentArray]);

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        if (!currentDocument) return;
        setIsDocumentLoading(true);
        const formData = new FormData();
        formData.append("currentDocument", JSON.stringify(currentDocument));
        const response = await updateResumeAction(formData);
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
                            document={getResumeTemplate(
                                currentDocument.information.template,
                                "download",
                                currentDocument
                            )}
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
