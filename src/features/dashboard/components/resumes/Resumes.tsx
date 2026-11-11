import styles from "./Resumes.module.css";
import Link from "next/link";
import { DashboardCard, DocumentCardDisplay } from "@/features/dashboard";

type ResumesProps = { currentUser:any; searchParams?: { [key:string]:string|string[]|undefined }; documents:any[]; };
const Resumes = ({ documents, searchParams }: ResumesProps) => <section className={styles.container}>
    <DashboardCard title="Your resumes">
        {documents.length > 0 ? <DocumentCardDisplay searchParams={searchParams} documents={documents} type="resume" /> : <div className={styles.empty}><span className={styles.emptyIcon} aria-hidden="true">↗</span><h3>A blank page. A fresh start.</h3><p>Turn your experience into a resume you can make your own.</p><Link href="/dashboard?menu=resumes&documentPage=1&createResume=true" className={styles.createButton}>Create your first resume <span aria-hidden="true">+</span></Link></div>}
    </DashboardCard>
</section>;
export default Resumes;
