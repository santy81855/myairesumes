"use client";
import styles from "./SectionMenu.module.css";
import { cancelIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";
import {
    updateDocumentArray,
    allSections,
    getReadableSectionName,
} from "@/lib/document";
import PageCounter from "../../page-util-bar/page-counter/PageCounter";
import Page from "@/app/pricing/page";

const StyleMenu = () => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const params = useParams();
    const [document, setDocument] = useState<any>(null);
    useEffect(() => {
        setDocument(
            documentArray.find((document) => document.id === params.id)
        );
    }, [documentArray]);

    const handleAddSectionClick = (index: number) => {
        //setClickedIndex(index);
        setShowComponentModal({
            ...showComponentModal,
            [params.id as string]: index,
        });
    };

    const sectionMenuClicked = (e: any) => {
        // if it is a button or a select or an option, do not close the menu
        if (
            e.target.tagName === "BUTTON" ||
            e.target.tagName === "SELECT" ||
            e.target.tagName === "OPTION"
        )
            return;
        setClickedIndex(-1);
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

    const handleOptionClicked = (section: string, index: number) => {
        // add given section at given index in the sectionOrder array of the document and update the documentArray
        if (!document) return;
        const currentPageIndex = document.currentPage - 1;
        let newSectionOrder = [...document.information.sectionOrder];
        // add section at index
        newSectionOrder[currentPageIndex].splice(index, 0, section);
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
        setClickedIndex(-1);
        return;
    };

    return (
        <motion.section
            className={styles.container}
            onClick={sectionMenuClicked}
        >
            <motion.p className={styles.title}>Sections</motion.p>
            <motion.p className={styles.description}>
                Add or remove sections from your document.
            </motion.p>
            {document && (
                <>
                    <motion.section className={styles.pageFunctionContainer}>
                        <PageCounter documentId={params.id as string} />
                    </motion.section>
                    <motion.div className={styles.horizontalLine}></motion.div>

                    <motion.section className={styles.sectionContainer}>
                        {clickedIndex === 0 ? (
                            <motion.select
                                className={styles.dropdown}
                                onChange={(e) =>
                                    handleOptionClicked(e.target.value, 0)
                                }
                            >
                                <motion.option value="">
                                    Select a section to add
                                </motion.option>
                                {allSections.map(
                                    (section: string, innerIndex: number) => (
                                        <motion.option value={section}>
                                            {getReadableSectionName(section)}
                                        </motion.option>
                                    )
                                )}
                            </motion.select>
                        ) : (
                            <motion.button
                                title="add section here"
                                className={styles.addSectionButton}
                                onClick={() => handleAddSectionClick(0)}
                            >
                                +
                            </motion.button>
                        )}
                        {document.information.sectionOrder[
                            document.currentPage - 1
                        ].map((section: string, index: number) => (
                            <motion.section className={styles.sectionItem}>
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
                                        {cancelIcon}
                                    </motion.button>
                                    <motion.p className={styles.sectionText}>
                                        {getReadableSectionName(section)}
                                    </motion.p>
                                </motion.section>
                                {clickedIndex === index + 1 ? (
                                    <motion.select
                                        className={styles.dropdown}
                                        onChange={(e) =>
                                            handleOptionClicked(
                                                e.target.value,
                                                index + 1
                                            )
                                        }
                                    >
                                        <motion.option value="">
                                            Select a section to add
                                        </motion.option>
                                        {allSections.map(
                                            (
                                                section: string,
                                                innerIndex: number
                                            ) => (
                                                <motion.option value={section}>
                                                    {getReadableSectionName(
                                                        section
                                                    )}
                                                </motion.option>
                                            )
                                        )}
                                    </motion.select>
                                ) : (
                                    <motion.button
                                        title="add section here"
                                        className={styles.addSectionButton}
                                        onClick={() =>
                                            handleAddSectionClick(index + 1)
                                        }
                                    >
                                        +
                                    </motion.button>
                                )}
                            </motion.section>
                        ))}
                    </motion.section>
                </>
            )}
        </motion.section>
    );
};

export default StyleMenu;
