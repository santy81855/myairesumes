"use client";
import styles from "./TitleBar.module.css";
import { downloadIcon, saveIcon } from "@/components/icons/iconSVG";
import BasicDownload from "@/components/resume-templates/basic/BasicDownload";
import Spinner from "@/components/loaders/Spinner/Spinner";
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
import { updateResume } from "@/actions/resume";

const TitleBar = () => {
    const { documentArray, isDocumentLoading, setIsDocumentLoading } =
        useAppContext();
    if (!documentArray) return null;
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.id)
        );
    }, [documentArray]);

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        if (!document) return;
        setIsDocumentLoading(true);
        const formData = new FormData();
        formData.append("document", JSON.stringify(document));
        const response = await updateResume(formData);
        if (response.error) {
            setIsDocumentLoading(false);
            console.log("errer");
        } else {
            console.log("success");
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
                        <div className={styles.iconContainer} title="download">
                            <PDFDownloadLink
                                document={<BasicDownload document={document} />}
                                fileName={`${document.information.documentName}.pdf`}
                            >
                                {downloadIcon}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default TitleBar;
