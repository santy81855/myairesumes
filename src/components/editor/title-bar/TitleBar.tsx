"use client";
import styles from "./TitleBar.module.css";
import { downloadIcon } from "@/components/icons/iconSVG";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Basic from "@/components/resume-templates/basic/Basic";
import BasicDownload from "@/components/resume-templates/basic/BasicDownload";

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
