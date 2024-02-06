import styles from "./Card.module.css";

// this is a component that will take children as its props

type CardProps = {
    children: React.ReactNode;
    gridArea: string;
    title: string;
};

const Card = ({ children, gridArea, title }: CardProps) => {
    return (
        <form className={styles.container} style={{ gridArea }}>
            <section className={styles.titleRow}>
                <p className={styles.title}>{title}</p>
            </section>
            {children}
        </form>
    );
};

export default Card;
