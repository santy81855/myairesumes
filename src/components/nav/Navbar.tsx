import styles from "./Navbar.module.css";
import Link from "next/link";
import Button from "@/app/(authentication)/(components)/(sign-out-button)/Button";
import { auth } from "@/auth/lucia";
import * as context from "next/headers";

const Navbar = async () => {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    console.log(session);
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
