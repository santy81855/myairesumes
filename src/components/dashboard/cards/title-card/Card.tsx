import styles from "./Card.module.css";
import Link from "next/link";

type CardProps = {
    title: string;
    number: number;
    url: string;
    gridArea: string;
    key: string;
};

const Card = ({ title, number, url, gridArea }: CardProps) => {
    return (
        <Link
            href={`/dashboard?menu=${title.toLowerCase().split(" ").join("-")}`}
            title={title}
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
        </Link>
    );
};

export default Card;
