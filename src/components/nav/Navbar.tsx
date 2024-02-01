import styles from "./Navbar.module.css";
import Link from "next/link";
import Menu from "@/components/nav/mobile/Menu";
import ProfileButton from "@/components/nav/profile-button/ProfileButton";
import { validateRequest } from "@/lib/auth";

type NavbarProps = {
    landingPage?: boolean;
};

const Navbar = async ({ landingPage }: NavbarProps) => {
    const { session, user } = await validateRequest();
    const extraStyle = landingPage
        ? { backgroundColor: "transparent", color: "white" }
        : {};
    return (
        <nav className={styles.navContainer} style={extraStyle}>
            <Menu session={session} user={user} landingPage={landingPage} />
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
                            <ProfileButton
                                session={session}
                                user={user}
                                landingPage={landingPage}
                            />
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
