import styles from "./Card.module.css";
import { SignUpForm, SignInForm, Resume } from "@/features/authentication";
import Link from "next/link";

type CardProps = {
    authType: string;
};

const Card = ({ authType }: CardProps) => {
    return (
        <section className={styles.container}>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
            <div className={styles.circle4}></div>
            <section className={styles.leftContainer}>
                <div className={styles.circle}></div>
                <Resume />
            </section>
            <section className={styles.rightContainer}>
                {authType === "sign-up" && <SignUpForm />}
                {authType === "sign-in" && <SignInForm />}
            </section>
        </section>
    );
};

export default Card;
