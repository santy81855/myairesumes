import styles from "./page.module.css";
import Link from "next/link";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";
import UpgradeModal from "@/components/modals/payment/upgrade-plan-modal/UpgradeModal";
import SpecialModal from "@/components/modals/payment/upgrade-special/SpecialModal";
import { validateRequest } from "@/features/authentication/lib/auth";
import { getUser } from "@/lib/user";
import { Footer } from "@/features/footer";

const planQuestions = [
    { question: "What can I do with the Free plan?", answer: "Create one job application, one resume, and one cover letter. The Free plan includes basic templates and the artificial intelligence helper, so you can explore the tools before choosing a paid plan." },
    { question: "What is the difference between Pro and Special?", answer: "Both paid plans include unlimited jobs, resumes, and cover letters, access to all templates, and the artificial intelligence helper. Pro is $4.99 per month. The Special plan is $19.99 for six months." },
    { question: "Can I cancel my membership?", answer: "Yes. Go to Dashboard → Account → Manage to cancel your membership. You will no longer be billed for the next billing cycle, and you can continue using the application until the end of the current billing cycle." },
    { question: "Where do I manage my payment details?", answer: "Go to Dashboard → Account → Update to change your payment information. You can manage your current subscription from the Account page in your dashboard." },
];

const comparisonRows = [
    { feature: "Job applications", free: "1", special: "Unlimited", pro: "Unlimited" },
    { feature: "Resumes", free: "1", special: "Unlimited", pro: "Unlimited" },
    { feature: "Cover letters", free: "1", special: "Unlimited", pro: "Unlimited" },
    { feature: "Resume templates", free: "Basic templates", special: "All templates", pro: "All templates" },
    { feature: "AI writing assistance", free: "Included", special: "Included", pro: "Included" },
];

export default async function Pricing({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const { user } = await validateRequest();
    const currentUser = user && (await getUser(user.id));
    const status = currentUser && currentUser.status;
    const pro = searchParams?.pro || false;
    const special = searchParams?.special || false;

    return (
        <main id="pricingPage" className={styles.main}>
            <header className={styles.hero}>
                <p className={styles.eyebrow}><span /> ROOM FOR YOUR AMBITION</p>
                <h1>A plan for<br /><span>your next chapter.</span></h1>
                <p>Start with the essentials. Make room for more when you need it.<br className={styles.desktopBreak} /> Thoughtful tools for wherever your job search takes you.</p>
                <div className={styles.heroNote}><span aria-hidden="true">✳</span> A little structure for your big next step.</div>
            </header>
            <section className={styles.plans} aria-labelledby="plan-heading">
                <div className={styles.planHeading}><h2 id="plan-heading">Choose your pace.</h2><p>One application or a fresh start. Find your fit.</p></div>
                <PriceOptions searchParams={searchParams} />
                <p className={styles.billingNote}>Pro is billed monthly. Special covers a six-month subscription period.</p>
                {status && <p className={styles.infoMessage}>To manage your current subscription, visit your <Link href="/dashboard?menu=account">Account page in the dashboard <span aria-hidden="true">↗</span></Link>.</p>}
            </section>
            <section className={styles.included} aria-label="Tools for your next career move">
                <div className={styles.includedIntro}><span aria-hidden="true">↗</span><p>The same ambition.<br /><strong>A little more support.</strong></p></div>
                <div><span className={styles.number}>01</span><h3>Words with direction.</h3><p>Get AI assistance with your resume and cover letter, using your experience and the role you want.</p></div>
                <div><span className={styles.number}>02</span><h3>A considered presentation.</h3><p>Choose a resume template, shape your details, and download your documents as PDFs.</p></div>
                <div><span className={styles.number}>03</span><h3>Everything together.</h3><p>Keep job details, application documents, and notes in one organized workspace.</p></div>
            </section>
            <section className={styles.comparison} aria-labelledby="comparison-heading">
                <div className={styles.sectionHeading}><p className={styles.eyebrow}><span /> THE DETAILS, SIDE BY SIDE</p><h2 id="comparison-heading">A clear look at<br /><em>what&apos;s included.</em></h2></div>
                <p className={styles.swipeHint}>Swipe to compare plans <span aria-hidden="true">→</span></p>
                <div className={styles.tableScroll} role="region" aria-label="Compare plan features; scroll horizontally on small screens" tabIndex={0}><table><caption className={styles.srOnly}>Features included in Free, Special, and Pro plans</caption><thead><tr><th scope="col">Your toolkit</th><th scope="col">Free<small>A place to begin</small></th><th scope="col">Special<small>Six months of possibility</small></th><th scope="col">Pro<small>Month by month</small></th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.feature}><th scope="row">{row.feature}</th><td>{row.free}</td><td>{row.special}</td><td>{row.pro}</td></tr>)}</tbody></table></div>
            </section>
            <section className={styles.faqSection} aria-labelledby="pricing-faq-heading">
                <div className={styles.faqIntro}><p className={styles.eyebrow}><span /> A LITTLE MORE CLARITY</p><h2 id="pricing-faq-heading">Good questions.<br /><span>Clear answers.</span></h2><p>Get to know the plans before you take your next step.</p><Link href="/help-center?option=faqs">Visit the help center <span aria-hidden="true">↗</span></Link></div>
                <div className={styles.questions}>{planQuestions.map((item) => <details key={item.question}><summary>{item.question}<span className={styles.plus} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
            </section>
            <div className={styles.closing}><span aria-hidden="true">✳</span><p>Your experience deserves<br /><em>a good introduction.</em></p><Link href="/sign-up">Start your next chapter <span aria-hidden="true">↗</span></Link></div>
            <Footer />
            {pro && <UpgradeModal returnUrl="/pricing" />}
            {special && <SpecialModal returnUrl="/pricing" />}
        </main>
    );
}
