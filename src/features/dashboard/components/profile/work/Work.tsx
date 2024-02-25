import styles from "./Work.module.css";
import { plusIcon } from "@/components/icons/iconSVG";
import Link from "next/link";
import Toggle from "@/components/toggle/Toggle";
import {
    addUserWorkInfoAction,
    removeUserWorkInfoAction,
    updateUserWorkInfoAction,
} from "@/features/dashboard";
import FormLoading from "@/components/form-loading/FormLoading";
import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";

type WorkProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Work = ({ currentUser, searchParams }: WorkProps) => {
    const { basicInfo } = currentUser;
    const work = basicInfo
        ? sortObjectArrayByDateEnd(basicInfo.work, basicInfo.workOrder)
        : [];
    const edit = searchParams?.addJob || false;
    const workId = edit ? parseInt(searchParams?.jobId as string, 10) : null;
    const workBeingEdited =
        (workId && work.find((job: any) => job.id === workId)) || null;
    const addWorkInfo = addUserWorkInfoAction.bind(null, currentUser);
    const removeWorkInfo = removeUserWorkInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );
    const updateWorkInfo = updateUserWorkInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );

    return (
        <Card key="work-card" gridArea="work" title="Work History">
            {edit ? (
                <section className={styles.workInfoContainer}>
                    <p className={styles.addTitle}>
                        {workId ? "Edit Job" : "Add a Job"}
                    </p>
                    <section className={styles.workInfo}>
                        <p className={styles.label}>Company</p>
                        <input
                            type="text"
                            name="company"
                            className={styles.input}
                            defaultValue={workId ? workBeingEdited.company : ""}
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
                            defaultValue={
                                workId ? workBeingEdited.position : ""
                            }
                            required
                        />
                    </section>
                    <section className={styles.workInfoHorizontal}>
                        <p className={styles.label}>Current Employer</p>
                        <div className={styles.toggleSwitch}>
                            <Toggle
                                name="currentEmployer"
                                defaultChecked={
                                    workId
                                        ? workBeingEdited.currentEmployer
                                        : false
                                }
                            />
                        </div>
                    </section>
                    <section className={styles.dateInput}>
                        <section className={styles.workInfo}>
                            <p className={styles.label}>Start Date</p>
                            <input
                                type="date"
                                name="startDate"
                                className={styles.input}
                                defaultValue={
                                    workId
                                        ? workBeingEdited.startDate
                                        : new Date().toISOString().split("T")[0]
                                }
                                required
                            />
                        </section>
                        <section className={styles.workInfo}>
                            <p className={styles.label}>End Date</p>
                            <input
                                type="date"
                                name="endDate"
                                className={styles.input}
                                defaultValue={
                                    workId
                                        ? workBeingEdited.endDate.toLowerCase() ===
                                          "present"
                                            ? new Date()
                                                  .toISOString()
                                                  .split("T")[0]
                                            : workBeingEdited.endDate
                                        : new Date().toISOString().split("T")[0]
                                }
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </section>
                    </section>
                    <section className={styles.buttonContainer}>
                        <Link
                            href="/dashboard?menu=profile"
                            className={styles.cancelButton}
                        >
                            cancel
                        </Link>
                        {workId ? (
                            <section
                                className={styles.horizontalButtonContainer}
                            >
                                <button
                                    type="submit"
                                    className={styles.removeButton}
                                    formAction={removeWorkInfo}
                                >
                                    Remove
                                </button>
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                    formAction={updateWorkInfo}
                                >
                                    Update
                                </button>
                            </section>
                        ) : (
                            <button
                                type="submit"
                                className={styles.saveButton}
                                formAction={addWorkInfo}
                            >
                                Save
                            </button>
                        )}
                    </section>
                </section>
            ) : (
                <section className={styles.workGrid}>
                    {work.map((job: any, index: number) => {
                        return (
                            <section className={styles.workItem} key={index}>
                                <section className={styles.workItemInfo}>
                                    <p className={styles.company}>
                                        {job.company}
                                    </p>
                                    <p className={styles.position}>
                                        {job.position}
                                    </p>
                                    <section className={styles.dateRange}>
                                        <p className={styles.startDate}>
                                            {formatDateMonthYear(job.startDate)}
                                            {" - "}
                                        </p>
                                        {job.currentEmployer ? (
                                            <p className={styles.endDate}>
                                                {job.endDate}
                                            </p>
                                        ) : (
                                            <p className={styles.endDate}>
                                                {formatDateMonthYear(
                                                    job.endDate
                                                )}
                                            </p>
                                        )}
                                    </section>
                                </section>
                                <Link
                                    className={styles.editButton}
                                    href={`/dashboard?menu=profile&addJob=true&jobId=${job.id}`}
                                >
                                    Edit
                                </Link>
                            </section>
                        );
                    })}
                    <Link
                        href="/dashboard?menu=profile&addJob=true"
                        className={styles.addWorkButton}
                    >
                        <div className={styles.svgContainer}>{plusIcon}</div>
                    </Link>
                </section>
            )}
            <FormLoading />
        </Card>
    );
};

export default Work;
