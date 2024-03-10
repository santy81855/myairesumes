import styles from "./Card.module.css";

// this is a component that will take children as its props

type CardProps = {
    children: React.ReactNode;
    gridArea?: string;
    title: string;
};

const Card = ({ children, gridArea, title }: CardProps) => {
    const style = gridArea ? { gridArea } : {};
    return (
        <form className={styles.container} style={style}>
            <section className={styles.titleRow}>
                <p className={styles.title}>{title}</p>
            </section>
            <section className={styles.childrenContainer}>{children}</section>
        </form>
    );
};

export default Card;
