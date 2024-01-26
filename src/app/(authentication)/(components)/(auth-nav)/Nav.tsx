import styles from "./Nav.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
    return (
        <nav className={styles.navContainer}>
            <section className={styles.textContainer}>
                <div className={styles.navItem}>
                    <Link href="/" className={styles.logoContainer}>
                        <Image
                            src="/images/logos/logo512.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <p className={styles.companyName}>MyAiResumes</p>
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link href="/">
                        <p className={styles.navLink}>Home</p>
                    </Link>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
