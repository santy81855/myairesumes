import styles from "./DocumentCard.module.css";
import { formatDateMonthDayYear } from "@/lib/date";

type DocumentCardProps = {
    doc: any;
    type: string;
    templates: any;
};

const DocumentCard = ({ templates, doc, type }: DocumentCardProps) => {
    return (
        <section className={styles.resumeCard} key={doc.id}>
            <div className={styles.resumeContainer}>
                <div className={styles.resume}>
                    {
                        templates[
                            doc.information.template as keyof typeof templates
                        ]?.previewComponent
                    }
                </div>
            </div>
            <div className={styles.resumeInfoContainer}>
                <div className={styles.resumeInfo}>
                    <div className={styles.textItem}>
                        <p className={styles.label}>Name</p>
                        <p className={styles.title}>
                            {doc.information.documentName}
                        </p>
                    </div>

                    <div className={styles.textItem}>
                        <p className={styles.label}>Description</p>
                        <p className={styles.description}>
                            {doc.information.description}
                        </p>
                    </div>
                    <div className={styles.textItem}>
                        <p className={styles.label}>Last updated</p>
                        <p className={styles.date}>
                            {formatDateMonthDayYear(doc.updatedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DocumentCard;
