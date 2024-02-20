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

const TitleBar = () => {
    return (
        <section className={styles.container}>
            <p className={styles.title}>Resume Title</p>
            <div className={styles.iconContainer}>
                <PDFDownloadLink
                    document={<BasicDownload />}
                    fileName="somename.pdf"
                >
                    {downloadIcon}
                </PDFDownloadLink>
            </div>
        </section>
    );
};

export default TitleBar;
