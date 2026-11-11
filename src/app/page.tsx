import Link from "next/link";
import ModernHero from "@/components/landing-page/modern-hero/ModernHero";
import ModernSections from "@/components/landing-page/modern-sections/ModernSections";
import styles from "./page.module.css";
import Navbar from "@/components/nav/Navbar";
import { validateRequest } from "@/features/authentication/lib/auth";
import { getUser } from "@/lib/user";
import BasicInfoModal from "@/components/landing-page/basic-info-modal/BasicInfoModal";
import { redirect } from "next/navigation";
import { Footer } from "@/features/footer";
import FaqComponentLandingPage from "@/components/landing-page/faq-section/FaqComponent";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";
import CookiesModal from "@/components/modals/cookies/CookiesModal";
import { ContactUs } from "@/features/contact-us";

export default async function Home() {
    const { user } = await validateRequest();
    if (user && user.emailVerified === false) {
        return redirect("/email-verification");
    }
    const currentUser = user ? await getUser(user.id) : null;
    const showModal =
        currentUser && Object.keys(currentUser.basicInfo).length === 0
            ? true
            : false;

    return (
        <main id="landingPage" className={styles.main}
            style={showModal ? { overflowY: "hidden" } : undefined}>
            <a className={styles.skipLink} href="#main-content">Skip to content</a>
            <Navbar style={{ backgroundColor: "#faf9f6", color: "#202520" }} />
            <div id="main-content" tabIndex={-1} className={styles.content}>
                <ModernHero />
                <ModernSections />
                <section id="pricing" className={styles.priceSection} aria-labelledby="pricing-heading">
                    <div className={styles.priceHeading}>
                        <p className={styles.sectionEyebrow}>A SMALL INVESTMENT. A NEW POSSIBILITY.</p>
                        <h2 id="pricing-heading">Big ambitions.<br />Simple pricing.</h2>
                        <p>Start with the essentials, on us. Make room for every opportunity when you need more.</p>
                    </div>
                    <PriceOptions />
                    <p className={styles.pricingNote}>All plans include AI writing assistance. You stay in control of every word.</p>
                </section>
                <section id="faq" className={styles.faqSection}>
                    <FaqComponentLandingPage />
                </section>
                <section className={styles.finalCta} aria-labelledby="cta-heading">
                    <div className={styles.ctaOrbit} aria-hidden="true" />
                    <p className={styles.sectionEyebrow}>YOUR EXPERIENCE. YOUR POTENTIAL.</p>
                    <h2 id="cta-heading">Your next chapter<br />deserves a <em>strong start.</em></h2>
                    <p>Bring your story. We’ll help you put it on paper.</p>
                    <Link href="/sign-up" className={styles.ctaButton}>Create my free resume <span aria-hidden="true">↗</span></Link>
                    <span className={styles.ctaNote}>Free to start · No credit card required</span>
                </section>
            </div>
            <Footer style={{ backgroundColor: "#faf9f6", color: "#202520" }} />
            <ContactUs user={user} />
            <CookiesModal />
            {showModal && <BasicInfoModal currentUser={currentUser} />}
        </main>
    );
}
