import styles from "./Card.module.css";
import { SignUpForm, SignInForm, Resume } from "@/features/authentication";
import Link from "next/link";

type CardProps = {
    authType: string;
};

const Card = ({ authType }: CardProps) => {
    return (
        <section className={styles.container}>
            <section className={styles.leftContainer}>
                <div className={styles.circle}></div>
                <Resume />
            </section>
            <section className={styles.rightContainer}>
                {authType === "sign-up" && <SignUpForm />}
                {authType === "sign-in" && <SignInForm />}
            </section>
            <Link
                href="https://www.freepik.com/free-vector/abstract-banner-with-low-poly-plexus-network-communications-design_10135315.htm#query=login%20background&position=3&from_view=search&track=ais&uuid=3fdc7ca7-a2a7-4058-9b59-3a2390236bc1"
                className={styles.link}
            >
                Image by kjpargeter on Freepik
            </Link>
        </section>
    );
};

export default Card;
