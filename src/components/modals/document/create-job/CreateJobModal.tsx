"use client";
import styles from "./CreateJobModal.module.css";
import Link from "next/link";
import { coloredJobIcon, jobIcon } from "@/components/icons/iconSVG";
import FormLoading from "@/components/form-loading/FormLoading";
import { createJobAction } from "@/features/editor";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { jobCardColorArray } from "@/features/dashboard";

type UpgradeModalProps = {
    returnUrl: string;
    user: any;
};
const CreateJobModal = ({ returnUrl, user }: UpgradeModalProps) => {
    const router = useRouter();
    const [showDescription, setShowDescription] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [coverLetterChecked, setCoverLetterChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target;
        const formData = new FormData(form);
        formData.append("color", jobCardColorArray[selectedColorIndex]);
        try {
            await createJobAction(formData);
            setIsLoading(false);
            toast.success("Job created successfully.");
        } catch (error) {
            toast.error("Error creating job. Try again.");
            setIsLoading(false);
        }
    };

    return (
        <section id="modalContainer" className={styles.modalContainer}>
            <section id="modalContent" className={styles.modal}>
                {isLoading && <LoadingScreen />}
                <section className={styles.container}>
                    <div className={styles.iconContainer}>{coloredJobIcon}</div>

                    <h1 className={styles.title}>
                        Start a new job application
                    </h1>
                    <section className={styles.benefitsContainer}>
                        <p className={styles.subTitle}>
                            Get started by filling out a few basic details about
                            this job to make it <span>easy</span> to find later.
                        </p>
                    </section>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <section className={styles.inputContainer}>
                            <p className={styles.label}>Color</p>
                            <section className={styles.colorContainer}>
                                {jobCardColorArray.map(
                                    (color: string, index: number) => (
                                        <div
                                            key={index}
                                            id={`color${index}`}
                                            className={`${styles.colorItem} ${
                                                index === selectedColorIndex
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => {
                                                setSelectedColorIndex(index);
                                            }}
                                        />
                                    )
                                )}
                            </section>
                        </section>
                        <section className={styles.inputRow}>
                            <section className={styles.inputContainer}>
                                <label
                                    htmlFor="companyName"
                                    className={styles.label}
                                >
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    placeholder="E.g. XYZ Company"
                                    className={styles.input}
                                    required
                                />
                            </section>
                            <section className={styles.inputContainer}>
                                <label htmlFor="job" className={styles.label}>
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="job"
                                    id="job"
                                    placeholder="E.g. Data analyst"
                                    className={styles.input}
                                    required
                                />
                            </section>
                        </section>
                        <section className={styles.inputRow}>
                            <section className={styles.inputContainer}>
                                <label
                                    htmlFor="resumeName"
                                    className={styles.label}
                                >
                                    Resume Name
                                </label>
                                <input
                                    type="text"
                                    name="resumeName"
                                    id="resumeName"
                                    defaultValue={
                                        user.firstName +
                                        "-" +
                                        user.lastName +
                                        "-Resume"
                                    }
                                    placeholder="E.g. XYZ-Company-Resume"
                                    className={styles.input}
                                    required
                                />
                            </section>
                            <section className={styles.inputContainer}>
                                <section className={styles.checkboxContainer}>
                                    <label
                                        htmlFor="coverLetter"
                                        className={`${styles.label} ${
                                            !coverLetterChecked &&
                                            styles.inactive
                                        }
                                        }`}
                                    >
                                        Cover Letter
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="coverLetter"
                                        id="coverLetter"
                                        className={styles.checkboxItem}
                                        onChange={() =>
                                            setCoverLetterChecked(
                                                !coverLetterChecked
                                            )
                                        }
                                        checked={coverLetterChecked}
                                    />
                                </section>
                                <input
                                    type="text"
                                    name="coverLetterName"
                                    id="coverLetterName"
                                    placeholder="E.g. XYZ-Company-Cover-Letter"
                                    className={`${styles.input} ${
                                        !coverLetterChecked && styles.inactive
                                    }`}
                                    disabled={!coverLetterChecked}
                                    defaultValue={
                                        user.firstName +
                                        "-" +
                                        user.lastName +
                                        "-Cover-Letter"
                                    }
                                />
                            </section>
                        </section>
                        <section className={styles.inputContainer}>
                            <section className={styles.checkboxContainer}>
                                <label
                                    htmlFor="jobDescription"
                                    className={`${styles.label} ${
                                        !showDescription && styles.inactive
                                    }`}
                                >
                                    Job Post Description
                                </label>
                                <input
                                    type="checkbox"
                                    name="jobDescription"
                                    id="jobDescription"
                                    className={styles.checkboxItem}
                                    onChange={() =>
                                        setShowDescription(!showDescription)
                                    }
                                    checked={showDescription}
                                />
                            </section>

                            <textarea
                                name="description"
                                id="description"
                                placeholder="E.g. Paste the job posting here."
                                className={`${styles.textArea} ${
                                    !showDescription && styles.inactive
                                }`}
                                disabled={!showDescription}
                            />
                        </section>
                        <section className={styles.buttonContainer}>
                            <Link
                                href={returnUrl}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </Link>
                            <button type="submit" className={styles.button}>
                                Continue
                            </button>
                        </section>
                        <FormLoading />
                    </form>
                </section>
            </section>
        </section>
    );
};

export default CreateJobModal;
