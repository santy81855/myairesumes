"use client";

import { useState } from "react";
import styles from "./PageFlow.module.css";

const steps = [
    {
        id: "track",
        number: "01",
        label: "Track",
        title: "Keep every opportunity in sight",
        description:
            "Save each role and manage its resume, cover letter, and status from one dashboard.",
    },
    {
        id: "tailor",
        number: "02",
        label: "Tailor",
        title: "Make every application feel personal",
        description:
            "Open an application and tailor the documents connected to that specific role.",
    },
    {
        id: "apply",
        number: "03",
        label: "Apply",
        title: "Send your strongest application",
        description:
            "Keep everything together, mark your progress, and know exactly what comes next.",
    },
] as const;

type StepId = (typeof steps)[number]["id"];

const MiniDocument = ({ kind = "resume" }: { kind?: "resume" | "letter" }) => (
    <div className={`${styles.miniDocument} ${kind === "letter" ? styles.letter : ""}`}>
        <div className={styles.documentName}>Alex Morgan</div>
        <div className={styles.documentRule} />
        <div className={styles.documentLine} />
        <div className={styles.documentLine} />
        <div className={`${styles.documentLine} ${styles.short}`} />
        <div className={styles.documentSubheading} />
        <div className={styles.documentLine} />
        <div className={`${styles.documentLine} ${styles.short}`} />
    </div>
);

const ApplicationCard = ({
    company,
    role,
    color,
    highlighted = false,
}: {
    company: string;
    role: string;
    color: string;
    highlighted?: boolean;
}) => (
    <div className={`${styles.applicationCard} ${highlighted ? styles.highlightedCard : ""}`}>
        <div className={styles.paperPreview}>
            <MiniDocument />
            <MiniDocument kind="letter" />
        </div>
        <div className={styles.colorBar} style={{ backgroundColor: color }} />
        <div className={styles.applicationInfo}>
            <span>Company Name</span>
            <strong>{company}</strong>
            <span>Position</span>
            <strong>{role}</strong>
        </div>
        <div className={styles.cardAction}>
            <span>Manage</span>
            <small>just now</small>
        </div>
    </div>
);

const Sidebar = ({ activeStep }: { activeStep: StepId }) => (
    <aside className={styles.dashboardSidebar}>
        <strong className={styles.brand}>My Resume Hero</strong>
        <div className={styles.sidebarMenu}>
            <span><i>●</i><b>Profile</b></span>
            <span><i>●</i><b>Account</b></span>
            <span className={styles.activeMenu}><i>▣</i><b>Applications</b></span>
            <span className={activeStep === "tailor" ? styles.secondaryActive : ""}><i>▤</i><b>Resumes</b></span>
            <span><i>▧</i><b>Cover Letters</b></span>
        </div>
    </aside>
);

const DashboardHeading = () => (
    <div className={styles.dashboardHeading}>
        <div>
            <strong>Dashboard</strong>
            <span>Alex Morgan</span>
        </div>
        <span className={styles.tutorial}>Tutorial</span>
    </div>
);

const SummaryCards = () => (
    <div className={styles.summaryCards}>
        <div><span>Jobs</span><strong>3</strong></div>
        <div><span>Resumes</span><strong>4</strong></div>
        <div><span>Cover Letters</span><strong>2</strong></div>
    </div>
);

const TrackView = () => (
    <>
        <DashboardHeading />
        <SummaryCards />
        <section className={styles.dashboardSection}>
            <div className={styles.sectionTitle}>Your Applications</div>
            <div className={styles.sectionBody}>
                <div className={styles.createButton}><b>＋</b> Create New Application</div>
                <div className={styles.applicationGrid}>
                    <ApplicationCard company="Northstar" role="Product Designer" color="#e2a36f" />
                    <ApplicationCard company="Juniper Labs" role="UX Designer" color="#8c75d6" highlighted />
                    <ApplicationCard company="Brightworks" role="Visual Designer" color="#66a897" />
                </div>
            </div>
        </section>
    </>
);

const ManageView = ({ ready = false }: { ready?: boolean }) => (
    <>
        <DashboardHeading />
        <section className={styles.dashboardSection}>
            <div className={styles.sectionTitle}>Manage Application</div>
            <div className={styles.manageBody}>
                <span className={styles.backButton}>‹ Back to applications</span>
                <div className={styles.jobDetails}>
                    <div><span>Company Name</span><strong>Juniper Labs</strong></div>
                    <div><span>Position</span><strong>UX Designer</strong></div>
                    <i style={{ backgroundColor: ready ? "#66a897" : "#8c75d6" }} />
                </div>
                <div className={styles.manageLabel}>
                    <strong>{ready ? "Application documents" : "Tailor your documents"}</strong>
                    <span>{ready ? "Everything is ready to send" : "Open a document to make it fit this role"}</span>
                </div>
                <div className={styles.connectedDocuments}>
                    <div className={styles.connectedCard}>
                        <MiniDocument />
                        <div><span>Resume</span><strong>Juniper UX Resume</strong></div>
                        <b className={ready ? styles.ready : ""}>{ready ? "Ready" : "Edit"}</b>
                    </div>
                    <div className={styles.connectedCard}>
                        <MiniDocument kind="letter" />
                        <div><span>Cover Letter</span><strong>Juniper Cover Letter</strong></div>
                        <b className={ready ? styles.ready : ""}>{ready ? "Ready" : "Edit"}</b>
                    </div>
                </div>
                {ready && (
                    <div className={styles.statusRow}>
                        <div><span className={styles.check}>✓</span><span><strong>Application ready</strong><small>Resume and cover letter completed</small></span></div>
                    </div>
                )}
            </div>
        </section>
    </>
);

const PageFlow = () => {
    const [activeStep, setActiveStep] = useState<StepId>("track");
    const activeStepIndex = steps.findIndex((step) => step.id === activeStep);
    const activeContent = steps[activeStepIndex];

    return (
        <section className={styles.story} aria-labelledby="product-story-title">
            <div className={styles.intro}>
                <p className={styles.eyebrow}>One workspace. Every application.</p>
                <h2 id="product-story-title">From saved job to sent application</h2>
                <p>See how My Resume Hero keeps the moving pieces of your job search moving together.</p>
            </div>

            <div className={styles.stepPicker} role="tablist" aria-label="Application workflow">
                {steps.map((step) => (
                    <button
                        key={step.id}
                        id={`product-story-tab-${step.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activeStep === step.id}
                        aria-controls="product-story-panel"
                        className={`${styles.stepButton} ${activeStep === step.id ? styles.activeStep : ""}`}
                        onClick={() => setActiveStep(step.id)}
                    >
                        <span className={styles.stepNumber}>{step.number}</span>
                        <span>{step.label}</span>
                    </button>
                ))}
            </div>

            <div
                id="product-story-panel"
                role="tabpanel"
                aria-labelledby={`product-story-tab-${activeStep}`}
                className={styles.stage}
                aria-live="polite"
            >
                <div className={styles.stageCopy}>
                    <span className={styles.mobileStep}>{activeContent.number} / 03</span>
                    <h3>{activeContent.title}</h3>
                    <p>{activeContent.description}</p>
                    <div className={styles.progress} aria-hidden="true">
                        <span style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }} />
                    </div>
                </div>

                <div className={styles.dashboardFrame}>
                    <Sidebar activeStep={activeStep} />
                    <div className={styles.dashboardMain}>
                        <div className={styles.backgroundName}>ALEX<br />MORGAN</div>
                        {activeStep === "track" && <TrackView />}
                        {activeStep === "tailor" && <ManageView />}
                        {activeStep === "apply" && <ManageView ready />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageFlow;
