"use client";
import styles from "./TemplateMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MenuContainer,
    getAllResumeTemplates,
    updateDocumentArray,
    updateDocument,
} from "@/features/editor";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";

type TemplateMenuProps = {
    document: any;
};

const TemplateMenu = ({ document }: TemplateMenuProps) => {
    const params = useParams();
    const [searchText, setSearchText] = useState("");
    const { documentArray, setDocumentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    const [allTemplates, setAllTemplates] = useState<any>([]);
    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
        if (!doc) return;
        setCurrentDocument(doc);
        const template = getAllResumeTemplates(doc, true);
        // get every key in the template object and store it in an array
        const templateKeys = Object.keys(template);
        // get the previewComponent for each template
        const templateComponents = templateKeys.map((key) => {
            return {
                component:
                    template[key as keyof typeof template].previewComponent,
                key,
                name: template[key as keyof typeof template].name,
            };
        });
        setAllTemplates(templateComponents);
        setCurrentTemplate(
            template[doc.information.template as keyof typeof template]
                ?.previewComponent
        );
    }, [documentArray]);

    /*
        const handleAddSectionClicked = (section: string) => {
        const index = showComponentModal[id as string];
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
        closeComponentModal();
        setSearchContent("");
        return;
    };
    */

    const handleClick = (template: any) => {
        if (!currentDocument) return;
        if (currentDocument.information.template === template.key) return;
        // update the document with the new template
        const updatedDocument = updateDocument(
            currentDocument,
            template.key,
            true
        );
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    return (
        <MenuContainer>
            <motion.section className={styles.searchBarContainer}>
                <motion.div className={styles.searchIconContainer}>
                    {searchIcon}
                </motion.div>
                <motion.input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className={styles.searchBarInput}
                    placeholder="Search Templates"
                />
            </motion.section>
            <motion.section className={styles.templateContainer}>
                <motion.p className={styles.rowTitle}>All Templates</motion.p>
                <motion.section className={styles.templates}>
                    {allTemplates.map((template: any, index: number) => {
                        return (
                            <motion.div
                                key={index}
                                className={styles.template}
                                onClick={() => handleClick(template)}
                            >
                                <motion.div className={styles.templatePreview}>
                                    {template.component}
                                </motion.div>
                                <motion.p className={styles.templateName}>
                                    {template.name}
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </motion.section>
            </motion.section>
        </MenuContainer>
    );
};

export default TemplateMenu;
