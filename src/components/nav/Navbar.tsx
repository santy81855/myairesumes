import styles from "./Navbar.module.css";
import Link from "next/link";
import Menu from "@/components/nav/mobile/Menu";
import ProfileButton from "@/components/authentication/profile-button/ProfileButton";
import { validateRequest } from "@/lib/auth";

const Navbar = async () => {
    const { session, user } = await validateRequest();
    return (
        <nav className={styles.navContainer}>
            <Menu session={session} user={user} />
            <section className={styles.textContainer}>
                <div
                    className={styles.navItem}
                    style={{ alignItems: session ? "flex-end" : "center" }}
                >
                    <Link href="/">
                        <p className={styles.companyName}>MyAIResumes</p>
                    </Link>
                </div>
                <div
                    className={styles.navItem}
                    style={{ alignItems: session ? "flex-end" : "center" }}
                >
                    <Link href="/">
                        <p className={styles.navLink}>Home</p>
                    </Link>
                    {session ? (
                        <>
                            <Link href="/dashboard">
                                <p className={styles.navLink}>Dashboard</p>
                            </Link>
                            <ProfileButton session={session} user={user} />
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
