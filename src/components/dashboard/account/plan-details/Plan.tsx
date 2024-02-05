import styles from "./Plan.module.css";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import Link from "next/link";

type PlanProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Plan = ({ currentUser, searchParams }: PlanProps) => {
    const { status, numberJobs, numberResumes, numberCoverLetters } =
        currentUser;
    return (
        <Card gridArea="plan" title="Plan Details">
            <section className={styles.container}>
                <section className={styles.titleRow}>
                    <section className={styles.titleContainer}>
                        <p className={styles.title}>Ai Resume - {status}</p>
                        <section className={styles.descriptionContainer}>
                            <section className={styles.priceContainer}>
                                <p className={styles.dollarSign}>$</p>
                                <p className={styles.price}>
                                    {status === "free" ? "0" : "4.99"}
                                </p>
                            </section>
                            <p className={styles.description}>/ month</p>
                        </section>
                    </section>
                    {status === "free" && (
                        <Link
                            href="/dashboard?menu=account&upgradePlan=true"
                            className={styles.upgradeButton}
                        >
                            Upgrade Plan
                        </Link>
                    )}
                </section>
                <section className={styles.itemContainer}>
                    <section className={styles.item}>
                        <section className={styles.itemRow}>
                            <p className={styles.itemTitle}>Jobs</p>
                            <p className={styles.itemNumber}>
                                {numberJobs} /{" "}
                                {status === "free" ? "1" : "Unlimited"}
                            </p>
                        </section>
                        <section className={styles.progressBar}>
                            {status === "free" && numberJobs > 0 && (
                                <section className={styles.full}></section>
                            )}
                        </section>
                    </section>
                    <section className={styles.item}>
                        <section className={styles.itemRow}>
                            <p className={styles.itemTitle}>Resumes</p>
                            <p className={styles.itemNumber}>
                                {numberResumes} /{" "}
                                {status === "free" ? "1" : "Unlimited"}
                            </p>
                        </section>
                        <section className={styles.progressBar}>
                            {status === "free" && numberResumes > 0 && (
                                <section className={styles.full}></section>
                            )}
                        </section>
                    </section>
                    <section className={styles.item}>
                        <section className={styles.itemRow}>
                            <p className={styles.itemTitle}>Cover Letters</p>
                            <p className={styles.itemNumber}>
                                {numberCoverLetters} /{" "}
                                {status === "free" ? "1" : "Unlimited"}
                            </p>
                        </section>
                        <section className={styles.progressBar}>
                            {status === "free" && numberCoverLetters > 0 && (
                                <section className={styles.full}></section>
                            )}
                        </section>
                    </section>
                </section>
            </section>
        </Card>
    );
};

export default Plan;
