import styles from "./Card.module.css";
import Avatar from "../(avatar)/Avatar";
import FakeText from "@components/fake-text/FakeText";
import SignUpForm from "../(sign-up-form)/Form";
import SignInForm from "../(sign-in-form)/Form";

type CardProps = {
    authType: string;
};

const Card = ({ authType }: CardProps) => {
    return (
        <section className={styles.container}>
            <section className={styles.leftContainer}>
                <div className={styles.circle}></div>
                <div className={styles.resume}>
                    <Avatar />
                    <FakeText numLines={10} lineHeight="10px" spacing="10px" />
                </div>
            </section>
            <section className={styles.rightContainer}>
                {authType === "sign-up" && <SignUpForm />}
                {authType === "sign-in" && <SignInForm />}
            </section>
        </section>
    );
};

export default Card;
