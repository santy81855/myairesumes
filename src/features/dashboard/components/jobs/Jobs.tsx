"use client";
import styles from "./Jobs.module.css";
import Link from "next/link";
import { UpdateUrl } from "@/lib/updateUrl";
import {
    DashboardCard,
    DocumentCardDisplay,
    DocumentCard,
} from "@/features/dashboard";
import {
    getAllCoverLetterTemplates,
    getAllResumeTemplates,
    updateJobAction,
    deleteJobAction,
} from "@/features/editor";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useState, useEffect } from "react";
import {
    basicLeftArrow,
    downArrowIcon,
    upArrowIcon,
    plusIcon,
    minusIcon,
    plusIconCircled,
} from "@/components/icons/iconSVG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

type JobsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
};

type Job = {
    id: string;
    companyName: string;
    jobName: string;
    resume: any;
    coverLetter: any;
    color: string;
    information: {
        jobDescription: string;
        notes: string[];
    };
};

const Jobs = ({ currentUser, searchParams, documents }: JobsProps) => {
    const [job, setJob] = useState<Job>({
        id: "",
        companyName: "",
        jobName: "",
        resume: null,
        coverLetter: null,
        color: "",
        information: {
            jobDescription: "",
            notes: [],
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [editJobDescription, setEditJobDescription] = useState(false);
    const [jobDescription, setJobDescription] = useState(
        job.information?.jobDescription
    );

    useEffect(() => {
        if (job.id !== "") {
            setJobDescription(job.information?.jobDescription);
        } else {
            setJobDescription("");
        }
        setShowDescription(false);
        setIsEditing(false);
        setEditJobDescription(false);
    }, [job]);

    const resumeTemplates = job.resume
        ? getAllResumeTemplates(job.resume, false)
        : null;
    const coverLetterTemplates = job.coverLetter
        ? getAllCoverLetterTemplates(job.coverLetter, false)
        : null;

    const handleUpdateInfo = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                companyName: job.companyName,
                jobName: job.jobName,
            };
            await updateJobAction(job.id, data);
            setIsEditing(false);
            setIsLoading(false);
            toast.success("Job information updated");
        } catch (error) {
            toast.error("Error updating job information");
            setIsLoading(false);
        }
    };

    const handleDeleteJob = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await deleteJobAction(job.id);
            setIsLoading(false);
            setJob({
                id: "",
                companyName: "",
                jobName: "",
                resume: null,
                coverLetter: null,
                color: "",
                information: {
                    jobDescription: "",
                    notes: [],
                },
            });
            toast.success("Job deleted successfully.");
        } catch (error) {
            toast.error("Error deleting job.");
            setIsLoading(false);
        }
    };

    const handleUpdateColor = async (e: any, color: string) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                color: color,
            };
            await updateJobAction(job.id, data);
            toast.success("Job color updated.");
            setJob({ ...job, color: color });
            setIsLoading(false);
        } catch (error) {
            toast.error("Error updating job information.");
            setIsLoading(false);
        }
    };

    const handleUpdateJobDescription = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                information: {
                    jobDescription: jobDescription,
                    notes: job.information?.notes,
                },
            };
            await updateJobAction(job.id, data);
            setJob({
                ...job,
                information: {
                    jobDescription: jobDescription,
                    notes: job.information?.notes,
                },
            });
            setEditJobDescription(false);
            setIsLoading(false);
            toast.success("Job description updated.");
        } catch (error) {
            toast.error("Error updating job description.");
            setIsLoading(false);
        }
    };

    const colorOptions = [
        "#4CAF50",
        "#F44336",
        "#2196F3",
        "#FFEB3B",
        "#FF9800",
        "#9C27B0",
        "#009688",
        "#E91E63",
        "#3F51B5",
        "#00BCD4",
    ];

    return (
        <main className={styles.container}>
            {job.id !== "" ? (
                <DashboardCard key="job-manage-card" title="Manage Job">
                    {isLoading && <LoadingScreen />}
                    <section className={styles.manageContainer}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() =>
                                setJob({
                                    id: "",
                                    companyName: "",
                                    jobName: "",
                                    resume: null,
                                    coverLetter: null,
                                    color: "",
                                    information: {
                                        jobDescription: "",
                                        notes: [],
                                    },
                                })
                            }
                        >
                            {basicLeftArrow}
                            Back
                        </button>
                        <section className={styles.editContainer}>
                            {!isEditing && (
                                <button
                                    className={styles.editButton}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            )}
                            <section className={styles.titleContainer}>
                                <section className={styles.topRow}>
                                    <h1 className={styles.title}>
                                        {isEditing
                                            ? "Edit Job Information"
                                            : "Job Information"}
                                    </h1>
                                    {!isEditing && (
                                        <div
                                            className={styles.color}
                                            style={{
                                                backgroundColor: job.color,
                                            }}
                                            onClick={() =>
                                                setShowColors(!showColors)
                                            }
                                        >
                                            {showColors && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "auto" }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className={
                                                        styles.colorOptions
                                                    }
                                                >
                                                    {colorOptions.map(
                                                        (
                                                            color: string,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                key={color}
                                                                className={`${
                                                                    styles.colorOption
                                                                } ${
                                                                    job.color ===
                                                                    color
                                                                        ? styles.selected
                                                                        : ""
                                                                }`}
                                                                style={{
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                                onClick={(
                                                                    e: any
                                                                ) => {
                                                                    handleUpdateColor(
                                                                        e,
                                                                        color
                                                                    );
                                                                    setShowColors(
                                                                        false
                                                                    );
                                                                }}
                                                            ></div>
                                                        )
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </section>
                                {isEditing ? (
                                    <>
                                        <section className={styles.labelItem}>
                                            <label
                                                htmlFor="companyName"
                                                className={styles.label}
                                            >
                                                Company Name
                                            </label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                id="companyName"
                                                value={job.companyName}
                                                onChange={(e) =>
                                                    setJob({
                                                        ...job,
                                                        companyName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </section>
                                        <section className={styles.labelItem}>
                                            <label
                                                htmlFor="job"
                                                className={styles.label}
                                            >
                                                Job Title
                                            </label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                id="job"
                                                value={job.jobName}
                                                onChange={(e) =>
                                                    setJob({
                                                        ...job,
                                                        jobName: e.target.value,
                                                    })
                                                }
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.editButtonContainer
                                            }
                                        >
                                            <button
                                                title="Cancel"
                                                className={styles.cancelButton}
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                title="Save Changes"
                                                className={styles.saveButton}
                                                onClick={handleUpdateInfo}
                                            >
                                                Update
                                            </button>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <section className={styles.labelItem}>
                                            <p className={styles.label}>
                                                Company Name
                                            </p>
                                            <p className={styles.jobTitle}>
                                                {job.companyName}
                                            </p>
                                        </section>
                                        <section className={styles.labelItem}>
                                            <p className={styles.label}>
                                                Job Title
                                            </p>
                                            <p className={styles.jobName}>
                                                {job.jobName}
                                            </p>
                                        </section>
                                    </>
                                )}
                            </section>
                        </section>
                        <section className={styles.resumesContainer}>
                            {resumeTemplates ? (
                                <DocumentCard
                                    key="resume-card"
                                    doc={job.resume}
                                    type="resume"
                                    templates={resumeTemplates}
                                />
                            ) : (
                                <section
                                    className={styles.addDocumentContainer}
                                >
                                    <Link
                                        href={UpdateUrl(
                                            searchParams ? searchParams : {},
                                            [
                                                {
                                                    key: "createResume",
                                                    value: "true",
                                                },
                                            ],
                                            "/dashboard"
                                        )}
                                        className={styles.addItemButton}
                                    >
                                        {plusIconCircled}
                                        <p>Add Resume</p>
                                    </Link>
                                </section>
                            )}
                            {coverLetterTemplates ? (
                                <DocumentCard
                                    key="cover-letter-card"
                                    doc={job.coverLetter}
                                    type="cover-letter"
                                    templates={coverLetterTemplates}
                                />
                            ) : (
                                <section
                                    className={styles.addDocumentContainer}
                                >
                                    <Link
                                        href={UpdateUrl(
                                            searchParams ? searchParams : {},
                                            [
                                                {
                                                    key: "createCoverLetter",
                                                    value: "true",
                                                },
                                            ],
                                            "/dashboard"
                                        )}
                                        className={styles.addItemButton}
                                    >
                                        {plusIconCircled}
                                        <p>Add Cover Letter</p>
                                    </Link>
                                </section>
                            )}
                        </section>
                        <motion.section
                            className={styles.jobDescriptionContainer}
                            initial={{ height: "3rem" }}
                            animate={{
                                height: showDescription ? "auto" : "4rem",
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <section className={styles.jobDescriptionCheckbox}>
                                <label
                                    htmlFor="description"
                                    className={styles.jobDescriptionLabel}
                                >
                                    Job Description
                                </label>
                                {job.information?.jobDescription ? (
                                    <section
                                        className={styles.checkboxContainer}
                                        onClick={() =>
                                            setShowDescription(!showDescription)
                                        }
                                    >
                                        {showDescription
                                            ? upArrowIcon
                                            : downArrowIcon}
                                    </section>
                                ) : (
                                    <section
                                        title="Add a job description."
                                        className={styles.checkboxContainer}
                                        onClick={() => {
                                            setShowDescription(
                                                !showDescription
                                            );
                                            setEditJobDescription(true);
                                        }}
                                    >
                                        {showDescription ? minusIcon : plusIcon}
                                    </section>
                                )}
                            </section>
                            {job.information?.jobDescription &&
                            !editJobDescription ? (
                                <section className={styles.labelItem}>
                                    <button
                                        type="button"
                                        className={styles.editButton}
                                        onClick={() => {
                                            setJobDescription(
                                                job.information?.jobDescription
                                            );
                                            setEditJobDescription(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <motion.p className={styles.jobDescription}>
                                        {job.information?.jobDescription}
                                    </motion.p>
                                </section>
                            ) : (
                                <>
                                    <textarea
                                        id="newDescription"
                                        className={styles.textArea}
                                        placeholder="Paste the job description here."
                                        value={jobDescription}
                                        onChange={(e) =>
                                            setJobDescription(e.target.value)
                                        }
                                    />
                                    <section
                                        className={styles.editButtonContainer}
                                    >
                                        <button
                                            type="button"
                                            title="Cancel"
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                setEditJobDescription(false);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            title="Save"
                                            className={styles.saveButton}
                                            onClick={handleUpdateJobDescription}
                                        >
                                            Save
                                        </button>
                                    </section>
                                </>
                            )}
                        </motion.section>
                        <section className={styles.deleteButtonContainer}>
                            <button
                                title="Delete Job"
                                className={styles.deleteButton}
                                onClick={handleDeleteJob}
                            >
                                Delete Job
                            </button>
                        </section>
                    </section>
                </DashboardCard>
            ) : (
                <DashboardCard key="jobs-card" title="Your Jobs">
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [{ key: "createJob", value: "true" }],
                            "/dashboard"
                        )}
                        className={styles.addItemButton}
                    >
                        {plusIconCircled}
                        <p>Create New Job</p>
                    </Link>
                    {documents.length > 0 ? (
                        <DocumentCardDisplay
                            searchParams={searchParams}
                            documents={documents}
                            type="job"
                            setJob={setJob}
                        />
                    ) : (
                        <p className={styles.noJobs}>
                            You don't have any jobs yet. Click the button above
                            to create a new job.
                        </p>
                    )}
                </DashboardCard>
            )}
        </main>
    );
};

export default Jobs;
