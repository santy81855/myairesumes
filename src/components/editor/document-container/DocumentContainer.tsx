"use client";
import styles from "./DocumentContainer.module.css";
import Basic from "@/components/resume-templates/basic/Basic";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/providers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type DocumentContainerProps = {
    resume: any;
};

const DocumentContainer = ({ resume }: DocumentContainerProps) => {
    const id = resume.id;
    const { resumeInformation, setResumeInformation, setResumeId, resumeId } =
        useAppContext();
    useEffect(() => {
        // check if the resume is already in the local storage under its id as the key, if not, save it
        if (!localStorage.getItem(id)) {
            localStorage.setItem(id, JSON.stringify(resume.information));
        }
        setResumeId(id);
        setResumeInformation(resume.information);
    }, []);

    return (
        <section className={styles.documentContainer}>
            <section className={styles.document}>
                <DndProvider backend={HTML5Backend}>
                    <Basic id={id} resume={resume.information} />
                </DndProvider>
            </section>
        </section>
    );
};

export default DocumentContainer;
