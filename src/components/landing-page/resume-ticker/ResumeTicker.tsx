import styles from "./ResumeTicker.module.css";
import TickerWrapper from "@/components/ticker/TickerWrapper";
import Resume from "@/components/landing-page/resume/Resume";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const ResumeTicker = () => {
    type props = {
        text: string;
        backgroundColor: string;
        color: string;
        key: string;
    };
    const Card = ({ text, backgroundColor, color, key }: props) => {
        return (
            <div
                key={key}
                className={`${styles.card} ${montserrat.className}`}
                style={{ backgroundColor }}
            >
                <p className={styles.body} style={{ color }}>
                    {text}
                </p>
            </div>
        );
    };
    const array = [
        <Resume key={"resume1"} />,
        <Card
            text="TAILOR MADE RESUMES"
            backgroundColor="#44d3f3"
            color="black"
            key="card1"
        />,
        <Resume key={"resume2"} />,
        <Resume key={"resume3"} />,
        <Card
            text="EXPRESS YOURSELF"
            backgroundColor="#f122c8"
            color="white"
            key="card2"
        />,
        <Resume key={"resume4"} />,
        <Resume key={"resume5"} />,
    ];
    return (
        <section className={styles.tickerContainer}>
            <TickerWrapper
                array={array}
                duration={30}
                direction={-1}
                styling={{
                    minHeight: "300px",
                    minWidth: "232px",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    marginLeft: "0.5rem",
                    backgroundColor: "transparent",
                }}
            />
            <TickerWrapper
                array={array}
                duration={40}
                direction={-1}
                styling={{
                    minHeight: "300px",
                    minWidth: "232px",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    marginLeft: "0.5rem",
                    backgroundColor: "transparent",
                }}
            />
        </section>
    );
};

export default ResumeTicker;
