import styles from "./Card.module.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

type props = {
    text: string;
    backgroundColor: string;
    color: string;
    height: string;
    width: string;
    fontSize: string;
};
const Card = ({
    text,
    backgroundColor,
    color,
    height,
    width,
    fontSize,
}: props) => {
    return (
        <div
            key={text}
            className={`${styles.card} ${montserrat.className}`}
            style={{ backgroundColor, height, width }}
        >
            <p className={styles.body} style={{ color, fontSize }}>
                {text}
            </p>
        </div>
    );
};

export default Card;
