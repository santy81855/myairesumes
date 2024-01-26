import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "../(components)/(card)/Card";
import { getPageSession } from "@/lib/session";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const session = await getPageSession();
    if (session) {
        if (!session.user.email_verified) {
            redirect("/email-verification");
        }
        redirect("/");
    }
    return (
        <main className={styles.pageContainer}>
            <Card authType="sign-up" />
            <Link
                href="https://www.freepik.com/free-vector/abstract-banner-with-low-poly-plexus-network-communications-design_10135315.htm#query=login%20background&position=3&from_view=search&track=ais&uuid=3fdc7ca7-a2a7-4058-9b59-3a2390236bc1"
                className={styles.link}
            >
                Image by kjpargeter on Freepik
            </Link>
        </main>
    );
};

export default SignUpPage;
