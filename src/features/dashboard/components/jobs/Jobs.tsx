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
} from "@/features/editor";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useState } from "react";
import { basicLeftArrow } from "@/components/icons/iconSVG";

type JobsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
    documents: any[];
};

type Job = {
    companyName: string;
    jobName: string;
    resume: any;
    coverLetter: any;
};

const Jobs = ({ currentUser, searchParams, documents }: JobsProps) => {
    const [job, setJob] = useState<Job>({
        companyName: "",
        jobName: "",
        resume: null,
        coverLetter: null,
    });

    const addResumeButton = (
        <Link
            href={UpdateUrl(
                searchParams ? searchParams : {},
                [{ key: "createJob", value: "true" }],
                "/dashboard"
            )}
        >
            Add job
        </Link>
    );

    const resumeTemplates = job.resume
        ? getAllResumeTemplates(job.resume, false)
        : null;
    const coverLetterTemplates = job.coverLetter
        ? getAllCoverLetterTemplates(job.coverLetter, false)
        : null;

    return (
        <main className={styles.container}>
            {job.resume !== null ? (
                <DashboardCard key="job-manage-card" title="Manage Job">
                    <section className={styles.manageContainer}>
                        <button
                            className={styles.backButton}
                            onClick={() =>
                                setJob({
                                    companyName: "",
                                    jobName: "",
                                    resume: null,
                                    coverLetter: null,
                                })
                            }
                        >
                            {basicLeftArrow}
                            Back
                        </button>
                        <section className={styles.titleContainer}>
                            <section className={styles.labelItem}>
                                <p className={styles.label}>Company Name</p>
                                <p className={styles.jobTitle}>
                                    {job.companyName}
                                </p>
                            </section>
                            <section className={styles.labelItem}>
                                <p className={styles.label}>Job Title</p>
                                <p className={styles.jobName}>{job.jobName}</p>
                            </section>
                        </section>
                        <section className={styles.resumesContainer}>
                            {resumeTemplates && (
                                <DocumentCard
                                    key="resume-card"
                                    doc={job.resume}
                                    type="resume"
                                    templates={resumeTemplates}
                                />
                            )}
                            {coverLetterTemplates && (
                                <DocumentCard
                                    key="cover-letter-card"
                                    doc={job.coverLetter}
                                    type="cover-letter"
                                    templates={coverLetterTemplates}
                                />
                            )}
                        </section>
                    </section>
                </DashboardCard>
            ) : (
                <DashboardCard key="jobs-card" title="Your Jobs">
                    {addResumeButton}
                    {documents.length > 0 && (
                        <DocumentCardDisplay
                            searchParams={searchParams}
                            documents={documents}
                            type="job"
                            setJob={setJob}
                        />
                    )}
                </DashboardCard>
            )}
        </main>
    );
};

export default Jobs;
