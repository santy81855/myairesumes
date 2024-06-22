import styles from "./Projects.module.css";
import { plusIcon } from "@/components/icons/iconSVG";
import Link from "next/link";
import {
    addUserProjectInfoAction,
    removeUserProjectInfoAction,
    updateUserProjectInfoAction,
} from "@/features/dashboard";
import FormLoading from "@/components/form-loading/FormLoading";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";
import BulletInput from "../../bullet-input/BulletInput";

type ProjectsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Projects = ({ currentUser, searchParams }: ProjectsProps) => {
    const { basicInfo } = currentUser;
    const work = basicInfo && basicInfo.projects ? basicInfo.projects : [];
    const edit = searchParams?.addProject || false;
    const workId = edit ? parseInt(searchParams?.jobId as string, 10) : null;
    const workBeingEdited =
        (workId && work.find((job: any) => job.id === workId)) || null;
    const addWorkInfo = addUserProjectInfoAction.bind(null, currentUser);
    const removeWorkInfo = removeUserProjectInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );
    const updateWorkInfo = updateUserProjectInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );

    return (
        <Card key="projects-card" gridArea="projects" title="Projects">
            <form className={styles.formContainer}>
                {edit ? (
                    <section className={styles.workInfoContainer}>
                        <p className={styles.addTitle}>
                            {workId ? "Edit Project" : "Add a Project"}
                        </p>
                        <section className={styles.dateInput}>
                            <section className={styles.workInfo}>
                                <label htmlFor="title" className={styles.label}>
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    className={styles.input}
                                    defaultValue={
                                        workId ? workBeingEdited.title : ""
                                    }
                                    required
                                    autoFocus
                                />
                            </section>
                            <section className={styles.workInfo}>
                                <label htmlFor="link" className={styles.label}>
                                    Link
                                </label>
                                <input
                                    id="link"
                                    type="text"
                                    name="link"
                                    className={styles.input}
                                    defaultValue={
                                        workId ? workBeingEdited.link : ""
                                    }
                                    required
                                />
                            </section>
                        </section>
                        <section className={styles.workInfo}>
                            <label
                                htmlFor="projectSummary"
                                className={styles.label}
                            >
                                Summary
                            </label>
                            <textarea
                                rows={4}
                                id="projectSummary"
                                name="projectSummary"
                                className={styles.textArea}
                                defaultValue={
                                    workId ? workBeingEdited.summary : ""
                                }
                            />
                        </section>
                        <BulletInput
                            info={workId ? workBeingEdited.bullets : [""]}
                        />
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
                        {work.map((project: any, index: number) => {
                            return (
                                <section
                                    className={styles.workItem}
                                    key={index}
                                >
                                    <section className={styles.workItemInfo}>
                                        <p className={styles.company}>
                                            {project.title}
                                        </p>
                                        <p className={styles.position}>
                                            {project.link}
                                        </p>
                                        <p className={styles.summary}>
                                            {project.summary}
                                        </p>
                                        {project.bullets && (
                                            <section className={styles.bullets}>
                                                {project.bullets.map(
                                                    (
                                                        bullet: string,
                                                        index: number
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className={
                                                                styles.bulletItem
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.bulletIcon
                                                                }
                                                            ></div>
                                                            <p
                                                                className={
                                                                    styles.bulletText
                                                                }
                                                            >
                                                                {bullet}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </section>
                                        )}
                                    </section>
                                    <Link
                                        className={styles.editButton}
                                        href={`/dashboard?menu=profile&addProject=true&jobId=${project.id}`}
                                    >
                                        Edit
                                    </Link>
                                </section>
                            );
                        })}
                        <Link
                            title="Add a Project"
                            href="/dashboard?menu=profile&addProject=true"
                            className={styles.addWorkButton}
                        >
                            <div className={styles.svgContainer}>
                                {plusIcon}
                            </div>
                        </Link>
                    </section>
                )}
                <FormLoading />
            </form>
        </Card>
    );
};

export default Projects;
