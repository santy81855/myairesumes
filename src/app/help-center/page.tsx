import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import { Footer } from "@/features/footer";
import { FaqComponent, Tutorials } from "@/features/help-center";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Help Center · My Resume Hero",
    description: "Find answers about resumes, applications, your account, and billing, or explore our video walkthrough.",
};

export default function HelpCenter({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const option = searchParams?.option === "tutorials" ? "tutorials" : "faqs";

    return (
        <main className={styles.main} id="help-center">
            <Navbar />
            <header className={styles.hero}>
                <div className={styles.heroCopy}>
                    <p className={styles.eyebrow}><span /> THE HELP CENTER</p>
                    <h1>A little guidance.<br /><span>A clearer next step.</span></h1>
                    <p>Good questions deserve clear answers. Find your footing,<br className={styles.desktopBreak} /> learn the tools, and get back to your next chapter.</p>
                </div>
                <div className={styles.guideNote}>
                    <span className={styles.guideSymbol} aria-hidden="true">✳</span>
                    <p>A place to<br />figure things out.</p>
                    <span className={styles.guideCaption}>YOUR NEXT MOVE, MADE CLEARER</span>
                </div>
            </header>
            <nav className={styles.resourceNav} aria-label="Help center resources">
                <Link href="/help-center?option=faqs" aria-current={option === "faqs" ? "page" : undefined}><span className={styles.resourceNumber}>01</span><span>Questions & answers<small>The details, explained.</small></span><span className={styles.resourceArrow} aria-hidden="true">↗</span></Link>
                <Link href="/help-center?option=tutorials" aria-current={option === "tutorials" ? "page" : undefined}><span className={styles.resourceNumber}>02</span><span>Video walkthrough<small>A little show and tell.</small></span><span className={styles.resourceArrow} aria-hidden="true">↗</span></Link>
            </nav>
            <div className={styles.content}>{option === "tutorials" ? <Tutorials /> : <FaqComponent />}</div>
            <div className={styles.backNote}><span aria-hidden="true">↖</span><p>Ready for your next chapter?</p><Link href="/sign-up">Put your story on the page <span aria-hidden="true">↗</span></Link></div>
            <Footer />
        </main>
    );
}
