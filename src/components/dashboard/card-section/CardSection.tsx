import styles from "./CardSection.module.css";
import Card from "@/components/dashboard/card/Card";

const CardSection = () => {
    return (
        <section className={styles.container}>
            <Card
                title="Jobs"
                number={5}
                url="/images/backgrounds/cloud1.jpg"
                gridArea="jobs"
                key="jobs"
            />
            <Card
                title="Resumes"
                number={5}
                url="/images/backgrounds/cloud2.png"
                gridArea="resumes"
                key="resumes"
            />
            <Card
                title="Cover Letters"
                number={5}
                url="/images/backgrounds/cloud3.jpg"
                gridArea="cover-letters"
                key="cover-letters"
            />
        </section>
    );
};

export default CardSection;
