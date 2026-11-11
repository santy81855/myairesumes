import styles from "./TitleSection.module.css";
import CardSection from "../card-section/CardSection";
import Link from "next/link";

const sections: Record<string, { title: string; description: string }> = {
    profile: { title: "Your story starts here.", description: "Keep your experience up to date. Put it to work in every application." },
    jobs: { title: "A clearer job search.", description: "Your opportunities, documents, and notes. All together." },
    resumes: { title: "Ready for your next role.", description: "Create, refine, and revisit your resumes in one place." },
    "cover-letters": { title: "Make a thoughtful introduction.", description: "Your cover letters, ready to make a personal first impression." },
    account: { title: "Your account, at a glance.", description: "Manage your plan, billing details, and payment history." },
};

type TitleSectionProps = { currentUser: any; searchParams?: { [key: string]: string | string[] | undefined }; };
const TitleSection = ({ currentUser, searchParams }: TitleSectionProps) => {
    const menu = typeof searchParams?.menu === "string" ? searchParams.menu : "profile";
    const section = sections[menu] || sections.profile;
    const create = menu === "resumes" ? "createResume" : menu === "cover-letters" ? "createCoverLetter" : menu === "jobs" ? "createJob" : null;
    const action = menu === "resumes" ? "Create a resume" : menu === "cover-letters" ? "Create a cover letter" : "Add an application";
    return <>
        <header className={styles.titleSection}>
            <div className={styles.column}><p className={styles.eyebrow}>YOUR CAREER WORKSPACE <span aria-hidden="true">/</span> {currentUser.firstName}</p><h1 className={styles.pageHeading}>{section.title}</h1><p className={styles.subHeading}>{section.description}</p></div>
            <div className={styles.actions}>{create ? <Link href={`/dashboard?menu=${menu}&documentPage=1&${create}=true`} className={styles.createButton}>{action}<span aria-hidden="true">+</span></Link> : null}{!searchParams?.tutorial && menu !== "resumes" && menu !== "cover-letters" && <Link href={`/dashboard?menu=${menu}&tutorial=true`} className={styles.tutorialButton}>Take a quick tour <span aria-hidden="true">↗</span></Link>}</div>
        </header>
        <div className={styles.cardContainer}><CardSection currentUser={currentUser} /></div>
    </>;
};
export default TitleSection;
