"use client";
import styles from "./SectionMenu.module.css";
import { circledXIcon, circledXFilledIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";
import {
    PageCounter,
    updateDocumentArray,
    SectionConfig,
} from "@/features/editor";

const StyleMenu = () => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    const [allSections, setAllSections] = useState<any>([]);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.id)
        );
        const sectionConfig = SectionConfig(
            document,
            null,
            "",
            documentArray.find((document) => document.id === params.id)
        );
        // tempArr is an object where all the keys are the section names
        setAllSections(sectionConfig);
    }, [documentArray, params.id]);

    const handleAddSectionClick = (index: number) => {
        setShowComponentModal({
            ...showComponentModal,
            [params.id as string]: index,
        });
    };
    const handleRemoveSectionClick = (index: number) => {
        if (!document) return;
        const currentPageIndex = document.currentPage - 1;
        let newSectionOrder = [...document.information.sectionOrder];
        // remove section at index
        newSectionOrder[currentPageIndex].splice(index, 1);
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                sectionOrder: newSectionOrder,
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        return;
    };

    return (
        <motion.section className={styles.container}>
            <motion.p className={styles.title}>Sections</motion.p>
            <motion.p className={styles.description}>
                Add or remove sections from your document.
            </motion.p>
            {document && (
                <>
                    <motion.section className={styles.pageFunctionContainer}>
                        <PageCounter
                            documentId={params.id as string}
                            fullWidth={true}
                        />
                    </motion.section>
                    <motion.div className={styles.horizontalLine}></motion.div>

                    <motion.section className={styles.sectionContainer}>
                        <motion.button
                            title="add section here"
                            className={styles.addSectionButton}
                            onClick={() => handleAddSectionClick(0)}
                        >
                            +
                        </motion.button>
                        {document.information.sectionOrder[
                            document.currentPage - 1
                        ].map((section: string, index: number) => (
                            <motion.section
                                className={styles.sectionItem}
                                key={index}
                            >
                                <motion.section
                                    key={section}
                                    className={styles.section}
                                >
                                    <motion.button
                                        className={styles.deleteButton}
                                        title="remove section"
                                        onClick={() => {
                                            handleRemoveSectionClick(index);
                                        }}
                                    >
                                        {circledXFilledIcon}
                                    </motion.button>
                                    <motion.p className={styles.sectionText}>
                                        {allSections[section].name}
                                    </motion.p>
                                </motion.section>
                                <motion.button
                                    title="add section here"
                                    className={styles.addSectionButton}
                                    onClick={() =>
                                        handleAddSectionClick(index + 1)
                                    }
                                >
                                    +
                                </motion.button>
                            </motion.section>
                        ))}
                    </motion.section>
                </>
            )}
        </motion.section>
    );
};

export default StyleMenu;
