"use client";
import styles from "./SectionMenu.module.css";
import {
    circledXIcon,
    circledXFilledIcon,
    sectionIcon,
} from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";
import {
    PageCounter,
    updateDocumentArray,
    SectionConfig,
} from "@/features/editor";
import { MenuContainer } from "@/features/editor";

type SectionMenuProps = {
    document: any;
};

const StyleMenu = ({ document }: SectionMenuProps) => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();
    const params = useParams();
    const id = params.slug[1];
    const [allSections, setAllSections] = useState<any>([]);
    useEffect(() => {
        const doc = documentArray.find((document) => document.id === id);
        if (!doc) return;
        const sectionConfig = SectionConfig(
            document,
            null,
            "",
            doc.information.template
        );
        setAllSections(sectionConfig);
    }, [documentArray]);

    const handleAddSectionClick = (index: number) => {
        setShowComponentModal({
            ...showComponentModal,
            [id as string]: index,
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
        <MenuContainer>
            <motion.section className={styles.titleContainer}>
                <motion.div className={styles.iconContainer}>
                    {sectionIcon}
                </motion.div>
                <motion.p className={styles.title}>Sections</motion.p>
            </motion.section>
            <motion.p className={styles.description}>
                Add or remove sections from your document.
            </motion.p>
            <motion.div className={styles.horizontalLine}></motion.div>
            {document && (
                <>
                    <motion.section className={styles.pageFunctionContainer}>
                        <PageCounter
                            documentId={id as string}
                            fullWidth={true}
                        />
                    </motion.section>

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
                        ].map((section: string, index: number) => {
                            if (section === "colBreak") return null;
                            return (
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
                                        <motion.p
                                            className={styles.sectionText}
                                        >
                                            {allSections[section]?.name}
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
                            );
                        })}
                    </motion.section>
                </>
            )}
        </MenuContainer>
    );
};

export default StyleMenu;
