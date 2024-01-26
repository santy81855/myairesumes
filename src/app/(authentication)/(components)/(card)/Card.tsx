import styles from "./Card.module.css";
import Resume from "../(resume)/Resume";
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
