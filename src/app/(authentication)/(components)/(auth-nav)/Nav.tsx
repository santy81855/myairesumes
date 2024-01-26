import styles from "./Nav.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
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
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
