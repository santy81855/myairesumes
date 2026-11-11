import Link from "next/link";
import styles from "./FaqComponent.module.css";

const questions = [
    ["Can I get started for free?", "Yes. The free plan includes one job, one resume, one cover letter, basic templates, and the AI writing helper. You can upgrade when you need more space for your job search."],
    ["How does the AI writing helper work?", "Use your experience and the details of a job listing to get help writing your resume and cover letter. Review and edit the suggestions so your documents accurately reflect your skills and sound like you."],
    ["Can I customize my resume?", "Yes. Choose a template, edit your content, and customize your document in the editor. Keep separate versions for different opportunities so each application feels relevant."],
    ["Can I download my documents as a PDF?", "Yes. Open your resume or cover letter in the editor to download it as a PDF, ready to share with your application."],
    ["How do I keep my applications organized?", "Save job listing details alongside your resumes and cover letters in your dashboard. Search your applications and use color coding to keep your job search organized."],
];
export default function FaqComponentLandingPage({ compact = false }: { compact?: boolean }) {
    return <div className={`${styles.container} ${compact ? styles.compact : ""}`}>
        <div className={styles.heading}>
            <p>GOOD QUESTIONS. CLEAR ANSWERS.</p>
            <h2>A little clarity<br />before you begin.</h2>
            <span>Still curious about something?</span>
            <Link href="/help-center?option=faqs">Visit the help center <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.questions}>
            {questions.map(([question, answer]) => <details key={question} className={styles.question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
            </details>)}
        </div>
    </div>;
}
