import styles from "./Navbar.module.css";
import Link from "next/link";
import Menu from "@/components/nav/mobile/Menu";
import ProfileButton from "@/components/nav/profile-button/ProfileButton";
import { validateRequest } from "@/features/authentication/lib/auth";
import type { CSSProperties } from "react";

type NavbarProps = {
    style?: CSSProperties;
    isAuth?: boolean;
};

const Navbar = async ({ style, isAuth }: NavbarProps) => {
    const { session, user } = await validateRequest();

    return (
        <nav className={styles.navContainer} style={style} aria-label="Main navigation">
            <Menu session={session} user={user} isAuth={isAuth} />
            <div className={styles.textContainer}>
                <Link href="/" className={styles.logoContainer} aria-label="My Resume Hero home">
                    <span className={styles.logo} aria-hidden="true">m<span>h</span></span>
                    <span className={styles.companyName}>My Resume Hero<span className={styles.brandDot}>.</span></span>
                </Link>
                <div className={styles.navItem}>
                    <Link href="/#features" className={styles.navLink}>Features</Link>
                    <Link href="/#templates" className={styles.navLink}>Templates</Link>
                    <Link href="/pricing" className={styles.navLink}>Pricing</Link>
                    <Link href="/help-center?option=faqs" className={styles.navLink}>Help Center</Link>
                </div>
                <div className={styles.actions}>
                    {session ? (
                        <ProfileButton session={session} user={user} />
                    ) : !isAuth ? (
                        <>
                            <Link href="/sign-in" className={styles.signIn}>Sign in</Link>
                            <Link href="/sign-up" className={styles.reportButton}>Get started <span aria-hidden="true">↗</span></Link>
                        </>
                    ) : (
                        <Link href="/" className={styles.navLink}>Back to home <span aria-hidden="true">↗</span></Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
