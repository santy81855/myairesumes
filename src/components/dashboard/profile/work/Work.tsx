import styles from "./Work.module.css";
import { plusIcon } from "@/components/icons/iconSVG";
import Link from "next/link";
import Toggle from "@/components/toggle/Toggle";
import { addUserWorkInfo } from "@/actions/user";
import FormLoading from "@/components/form-loading/FormLoading";

type WorkProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Work = ({ currentUser, searchParams }: WorkProps) => {
    const { basicInfo } = currentUser;
    const work = basicInfo ? basicInfo.work : [];
    const edit = searchParams?.workEdit || false;
    const updateWorkInfo = addUserWorkInfo.bind(null, currentUser);
    return (
        <form className={styles.workSection} action={updateWorkInfo}>
            <p className={styles.title}>Work</p>
            {edit ? (
                <section className={styles.workInfoContainer}>
                    <p className={styles.addTitle}>Add a Job</p>
                    <section className={styles.workInfo}>
                        <p className={styles.label}>Company</p>
                        <input
                            type="text"
                            name="company"
                            className={styles.input}
                            defaultValue=""
                            required
                            autoFocus
                        />
                    </section>
                    <section className={styles.workInfo}>
                        <p className={styles.label}>Position</p>
                        <input
                            type="text"
                            name="position"
                            className={styles.input}
                            defaultValue=""
                            required
                        />
                    </section>
                    <section className={styles.workInfoHorizontal}>
                        <p className={styles.label}>Current Employer</p>
                        <div className={styles.toggleSwitch}>
                            <Toggle name="currentEmployer" />
                        </div>
                    </section>
                    <section className={styles.dateInput}>
                        <section className={styles.workInfo}>
                            <p className={styles.label}>Start Date</p>
                            <input
                                type="date"
                                name="startDate"
                                className={styles.input}
                                defaultValue=""
                                required
                            />
                        </section>
                        <section className={styles.workInfo}>
                            <p className={styles.label}>End Date</p>
                            <input
                                type="date"
                                name="endDate"
                                className={styles.input}
                            />
                        </section>
                    </section>
                    <button className={styles.saveButton}>Save</button>
                </section>
            ) : (
                <section className={styles.workGrid}>
                    {work.map((job: any, index: number) => {
                        return (
                            <section className={styles.workItem} key={index}>
                                <p className={styles.company}>{job.company}</p>
                                <p className={styles.position}>
                                    {job.position}
                                </p>
                                <section className={styles.dateRange}>
                                    <p className={styles.startDate}>
                                        {job.startDate}
                                        {" - "}
                                    </p>
                                    {job.currentEmployer ? (
                                        <p className={styles.endDate}>
                                            Present
                                        </p>
                                    ) : (
                                        <p className={styles.endDate}>
                                            {job.endDate}
                                        </p>
                                    )}
                                </section>
                            </section>
                        );
                    })}
                    <section className={styles.workItem}>
                        <p className={styles.company}>Example Company Name</p>
                        <p className={styles.position}>Example Position</p>
                        <section className={styles.dateRange}>
                            <p className={styles.startDate}>Jan 2020{" - "}</p>
                            <p className={styles.endDate}>Present</p>
                        </section>
                    </section>
                    <section className={styles.workItem}>
                        <p className={styles.company}>Example Company Name</p>
                        <p className={styles.position}>Example Position</p>
                        <section className={styles.dateRange}>
                            <p className={styles.startDate}>Jan 2020{" - "}</p>
                            <p className={styles.endDate}>Present</p>
                        </section>
                    </section>
                    <section className={styles.workItem}>
                        <p className={styles.company}>Example Company Name</p>
                        <p className={styles.position}>Example Position</p>
                        <section className={styles.dateRange}>
                            <p className={styles.startDate}>Jan 2020{" - "}</p>
                            <p className={styles.endDate}>Present</p>
                        </section>
                    </section>
                    <section className={styles.workItem}>
                        <p className={styles.company}>Example Company Name</p>
                        <p className={styles.position}>Example Position</p>
                        <section className={styles.dateRange}>
                            <p className={styles.startDate}>Jan 2020{" - "}</p>
                            <p className={styles.endDate}>Present</p>
                        </section>
                    </section>
                    <Link
                        href="/dashboard?menu=profile&workEdit=true"
                        className={styles.addWorkButton}
                    >
                        <div className={styles.svgContainer}>{plusIcon}</div>
                    </Link>
                </section>
            )}
            <FormLoading />
        </form>
    );
};

export default Work;
