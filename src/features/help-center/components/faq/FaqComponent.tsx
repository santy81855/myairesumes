"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FaqComponent.module.css";

const generalQuestions = {
        title: "General Questions",
        rows: [
            {
                title: "What is My Resume Hero?",
                content:
                    "My Resume Hero is an application that helps you create, store, and manage your job applications in one place. It also assists you in generating personalized resumes and cover letters for each job application, greatly increasing your chances of getting hired.",
            },
            {
                title: "Do I have to re-write my work experience and education every time I make a new resume?",
                content:
                    "To reduce having to re-write your work experience and education every time you make a new resume, you can save your work experience and education in the Profile section by going to Dashboard->Profile. This will allow you to easily add your work experience and education only once. You can do the same for your contact information.",
            },
            {
                title: "Can I edit my job applications after I create them?",
                content:
                    "Yes, you can edit your job applications at any time by going to Dashboard->Applications. You can then edit any of the job details and the resume and/or cover letter associated with the job application. You can also delete them if you no longer need them.",
            },
            {
                title: "Can I add the job post information to my job applications?",
                content:
                    "Yes, you can add the job listing information to your job applications. This will help you keep track of the job listings you have applied to and the status of each application. It will also allow the Artificial Intelligence helper to generate better personalized resumes and cover letters for each job application.",
            },
            {
                title: "How can I keep my applications organized?",
                content:
                    "You can keep your applications organized by using the Dashboard->Applications page. You can choose to color code the applications based on your organization system, and you can search for specific applications using the search bar.",
            },
            {
                title: "How do I download my resume from a job application?",
                content:
                    "You can download your resume from a job application by going to Dashboard->Applications->Manage on the specific application. You can then open the resume and download it as a PDF. You can also download the cover letter associated with the job application.",
            },
        ],
    };

const accountQuestions = {
        title: "Account Questions",
        rows: [
            {
                title: "How can I cancel my membership?",
                content:
                    "You can cancel your membership at any time by going to Dashboard->Account->Manage. You can then choose to cancel your membership, and you will no longer be billed for the next billing cycle. You can still use the application until the end of the current billing cycle.",
            },
            {
                title: "How can I upgrade my account if I accidentally cancelled my membership?",
                content:
                    "If you cancel your membership, you can re-upgrade at any time by going to Dashboard->Account->Renew Subscription. This will reinitiate your membership, and you will not be billed until the next billing cycle.",
            },
            {
                title: "How can I update my payment details?",
                content:
                    "If you need to update your payment details, you can do so by going to Dashboard->Account->Update. You can then update your payment information, and the changes will take effect immediately. You will receive a confirmation email once the changes have been made.",
            },
        ],
    };


const groups = [
    { id: "general", label: "Using My Resume Hero", ...generalQuestions },
    { id: "account", label: "Account & billing", ...accountQuestions },
];

export default function FaqComponent() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const normalizedQuery = query.trim().toLowerCase();
    const visibleGroups = groups
        .filter((group) => category === "all" || category === group.id)
        .map((group) => ({ ...group, rows: group.rows.filter((row) => `${row.title} ${row.content}`.toLowerCase().includes(normalizedQuery)) }));
    const count = visibleGroups.reduce((total, group) => total + group.rows.length, 0);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <p className={styles.eyebrow}>THE ANSWER DESK</p>
                <h2>Find your<br />way forward.</h2>
                <p>From your first resume to your account settings, start here.</p>
                <div className={styles.categories} role="group" aria-label="Filter questions by topic">
                    <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All questions <span>09</span></button>
                    {groups.map((group) => <button key={group.id} type="button" aria-pressed={category === group.id} onClick={() => setCategory(group.id)}>{group.label}<span>{String(group.rows.length).padStart(2, "0")}</span></button>)}
                </div>
                <Link href="/help-center?option=tutorials" className={styles.tutorialLink}>Prefer to watch? <span aria-hidden="true">↗</span><small>Explore the video walkthrough</small></Link>
            </aside>
            <section className={styles.questions} aria-label="Frequently asked questions">
                <label className={styles.searchLabel} htmlFor="help-search">Search the help center</label>
                <div className={styles.searchBox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input id="help-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “download” or “membership”" /></div>
                <p className={styles.results} role="status">{normalizedQuery ? `${count} ${count === 1 ? "answer" : "answers"} for “${query.trim()}”` : "A few helpful answers, all in one place."}</p>
                {visibleGroups.map((group) => group.rows.length > 0 && <section className={styles.group} key={group.id} id={`${group.id}-faq`} aria-labelledby={`${group.id}-heading`}><div className={styles.groupHeading}><h3 id={`${group.id}-heading`}>{group.label}</h3><span>{String(group.rows.length).padStart(2, "0")}</span></div>{group.rows.map((row) => <details key={row.title} className={styles.question}><summary>{row.title}<span aria-hidden="true" className={styles.plus} /></summary><div className={styles.answer}><p>{row.content}</p></div></details>)}</section>)}
                {count === 0 && <div className={styles.empty}><h3>Let&apos;s try another word.</h3><p>Search for a broader topic, like “resume,” “account,” or “payment.”</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all questions <span aria-hidden="true">↗</span></button></div>}
            </section>
        </div>
    );
}
