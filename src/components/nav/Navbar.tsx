import styles from "./Navbar.module.css";
import Link from "next/link";
import Button from "@/components/authentication/sign-out-button/Button";
import Menu from "@/components/nav/mobile/Menu";
import { validateRequest } from "@/lib/auth";

const Navbar = async () => {
    const { session, user } = await validateRequest();
    return (
        <nav className={styles.navContainer}>
            <Menu session={session} />
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
                            <Link href="/account">
                                <i
                                    className={`${styles.accountLink} fa-solid fa-user`}
                                ></i>
                            </Link>
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
