"use client";

import { useState } from "react";
import Link from "next/link";
import ActualTemplatePreview from "@/components/landing-page/actual-template-preview/ActualTemplatePreview";
import styles from "./ModernHero.module.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Sparkle({ className }: { className?: string }) {
    return (
        <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m12 3 2.35 6.65L21 12l-6.65 2.35L12 21l-2.35-6.65L3 12l6.65-2.35L12 3Z" fill="currentColor" />
            <path d="m20 1 .8 2.2L23 4l-2.2.8L20 7l-.8-2.2L17 4l2.2-.8L20 1Z" fill="currentColor" />
        </svg>
    );
}

const originalBullet = "Worked with the design and engineering teams to improve the onboarding experience.";
const improvedBullet = "Partnered with design and engineering to simplify onboarding, turning customer insights into a clearer first-use experience.";

export default function ModernHero() {
    const [isImproved, setIsImproved] = useState(false);

    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <div className={styles.copy}>
                <p className={styles.eyebrow}><span /> Your next chapter starts here</p>
                <h1 id="hero-heading" className={styles.title}>
                    Your next role<br />starts with a<br /><em>better résumé.</em>
                </h1>
                <p className={styles.description}>
                    You bring the experience. We help you tell the story.
                    Create thoughtful résumés and cover letters with AI,
                    and keep your job search moving in one place.
                </p>
                <div className={styles.actions}>
                    <Link className={styles.primaryAction} href="/sign-up">
                        Build my résumé <Arrow />
                    </Link>
                    <a className={styles.secondaryAction} href="#how-it-works">
                        See how it works <span className={styles.playIcon} aria-hidden="true">↗</span>
                    </a>
                </div>
                <div className={styles.benefits} aria-label="Included tools">
                    <span><span className={styles.check} aria-hidden="true">✓</span> AI writing support</span>
                    <span><span className={styles.check} aria-hidden="true">✓</span> Your search, organized</span>
                </div>
                <div className={styles.heroFootnote}>
                    <span className={styles.footnoteLine} />
                    A little clarity. A lot more possibility.
                </div>
            </div>

            <div className={styles.visual} aria-label="Actual résumé template and illustrative writing example">
                <div className={styles.orbit} aria-hidden="true" />
                <div className={styles.sageShape} aria-hidden="true" />
                <div className={styles.annotation} aria-hidden="true">
                    <span>Your experience, beautifully told.</span>
                    <svg width="78" height="48" viewBox="0 0 78 48" fill="none"><path d="M3 4c29-7 44 3 48 34m-9-6 10 9 7-11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>

                <div className={styles.templateBackdrop} aria-hidden="true" />
                <figure className={styles.templatePreview}>
                    <ActualTemplatePreview template="triumph" />
                    <figcaption className={styles.templateCaption}><span>Triumph <span>résumé template</span></span><span>Actual product template</span></figcaption>
                </figure>

                <div className={styles.aiCard}>
                    <div className={styles.aiCardHeading}><span className={styles.aiIcon}><Sparkle /></span><div>Your story, a little stronger<small>EXAMPLE REWRITE</small></div></div>
                    <p>Same experience. Clearer wording. See the difference a thoughtful rewrite can make.</p>
                    <div className={`${styles.suggestion} ${isImproved ? styles.improvedSuggestion : ""}`} aria-live="polite" aria-atomic="true"><span className={styles.exampleState}>{isImproved ? "After" : "Before"}</span><span>{isImproved ? improvedBullet : originalBullet}</span></div>
                    <button className={styles.tryButton} type="button" onClick={() => setIsImproved(!isImproved)} aria-pressed={isImproved}>
                        <span>{isImproved ? "See original example" : "See example rewrite"}</span>{isImproved ? <span aria-hidden="true">↶</span> : <Arrow />}
                    </button>
                    <span className={styles.previewNote}>Illustrative writing example</span>
                </div>
                <span className={styles.decorativeCross} aria-hidden="true">✳</span>
            </div>
        </section>
    );
}
