import styles from "./Card.module.css";
import Image from "next/image";

type CardProps = {
    title: string;
    number: number;
    url: string;
    gridArea: string;
    key: string;
};

const Card = ({ title, number, url, gridArea, key }: CardProps) => {
    return (
        <section
            key={key}
            className={styles.container}
            style={{
                gridArea,
                background: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.number}>{number}</p>
        </section>
    );
};

export default Card;
