import styles from "./Navbar.module.css";
import Link from "next/link";
import Button from "@/components/authentication/sign-out-button/Button";
import { lucia, validateRequest } from "@/lib/auth";

const Navbar = async () => {
    const { session, user } = await validateRequest();
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
                    {session ? (
                        <>
                            <Link href="/dashboard">
                                <p className={styles.navLink}>Dashboard</p>
                            </Link>
                            <Button />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-up">
                                <p className={styles.reportButton}>
                                    Create a Resume
                                </p>
                            </Link>
                        </>
                    )}
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
