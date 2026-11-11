import styles from "./CoverLetters.module.css";
import Link from "next/link";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";

type CoverLetterProps = { currentUser:any; searchParams?: { [key:string]:string|string[]|undefined }; documents:any[]; };
const CoverLetters = ({ documents, searchParams }: CoverLetterProps) => <section className={styles.container}>
    <DashboardCard title="Your cover letters">
        {documents.length > 0 ? <DocumentCardDisplay searchParams={searchParams} documents={documents} type="cover-letter" /> : <div className={styles.empty}><span className={styles.emptyIcon} aria-hidden="true">↗</span><h3>A more personal introduction.</h3><p>Connect your experience to the opportunity with a thoughtful cover letter.</p><Link href="/dashboard?menu=cover-letters&documentPage=1&createCoverLetter=true" className={styles.createButton}>Create your first cover letter <span aria-hidden="true">+</span></Link></div>}
    </DashboardCard>
</section>;
export default CoverLetters;
