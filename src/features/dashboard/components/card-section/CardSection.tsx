import styles from "./CardSection.module.css";
import Card from "@/features/dashboard/components/cards/title-card/Card";

type CardSectionProps = {
    currentUser: any;
};

const CardSection = ({ currentUser }: CardSectionProps) => {
    return (
        <section className={styles.container}>
            <Card
                title="Jobs"
                number={currentUser?.numberJobs}
                url="/images/dashboard/job-background.svg"
                gridArea="jobs"
                key="jobs"
            />
            <Card
                title="Resumes"
                number={currentUser?.numberResumes}
                url="/images/dashboard/resume-background.svg"
                gridArea="resumes"
                key="resumes"
            />
            <Card
                title="Cover Letters"
                number={currentUser?.numberCoverLetters}
                url="/images/dashboard/cover-letter-background.svg"
                gridArea="cover-letters"
                key="cover-letters"
            />
        </section>
    );
};

export default CardSection;
