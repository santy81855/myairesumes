import styles from "./Upgrade.module.css";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";
import Link from "next/link";
import { checkIcon } from "@/components/icons/iconSVG";

type UpgradeProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Upgrade = ({ currentUser, searchParams }: UpgradeProps) => {
    return (
        <Card key="upgrade-card" gridArea="upgrade" title="Upgrade">
            <section className={styles.container}>
                <section className={styles.row}>
                    <section className={styles.column}>
                        <p className={styles.title}>
                            Do more with our <span>Pro</span> plan:
                        </p>
                        <section className={styles.list}>
                            <section className={styles.listItem}>
                                <div className={styles.iconContainer}>
                                    {checkIcon}
                                </div>
                                <p className={styles.text}>Unlimited jobs</p>
                            </section>
                            <section className={styles.listItem}>
                                <div className={styles.iconContainer}>
                                    {checkIcon}
                                </div>
                                <p className={styles.text}>Unlimited resumes</p>
                            </section>
                            <section className={styles.listItem}>
                                <div className={styles.iconContainer}>
                                    {checkIcon}
                                </div>
                                <p className={styles.text}>
                                    Unlimited cover letters
                                </p>
                            </section>
                            <section className={styles.listItem}>
                                <div className={styles.iconContainer}>
                                    {checkIcon}
                                </div>
                                <p className={styles.text}>
                                    Access to every template
                                </p>
                            </section>
                        </section>
                    </section>
                    <Link href="/upgrade" className={styles.upgradeButton}>
                        Upgrade Now
                    </Link>
                </section>
            </section>
        </Card>
    );
};

export default Upgrade;
