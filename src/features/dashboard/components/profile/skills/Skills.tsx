import styles from "./Skills.module.css";
import { plusIcon } from "@/components/icons/iconSVG";
import Link from "next/link";
import {
    addUserSkillInfoAction,
    updateUserSkillInfoAction,
    removeUserSkillInfoAction,
} from "@/features/dashboard";
import FormLoading from "@/components/form-loading/FormLoading";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";
import BulletInput from "../../bullet-input/BulletInput";

type SkillsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Skills = ({ currentUser, searchParams }: SkillsProps) => {
    const { basicInfo } = currentUser;
    const work = basicInfo && basicInfo.skills ? basicInfo.skills : [];
    const edit = searchParams?.addSkill || false;
    const workId = edit ? parseInt(searchParams?.jobId as string, 10) : null;
    const workBeingEdited =
        (workId && work.find((job: any) => job.id === workId)) || null;
    const addWorkInfo = addUserSkillInfoAction.bind(null, currentUser);
    const removeWorkInfo = removeUserSkillInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );
    const updateWorkInfo = updateUserSkillInfoAction.bind(
        null,
        currentUser,
        workId || -1
    );

    return (
        <Card key="skills-card" gridArea="skills" title="Skills">
            <form className={styles.formContainer}>
                {edit ? (
                    <section className={styles.workInfoContainer}>
                        <p className={styles.addTitle}>
                            {workId ? "Edit Skill" : "Add a Skill"}
                        </p>
                        <section className={styles.workInfo}>
                            <label htmlFor="skill" className={styles.label}>
                                Skill
                            </label>
                            <textarea
                                rows={4}
                                id="skill"
                                name="skill"
                                placeholder="Enter a skill..."
                                className={styles.textArea}
                                defaultValue={
                                    workId ? workBeingEdited.skill : ""
                                }
                            />
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
                        {work.map((skill: any, index: number) => {
                            return (
                                <section
                                    className={styles.workItem}
                                    key={index}
                                >
                                    <section className={styles.workItemInfo}>
                                        <p className={styles.company}>
                                            {skill.skill}
                                        </p>
                                    </section>
                                    <Link
                                        className={styles.editButton}
                                        href={`/dashboard?menu=profile&addSkill=true&jobId=${skill.id}`}
                                    >
                                        Edit
                                    </Link>
                                </section>
                            );
                        })}
                        <Link
                            title="Add a Skill"
                            href="/dashboard?menu=profile&addSkill=true"
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

export default Skills;
