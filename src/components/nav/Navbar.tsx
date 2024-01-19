import styles from "@styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className={styles.navContainer}>
            <section className={styles.textContainer}>
                <div className={styles.navItem}>
                    <Link href="/">
                        <p className={styles.companyName}>MyAIResumes</p>
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link href="/">
                        <p className={styles.navLink}>Home</p>
                    </Link>
                    <Link href="/generate-report">
                        <p className={styles.reportButton}>Create a Resume</p>
                    </Link>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
