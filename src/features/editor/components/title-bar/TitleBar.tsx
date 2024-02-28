"use client";
import styles from "./TitleBar.module.css";
import { downloadIcon, saveIcon } from "@/components/icons/iconSVG";
import BasicDownload from "@/components/resume-templates/basic/BasicDownload";
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
import { updateResumeAction } from "@/features/editor";
import Basic from "@/components/resume-templates/basic/Basic";
import { savePDF } from "@progress/kendo-react-pdf";

const TitleBar = () => {
    const { documentArray, isDocumentLoading, setIsDocumentLoading } =
        useAppContext();
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.slug[1])
        );
    }, [documentArray]);

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        if (!document) return;
        setIsDocumentLoading(true);
        const formData = new FormData();
        formData.append("document", JSON.stringify(document));
        const response = await updateResumeAction(formData);
        if (response.error) {
            toast.error("Error saving document.");
            setIsDocumentLoading(false);
        } else {
            toast.success("Document saved successfully.");
            setIsDocumentLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            {document && (
                <>
                    <p className={styles.title} title="title">
                        {document.information.documentName}
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
                            document={
                                <Basic document={document} isDownload={true} />
                            }
                            fileName={`${document.information.documentName}.pdf`}
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
