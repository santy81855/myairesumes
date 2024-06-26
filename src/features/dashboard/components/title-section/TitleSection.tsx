import styles from "./TitleSection.module.css";
import CardSection from "../card-section/CardSection";
import Link from "next/link";

type TitleSectionProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const TitleSection = ({ currentUser, searchParams }: TitleSectionProps) => {
    const { basicInfo, firstName, lastName } = currentUser;
    const name = basicInfo ? basicInfo.name : `${firstName} ${lastName}`;
    const menu = searchParams?.menu;

    return (
        <>
            <section className={styles.titleSection}>
                <section className={styles.column}>
                    <h1 className={styles.pageHeading}>Dashboard</h1>
                    <p className={styles.subHeading}>
                        {currentUser.firstName} {currentUser.lastName}
                    </p>
                </section>
                {!searchParams?.tutorial &&
                    searchParams?.menu !== "resumes" &&
                    searchParams?.menu !== "cover-letters" && (
                        <Link
                            href={`/dashboard?menu=${menu}&tutorial=true`}
                            className={styles.tutorialButton}
                        >
                            Tutorial
                        </Link>
                    )}
            </section>
            <div className={styles.cardContainer}>
                <CardSection currentUser={currentUser} key="dashBoardCards" />
            </div>
        </>
    );
};

export default TitleSection;
