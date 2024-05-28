import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <div className={styles.footerList}>
                <p className={styles.footerTitle}>
                    © {currentYear} My Resume Hero
                </p>
                <a
                    href="https://s3.privyr.com/privacy/privacy-policy.html?d=eyJlbWFpbCI6Im15cmVzdW1laGVyb3RlYW1AZ21haWwuY29tIiwiY29tcGFueSI6Ik15IFJlc3VtZSBIZXJvIiwiZ2VuX2F0IjoiMjAyNC0wNS0yMlQwODo0Nzo0Mi40MTZaIn0="
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy Policy
                </a>
                <a
                    href="https://www.cookiepolicygenerator.com/live.php?token=EXyEZN38Y6yfBxxLnUAASRak2qiMeCQj"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cookie Policy
                </a>
                <a
                    href="https://www.privacypolicyonline.com/live.php?token=pxRk7MSONpY7jGcd3od7cpFUCpQv95XL"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Terms and Conditions
                </a>
            </div>
        </footer>
    );
};

export default Footer;
