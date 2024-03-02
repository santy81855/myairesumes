import styles from "./TitleSection.module.css";
import CardSection from "../card-section/CardSection";

type TitleSectionProps = {
    currentUser: any;
};

const TitleSection = ({ currentUser }: TitleSectionProps) => {
    const { basicInfo, firstName, lastName } = currentUser;
    const name = basicInfo ? basicInfo.name : `${firstName} ${lastName}`;
    return (
        <>
            <section className={styles.titleSection}>
                <h1 className={styles.pageHeading}>Dashboard</h1>
                <p className={styles.subHeading}>
                    {currentUser.firstName} {currentUser.lastName}
                </p>
            </section>
            <div className={styles.cardContainer}>
                <CardSection currentUser={currentUser} key="dashBoardCards" />
            </div>
        </>
    );
};

export default TitleSection;
