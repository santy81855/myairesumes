import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerList}>
                <a
                    href="https://myresumehero.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy Notice
                </a>
                <a
                    href="https://myresumehero.com/cookie-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cookies
                </a>
                <a
                    href="https://myresumehero.com/terms-and-conditions"
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
