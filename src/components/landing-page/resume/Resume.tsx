"use client";
import styles from "./Resume.module.css";
import React, { useState, useEffect, useRef } from "react";
import resumeData from "@lib/landingPageResumeData.json";

const Resume = () => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);
    const education = resumeData.education;
    const skills = resumeData.skills;
    const summary = resumeData.summary;
    const work = resumeData.work;
    const interests = resumeData.interests;
    const languages = resumeData.languages;
    const email = resumeData.contact.email;
    const phone = resumeData.contact.phone;
    const website = resumeData.contact.website;
    const name = resumeData.contact.name;
    const label = resumeData.label;

    useEffect(() => {
        // handle the text scaling
        function handleResize() {
            if (!templateRef.current) return;
            const template: HTMLDivElement = templateRef.current; // Add type assertion here
            if (template) {
                const { width, height } = template.getBoundingClientRect();
                setDivSize({ width, height });
                let size = 11 * (width / 610);
                template.style.fontSize = size + "px";
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getDate = (date: string | number | Date) => {
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
        };

        const res = d.toLocaleString("en-us", options);
        return res === "Invalid Date" ? "Current" : res;
    };

    const horizontalLine = <div className={styles.horizontalLine} />;

    const ImageSection = () => {
        return <div className={styles.imageContainer}></div>;
    };

    const ContactSection = () => {
        return (
            <div
                className={`${styles.verticalBlockSection} ${styles.contactSection}`}
            >
                <h2>Contact</h2>
                {horizontalLine}
                <div className={styles.container}>
                    <div className={styles.contactInfoEntry}>
                        <h3>Email</h3>
                        <p>{email}</p>
                    </div>
                    <div className={styles.contactInfoEntry}>
                        <h3>Phone</h3>
                        <p>{phone}</p>
                    </div>
                    <div className={styles.contactInfoEntry}>
                        <h3>Website</h3>
                        <p>{website}</p>
                    </div>
                </div>
            </div>
        );
    };

    const EducationSection = () => {
        return (
            <div
                className={`${styles.verticalBlockSection} ${styles.educationSection}`}
            >
                <h2>Education</h2>
                {horizontalLine}
                {education.map((school, index) => (
                    <div key={index} className={styles.container}>
                        <p>{getDate(school.endDate)}</p>
                        <h4>{school.area + " " + school.studyType}</h4>
                        <h4>{school.institution}</h4>
                    </div>
                ))}
            </div>
        );
    };

    const InterestsSection = () => {
        return (
            <div className={`${styles.verticalBlockSection}`}>
                <h2>Interests</h2>
                {horizontalLine}
                <div className={styles.container}>
                    {interests.map((interest, index) => (
                        <p key={index}>{interest.name}</p>
                    ))}
                </div>
            </div>
        );
    };

    const LanguagesSection = () => {
        return (
            <div className={`${styles.verticalBlockSection}`}>
                <h2>Languages</h2>
                {horizontalLine}
                <div className={styles.container}>
                    {languages.map((language, index) => (
                        <p key={index}>{language.language}</p>
                    ))}
                </div>
            </div>
        );
    };

    const HeaderSection = () => {
        return (
            <div className={`${styles.rightSection} ${styles.headerSection}`}>
                <h1>{name}</h1>
                <h2>{label}</h2>
            </div>
        );
    };

    const SummarySection = () => {
        return (
            <div className={`${styles.rightSection} ${styles.summarySection}`}>
                <p>{summary}</p>
            </div>
        );
    };

    const ExperienceSection = () => {
        return (
            <div
                className={`${styles.rightSection} ${styles.experienceSection}`}
            >
                <h2>Experience</h2>
                {horizontalLine}
                <div className={styles.container}>
                    {work.map((job, index) => (
                        <div
                            key={index}
                            className={styles.jobProgressBarContainer}
                        >
                            <div className={styles.jobProgressBar}>
                                <div className={styles.circle}></div>
                                <div className={styles.line}></div>
                            </div>
                            <div className={styles.jobContainer}>
                                <h3>
                                    {getDate(job.startDate) + " - "}
                                    {getDate(job.endDate)}
                                </h3>
                                <h4>{job.company}</h4>
                                <h3>{job.position}</h3>

                                <p>{job.summary}</p>
                                <ul>
                                    {job.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const SkillsSection = () => {
        return (
            <div className={`${styles.rightSection} ${styles.skillsSection}`}>
                <h2>Skills</h2>
                {horizontalLine}
                <ul>
                    {skills.map((skill, index) => (
                        <li key={index}>
                            <h3>{skill.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <section className={styles.resumeContainer}>
            <section className={styles.resume} ref={templateRef}>
                <section className={styles.content}>
                    <div className={styles.verticalBlock}>
                        <ImageSection />
                        <ContactSection />
                        <EducationSection />
                        <InterestsSection />
                        <LanguagesSection />
                    </div>
                    <div className={styles.rightContainer}>
                        <HeaderSection />
                        <SummarySection />
                        <ExperienceSection />
                        <SkillsSection />
                    </div>
                </section>
            </section>
        </section>
    );
};

export default Resume;
