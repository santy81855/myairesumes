import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.css";

export const metadata = {
    title: "Your account | My Resume Hero",
    description: "Your résumés, cover letters, and next career chapter, together in one workspace.",
};

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Link href="/" className={styles.brand} aria-label="My Resume Hero home">
                    <Image className={styles.brandMark} src="/icon.svg" alt="" width={37} height={37} />
                    <span>My Resume Hero<span className={styles.brandDot}>.</span></span>
                </Link>
                <Link href="/" className={styles.backLink}><span aria-hidden="true">←</span> Back to home</Link>
            </header>
            <div className={styles.content}>
                <aside className={styles.story} aria-label="Your next career chapter">
                    <p className={styles.eyebrow}><span /> A LITTLE CLARITY. A LOT OF POSSIBILITY.</p>
                    <h2>Good things<br />are <em>ahead.</em></h2>
                    <p className={styles.storyDescription}>A place for your experience, your ambitions,<br className={styles.desktopBreak} /> and everything that comes next.</p>
                    <figure className={styles.preview}>
                        <div className={styles.backPaper} aria-hidden="true" />
                        <div className={styles.resumePaper}>
                            <Image src="/images/template-previews/triumph.png" alt="My Resume Hero's Triumph résumé template with fictional sample content" width={1220} height={1579} priority />
                        </div>
                        <figcaption><span className={styles.previewDot} /> Triumph · An actual My Resume Hero template</figcaption>
                    </figure>
                    <p className={styles.storyFooter}>Your experience deserves a good introduction.</p>
                </aside>
                <div className={styles.formColumn}>
                    <div className={styles.formContent}>{children}</div>
                    <footer className={styles.footer}>Made for your next chapter.<span>My Resume Hero</span></footer>
                </div>
            </div>
        </div>
    );
}
