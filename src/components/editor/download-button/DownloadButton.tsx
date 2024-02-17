"use client";
import styles from "./DownloadButton.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BasicDownload from "@/components/resume-templates/basic/BasicDownload";

const DownloadButton = () => {
    return (
        <button className={styles.downloadButton}>
            <PDFDownloadLink
                document={<BasicDownload />}
                fileName="somename.pdf"
            >
                {({ loading }) =>
                    loading ? "Loading document..." : "Download now!"
                }
            </PDFDownloadLink>
        </button>
    );
};

export default DownloadButton;
