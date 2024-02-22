"use client";
import styles from "./TitleBar.module.css";
import { downloadIcon } from "@/components/icons/iconSVG";
import BasicDownload from "@/components/resume-templates/basic/BasicDownload";
// import PDFDownloadLink dynamically to avoid SSR
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <></>,
    }
);
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAppContext } from "@/app/providers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const TitleBar = () => {
    const { documentArray } = useAppContext();
    if (!documentArray) return null;
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.id)
        );
    }, [documentArray]);
    return (
        <section className={styles.container}>
            {document && (
                <>
                    <p className={styles.title}>
                        {document.information.documentName}
                    </p>
                    <div className={styles.iconContainer}>
                        <PDFDownloadLink
                            document={<BasicDownload document={document} />}
                            fileName={`${document.information.documentName}.pdf`}
                        >
                            {downloadIcon}
                        </PDFDownloadLink>
                    </div>
                </>
            )}
        </section>
    );
};

export default TitleBar;
