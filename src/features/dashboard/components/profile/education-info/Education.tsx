import styles from "./Education.module.css";
import Link from "next/link";
import Toggle from "@/components/toggle/Toggle";
import {
    addUserEducationInfoAction,
    removeUserEducationInfoAction,
    updateUserEducationInfoAction,
} from "@/features/dashboard";
import FormLoading from "@/components/form-loading/FormLoading";
import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { plusIcon } from "@/components/icons/iconSVG";
import Card from "@/features/dashboard/components/cards/dashboard-cards/Card";

type EducationProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

export const Education = ({ currentUser, searchParams }: EducationProps) => {
    const { basicInfo } = currentUser;
    const education = basicInfo
        ? sortObjectArrayByDateEnd(
              basicInfo.education,
              basicInfo.educationOrder
          )
        : [];
    const edit = searchParams?.addEducation || false;
    const educationId = edit
        ? parseInt(searchParams?.educationId as string, 10)
        : null;
    const educationBeingEdited =
        (educationId &&
            education.find((education: any) => education.id === educationId)) ||
        null;
    const addEducationInfo = addUserEducationInfoAction.bind(null, currentUser);
    const removeEducationInfo = removeUserEducationInfoAction.bind(
        null,
        currentUser,
        educationId || -1
    );
    const updateEducationInfo = updateUserEducationInfoAction.bind(
        null,
        currentUser,
        educationId || -1
    );

    return (
        <Card
            key="education-card"
            gridArea="education"
            title="Education History"
        >
            {edit ? (
                <section className={styles.educationInfoContainer}>
                    <p className={styles.addTitle}>
                        {educationId ? "Edit Degree" : "Add a Degree"}
                    </p>
                    <section className={styles.educationInfo}>
                        <p className={styles.label}>School Name</p>
                        <input
                            type="text"
                            name="schoolName"
                            className={styles.input}
                            defaultValue={
                                educationId
                                    ? educationBeingEdited.schoolName
                                    : ""
                            }
                            required
                            autoFocus
                        />
                    </section>
                    <section className={styles.degreeInfoInput}>
                        <section className={styles.educationInfo}>
                            <p className={styles.label}>Degree Type</p>
                            <input
                                type="text"
                                name="degreeType"
                                className={styles.input}
                                defaultValue={
                                    educationId
                                        ? educationBeingEdited.degreeType
                                        : ""
                                }
                                required
                            />
                        </section>
                        <section className={styles.educationInfo}>
                            <p className={styles.label}>Degree Field</p>
                            <input
                                type="text"
                                name="degreeField"
                                className={styles.input}
                                defaultValue={
                                    educationId
                                        ? educationBeingEdited.degreeField
                                        : ""
                                }
                            />
                        </section>
                    </section>
                    <section className={styles.educationInfoHorizontal}>
                        <p className={styles.label}>Currently Enrolled</p>
                        <div className={styles.toggleSwitch}>
                            <Toggle
                                name="currentEnrollment"
                                defaultChecked={
                                    educationId
                                        ? educationBeingEdited.currentEnrollment
                                        : false
                                }
                            />
                        </div>
                    </section>
                    <section className={styles.dateInput}>
                        <section className={styles.educationInfo}>
                            <p className={styles.label}>Start Date</p>
                            <input
                                type="date"
                                name="startDate"
                                className={styles.input}
                                defaultValue={
                                    educationId
                                        ? educationBeingEdited.startDate
                                        : new Date().toISOString().split("T")[0]
                                }
                                required
                            />
                        </section>
                        <section className={styles.educationInfo}>
                            <p className={styles.label}>End Date</p>
                            <input
                                type="date"
                                name="endDate"
                                className={styles.input}
                                defaultValue={
                                    educationId
                                        ? educationBeingEdited.endDate.toLowerCase() ===
                                          "present"
                                            ? new Date()
                                                  .toISOString()
                                                  .split("T")[0]
                                            : educationBeingEdited.endDate
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
                        {educationId ? (
                            <section
                                className={styles.horizontalButtonContainer}
                            >
                                <button
                                    type="submit"
                                    className={styles.removeButton}
                                    formAction={removeEducationInfo}
                                >
                                    Remove
                                </button>
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                    formAction={updateEducationInfo}
                                >
                                    Update
                                </button>
                            </section>
                        ) : (
                            <button
                                type="submit"
                                className={styles.saveButton}
                                formAction={addEducationInfo}
                            >
                                Save
                            </button>
                        )}
                    </section>
                </section>
            ) : (
                <section className={styles.educationGrid}>
                    {education.map((education: any, index: number) => {
                        return (
                            <section
                                className={styles.educationItem}
                                key={index}
                            >
                                <section className={styles.educationItemInfo}>
                                    <p className={styles.schoolName}>
                                        {education.schoolName}
                                    </p>
                                    <p className={styles.degreeType}>
                                        {education.degreeType}
                                    </p>
                                    <section className={styles.dateRange}>
                                        <p className={styles.startDate}>
                                            {formatDateMonthYear(
                                                education.startDate
                                            )}
                                            {" - "}
                                        </p>
                                        {education.currentEnrollment ? (
                                            <p className={styles.endDate}>
                                                {education.endDate}
                                            </p>
                                        ) : (
                                            <p className={styles.endDate}>
                                                {formatDateMonthYear(
                                                    education.endDate
                                                )}
                                            </p>
                                        )}
                                    </section>
                                </section>
                                <Link
                                    className={styles.editButton}
                                    href={`/dashboard?menu=profile&addEducation=true&educationId=${education.id}`}
                                >
                                    Edit
                                </Link>
                            </section>
                        );
                    })}
                    <Link
                        href="/dashboard?menu=profile&addEducation=true"
                        className={styles.addEducationButton}
                    >
                        <div className={styles.svgContainer}>{plusIcon}</div>
                    </Link>
                </section>
            )}
            <FormLoading />
        </Card>
    );
};
