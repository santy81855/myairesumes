import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

type FooterProps = {
    style?: React.CSSProperties;
};

const legalLinks = [
    { label: "Privacy policy", href: "https://s3.privyr.com/privacy/privacy-policy.html?d=eyJlbWFpbCI6Im15cmVzdW1laGVyb3RlYW1AZ21haWwuY29tIiwiY29tcGFueSI6Ik15IFJlc3VtZSBIZXJvIiwiZ2VuX2F0IjoiMjAyNC0wNS0yMlQwODo0Nzo0Mi40MTZaIn0=" },
    { label: "Cookie policy", href: "https://www.cookiepolicygenerator.com/live.php?token=EXyEZN38Y6yfBxxLnUAASRak2qiMeCQj" },
    { label: "Terms & conditions", href: "https://www.privacypolicyonline.com/live.php?token=pxRk7MSONpY7jGcd3od7cpFUCpQv95XL" },
];

const Footer = ({ style }: FooterProps) => {
    return (
        <footer className={styles.footer} style={style}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.brand} aria-label="My Resume Hero home">
                            <span className={styles.logo} aria-hidden="true">m<span>h</span></span>
                            <span>My Resume Hero<span className={styles.dot}>.</span></span>
                        </Link>
                        <p className={styles.brandDescription}>Big ambitions.<br />A better first impression.</p>
                        <p className={styles.brandNote}>Thoughtful tools for your next career move.</p>
                    </div>
                    <div className={styles.linkColumn}>
                        <h2>Build your future</h2>
                        <Link href="/sign-up">Create a resume</Link>
                        <Link href="/#templates">Resume templates</Link>
                        <Link href="/#how-it-works">How it works</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h2>Here to help</h2>
                        <Link href="/help-center?option=faqs">Help center</Link>
                        <Link href="/help-center?option=tutorials">Tutorials</Link>
                        <Link href="/sign-in">Your account</Link>
                    </div>
                    <div className={styles.linkColumn}>
                        <h2>The fine print</h2>
                        {legalLinks.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<span className={styles.srOnly}> (opens in a new tab)</span></a>)}
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} My Resume Hero. All rights reserved.</p>
                    <p className={styles.tagline}><span aria-hidden="true">✳</span> Your experience. Your story. Your next chapter.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
