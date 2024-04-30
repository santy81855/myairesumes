"use client";
import styles from "./Resume.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
} from "@/features/editor";
import { sampleResumesArray } from "@/features/authentication";

const variants = {
    enter: (direction: number) => {
        // make the object rotate when it's entering
        return {
            x: 500,
            rotate: 90,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        rotate: 0,
        x: 0,
        opacity: 1,
    },
};

const Resume = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [resumeComponents, setResumeComponents] = useState(
        sampleResumesArray.map((resume, index) => {
            const template = getAllResumeTemplates(resume, true);
            return (
                <div className={styles.template} key={index}>
                    <div className={styles.templatePreview}>
                        {
                            template[
                                resume.information
                                    .template as keyof typeof template
                            ].previewComponent
                        }
                    </div>
                </div>
            );
        })
    );
    const imageIndex = wrap(0, resumeComponents.length, page);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            paginate(1);
        }, 2000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [page]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    function wrap(min: number, max: number, value: number) {
        const range = max - min;
        return ((((value - min) % range) + range) % range) + min;
    }
    const getPreviousIndex = () => {
        const range = resumeComponents.length;
        var index = imageIndex;
        if (imageIndex === 0) {
            index = range - 1;
        }
        if (imageIndex > 0) {
            index = imageIndex - 1;
        }
        return index;
    };
    // create a motion div with a <p> element inside
    return (
        <section className={styles.container}>
            <div className={styles.staticTemplate}>
                <div className={styles.templatePreview}>
                    {resumeComponents[getPreviousIndex()]}
                </div>
            </div>
            <motion.div
                key={page}
                variants={variants}
                initial="enter"
                animate="center"
                transition={{
                    x: {
                        type: "spring",
                        stiffness: 180,
                        damping: 23,
                    },
                    rotate: { duration: 0.4 },
                    opacity: { duration: 0.2 },
                }}
                className={styles.staticTemplate}
            >
                <div className={styles.templatePreview}>
                    {resumeComponents[imageIndex]}
                </div>
            </motion.div>
        </section>
    );
};

export default Resume;
