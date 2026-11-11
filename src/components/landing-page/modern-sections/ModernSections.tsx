"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ModernSections.module.css";
import ActualTemplatePreview from "../actual-template-preview/ActualTemplatePreview";

type IconName = "spark" | "document" | "letter" | "folder" | "arrow" | "check";

function Icon({ name, className }: { name: IconName; className?: string }) {
    const paths: Record<IconName, ReactNode> = {
        spark: <><path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" /><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z" /></>,
        document: <><path d="M14 3H5v18h14V8l-5-5Z" /><path d="M14 3v5h5M8 12h8M8 16h6" /></>,
        letter: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
        folder: <><path d="M3 7V4h6l3 3h9v13H3V7ZM3 10h18" /></>,
        arrow: <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
        check: <path d="m5 12 4 4L19 6" />,
    };
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const templates = [
    { id: "basic", name: "Basic", label: "Quietly confident", description: "A clean, single-column layout that gives your experience room to speak." },
    { id: "triumph", name: "Triumph", label: "A modern first impression", description: "A distinctive header and clear hierarchy bring a little personality to the page." },
    { id: "nova", name: "Nova", label: "Everything in its place", description: "A considered two-column layout keeps your experience and skills easy to explore." },
] as const;

type TemplateId = (typeof templates)[number]["id"];

export default function ModernSections() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("basic");
    const currentTemplate = templates.find((template) => template.id === selectedTemplate) ?? templates[0];

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-visible", "true");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
        root.setAttribute("data-motion", "true");
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={rootRef} className={styles.root}>
            <div className={styles.capabilityStrip} aria-label="Your job application toolkit">
                <p>One place.<br /><strong>Your next chapter.</strong></p>
                <span><Icon name="spark" /> AI writing assistance</span>
                <span><Icon name="letter" /> Matching cover letters</span>
                <span><Icon name="folder" /> Organized applications</span>
                <span><Icon name="document" /> Ready-to-share PDFs</span>
            </div>

            <section id="features" className={styles.features} aria-labelledby="features-heading">
                <div className={styles.sectionHeading} data-reveal>
                    <p className={styles.eyebrow}><span /> BUILT FOR YOUR NEXT MOVE</p>
                    <h2 id="features-heading">Less busywork.<br /><span>More possibility.</span></h2>
                    <p>You bring the experience. We help you put it into words,<br className={styles.desktopBreak} /> make it look the part, and keep it all together.</p>
                </div>
                <div className={styles.featureGrid}>
                    <article className={`${styles.feature} ${styles.writingFeature}`} data-reveal>
                        <div className={styles.featureText}><span className={styles.featureIcon}><Icon name="spark" /></span><h3>Your experience,<br />beautifully put.</h3><p>Find the right words with AI that works with your experience and the role you want. Refine a summary, sharpen a bullet, and make it yours.</p></div>
                        <div className={styles.writingDemo}>
                            <div className={styles.writingExampleLabel}>AN EXAMPLE OF A CLEARER STORY</div>
                            <div className={styles.writingBody}><span className={styles.miniLabel}>YOUR STARTING POINT</span><p className={styles.originalText}>Worked with the team on a new onboarding flow.</p><div className={styles.enhancedText}><span><Icon name="spark" /> A little more clarity</span><p>Collaborated with product and engineering to design a clear, consistent onboarding experience.</p></div><div className={styles.demoBottom}><span>Illustrative writing example</span><span className={styles.saved}><Icon name="check" /> Your story, refined</span></div></div>
                        </div>
                    </article>
                    <article className={`${styles.feature} ${styles.letterFeature}`} data-reveal>
                        <div className={styles.featureText}><span className={styles.featureIcon}><Icon name="letter" /></span><h3>A cover letter.<br />With your point of view.</h3><p>Connect your experience to the opportunity with a tailored draft and a design that pairs with your resume.</p></div>
                        <div className={styles.letterDemo}><div className={styles.actualLetter}><ActualTemplatePreview type="cover-letter" /></div><span className={styles.pairBadge}>Basic cover letter · sample content</span></div>
                    </article>
                    <article className={`${styles.feature} ${styles.trackingFeature}`} data-reveal>
                        <div className={styles.featureText}><span className={styles.featureIcon}><Icon name="folder" /></span><h3>A little order.<br />A clearer head.</h3><p>Keep job details, resumes, cover letters, and notes together. Pick up where you left off, with everything in its place.</p><span className={styles.sampleNote}>One opportunity. Everything connected.</span></div>
                        <div className={styles.organizationDiagram} aria-label="Conceptual diagram: a job application connects your resume, cover letter, and notes"><p className={styles.conceptLabel}>AN ORGANIZED APPLICATION</p><div className={styles.opportunity}><Icon name="folder" /><span>Your next opportunity</span></div><div className={styles.relatedItems}><span><Icon name="document" /> Resume</span><span><Icon name="letter" /> Cover letter</span><span><Icon name="document" /> Job notes</span></div><p className={styles.conceptFootnote}>A simple illustration of keeping your materials together.</p></div>
                    </article>
                </div>
            </section>

            <section id="how-it-works" className={styles.workflow} aria-labelledby="workflow-heading">
                <div className={styles.workflowHeading} data-reveal><p className={styles.eyebrow}><span /> A CLEAR WAY FORWARD</p><h2 id="workflow-heading">From a blank page<br /> to your next <em>hello.</em></h2><Link href="/sign-up" className={styles.textLink}>Let&apos;s get started <Icon name="arrow" /></Link></div>
                <div className={styles.steps}>
                    <article className={styles.step} data-reveal><span className={styles.stepNumber}>01</span><div><h3>Start with your story.</h3><p>Add your experience, skills, and education. This is the foundation we&apos;ll build on together.</p></div><Icon name="document" /></article>
                    <article className={styles.step} data-reveal><span className={styles.stepNumber}>02</span><div><h3>Make it fit the opportunity.</h3><p>Add the job details, get help with the words, and choose a template that feels like you.</p></div><Icon name="spark" /></article>
                    <article className={styles.step} data-reveal><span className={styles.stepNumber}>03</span><div><h3>Send it with confidence.</h3><p>Review your details, download your PDF, and keep your application organized for what comes next.</p></div><Icon name="arrow" /></article>
                </div>
            </section>

            <section id="templates" className={styles.templates} aria-labelledby="templates-heading">
                <div className={styles.templateIntro} data-reveal><p className={styles.eyebrow}><span /> A GOOD FIRST IMPRESSION</p><h2 id="templates-heading">Your story.<br /> Your style.</h2><p>Considered layouts. Clear typography.<br />A little personality, in all the right places.</p><div className={styles.templateOptions} role="group" aria-label="Choose a resume template preview">{templates.map((template, index) => <button key={template.id} type="button" aria-pressed={selectedTemplate === template.id} aria-controls="resume-template-preview" onClick={() => setSelectedTemplate(template.id)} className={`${styles.templateOption} ${selectedTemplate === template.id ? styles.templateSelected : ""}`}><span className={styles.templateIndex}>0{index + 1}</span><span><strong>{template.name}</strong><small>{template.label}</small></span><span className={styles.templateRadio}>{selectedTemplate === template.id && <Icon name="check" />}</span></button>)}</div><Link href="/sign-up" className={styles.primaryLink}>Find your style <Icon name="arrow" /></Link></div>
                <div className={styles.templateStage} data-reveal><div className={styles.stageTop}><span>THE TEMPLATE EDIT</span><span>Made for your next chapter ↗</span></div><div className={styles.previewFrame} id="resume-template-preview"><div className={styles.shadowPaper} aria-hidden="true" /><div key={selectedTemplate} className={styles.activePaper}><ActualTemplatePreview template={selectedTemplate} /></div><span className={styles.previewTag}><span /> {currentTemplate.name} / Resume</span></div><div className={styles.stageCaption}><p aria-live="polite"><strong>{currentTemplate.name}.</strong> {currentTemplate.description}</p><span>Actual template · sample content</span></div></div>
            </section>
        </div>
    );
}
