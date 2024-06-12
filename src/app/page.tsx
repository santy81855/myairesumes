import styles from "./page.module.css";
import Title from "@/components/landing-page/title/Title";
import Navbar from "@/components/nav/Navbar";
import { validateRequest } from "@/features/authentication/lib/auth";
import { getUser } from "@/lib/user";
import BasicInfoModal from "@/components/landing-page/basic-info-modal/BasicInfoModal";
import { redirect } from "next/navigation";
import Features from "@/components/landing-page/features/Features";
import Testimonials from "@/components/landing-page/testimonials/Testimonials";
import { Footer } from "@/features/footer";
import FaqComponentLandingPage from "@/components/landing-page/faq-section/FaqComponent";
import PriceOptions from "@/components/pricing/price-options/PriceOptions";
import CookiesModal from "@/components/modals/cookies/CookiesModal";
import PageFlow from "@/components/landing-page/page-flow/PageFlow";
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
        <main
            id="landingPage"
            className={styles.main}
            style={showModal ? { overflowY: "hidden" } : { overflowY: "auto" }}
        >
            <section className={styles.heroSection}>
                <Navbar
                    style={{ backgroundColor: "transparent", color: "white" }}
                />
                <section className={styles.heroSectionText}>
                    <Title />
                    <div className={styles.circle1}></div>
                    <div className={styles.circle2}></div>
                    <div className={styles.circle3}></div>
                </section>
                <section className={styles.landingImage}>
                    <PageFlow />
                </section>
            </section>
            <section className={styles.featuresSection}>
                <Features />
            </section>
            <section className={styles.priceSection}>
                <p className={styles.priceTitle}>Affordable Pricing</p>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
                <PriceOptions />
            </section>
            <section className={styles.faqSection}>
                <FaqComponentLandingPage />
            </section>
            <section className={styles.testimonialsSection}>
                <Testimonials />
            </section>
            <ContactUs user={user} />
            <section className={styles.footerSection}>
                <Footer style={{ backgroundColor: "white", color: "black" }} />
            </section>
            <CookiesModal />
            {showModal && <BasicInfoModal currentUser={currentUser} />}
        </main>
    );
}
