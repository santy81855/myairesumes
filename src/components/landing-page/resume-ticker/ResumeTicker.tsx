import styles from "./ResumeTicker.module.css";
import TickerWrapper from "@/components/ticker/TickerWrapper";
import Resume from "@/components/landing-page/resume/Resume";
import Card from "@/components/ticker/card/Card";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const ResumeTicker = () => {
    const resumeArray = [
        <Resume key={"resume1"} />,
        <Card
            text="TAILOR MADE RESUMES"
            backgroundColor="#d0a883"
            color="white"
            height="300px"
            width="400px"
            fontSize=" var(--font-size-x3large)"
            key={"card1"}
        />,
        <Resume key={"resume2"} />,
        <Resume key={"resume3"} />,
        <Card
            text="CHOOSE YOUR TEMPLATE"
            backgroundColor="#a183cf"
            color="black"
            height="300px"
            width="400px"
            fontSize=" var(--font-size-x3large)"
            key={"card2"}
        />,
        <Resume key={"resume4"} />,
        <Resume key={"resume5"} />,
    ];

    const coverLetterArray = [
        <Card
            text="BE EFFORTELSSLY PROFESSIONAL"
            backgroundColor="#191f31"
            color="white"
            height="200px"
            width="300px"
            fontSize=" var(--font-size-x2large)"
            key={"card3"}
        />,
        <Resume key={"resume1"} />,
        <Resume key={"resume2"} />,
        <Resume key={"resume3"} />,
        <Card
            text="CUSTOMIZE EACH APPLICATION"
            backgroundColor="#a4c5ac"
            color="black"
            height="200px"
            width="300px"
            fontSize=" var(--font-size-x2large)"
            key={"card4"}
        />,
        <Resume key={"resume4"} />,
        <Resume key={"resume5"} />,
    ];

    return (
        <section className={styles.tickerContainer}>
            <p className={`${montserrat.className} ${styles.bigText}`}>
                TEMPLATES
            </p>
            <div>
                <TickerWrapper
                    array={resumeArray}
                    duration={30}
                    direction={-1}
                    styling={{
                        minHeight: "300px",
                        minWidth: "232px",
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                        marginLeft: "1rem",
                        backgroundColor: "transparent",
                    }}
                />
            </div>
            <div>
                <TickerWrapper
                    array={coverLetterArray}
                    duration={40}
                    direction={-1}
                    styling={{
                        minHeight: "200px",
                        minWidth: "155px",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        marginLeft: "0.7rem",
                        backgroundColor: "transparent",
                    }}
                />
            </div>
        </section>
    );
};

export default ResumeTicker;
