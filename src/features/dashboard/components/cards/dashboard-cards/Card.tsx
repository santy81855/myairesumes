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
        <section className={styles.container} style={style} id={title}>
            <section className={styles.titleRow}>
                <h2 className={styles.title}>{title}</h2>
            </section>
            <section
                className={styles.childrenContainer}
                style={title === "Manage Application" ? { padding: 0 } : {}}
            >
                {children}
            </section>
        </section>
    );
};

export default Card;
