import styles from "./Navbar.module.css";
import Link from "next/link";
import Menu from "@/components/nav/mobile/Menu";
import ProfileButton from "@/components/nav/profile-button/ProfileButton";
import { validateRequest } from "@/features/authentication/lib/auth";

type NavbarProps = {
    style?: object;
    isAuth?: boolean;
};

const Navbar = async ({ style, isAuth }: NavbarProps) => {
    const { session, user } = await validateRequest();
    const extraStyle = style ? style : {};
    const authPage = isAuth ? false : true;
    return (
        <nav className={styles.navContainer} style={extraStyle}>
            <Menu
                session={session}
                user={user}
                style={extraStyle}
                isAuth={isAuth}
            />
            <section className={styles.textContainer}>
                <div
                    className={styles.navItem}
                    style={{ alignItems: session ? "flex-end" : "center" }}
                >
                    <Link href="/">
                        <p className={styles.companyName}>My Resume Hero</p>
                    </Link>
                </div>
                <div
                    className={styles.navItem}
                    style={{ alignItems: session ? "flex-end" : "center" }}
                >
                    <Link href="/">
                        <p className={styles.navLink}>Home</p>
                    </Link>
                    <Link href="/pricing">
                        <p className={styles.navLink}>Pricing</p>
                    </Link>
                    <Link href="/help-center">
                        <p className={styles.navLink}>Help Center</p>
                    </Link>
                    {session && (
                        <ProfileButton
                            session={session}
                            user={user}
                            style={extraStyle}
                        />
                    )}
                    {!session && authPage && (
                        <Link href="/sign-up">
                            <p className={styles.reportButton}>
                                Create a Resume
                            </p>
                        </Link>
                    )}
                </div>
            </section>
        </nav>
    );
};

export default Navbar;
