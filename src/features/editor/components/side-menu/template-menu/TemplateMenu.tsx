"use client";
import styles from "./TemplateMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MenuContainer, getAllResumeTemplates } from "@/features/editor";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";

type TemplateMenuProps = {
    document: any;
};

const TemplateMenu = ({ document }: TemplateMenuProps) => {
    const params = useParams();
    const [searchText, setSearchText] = useState("");
    const { documentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    const [allTemplates, setAllTemplates] = useState<any>([]);
    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
        if (!doc) return;
        setCurrentDocument(doc);
        const template = getAllResumeTemplates(doc);
        // get every key in the template object and store it in an array
        const templateKeys = Object.keys(template);
        // get the previewComponent for each template
        const templateComponents = templateKeys.map((key) => {
            return {
                component:
                    template[key as keyof typeof template].previewComponent,
                key,
            };
        });
        setAllTemplates(templateComponents);
        setCurrentTemplate(
            template[doc.information.template as keyof typeof template]
                ?.previewComponent
        );
    }, [documentArray]);
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
                            <motion.div key={index} className={styles.template}>
                                <motion.div className={styles.templatePreview}>
                                    {template.component}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.section>
            </motion.section>
        </MenuContainer>
    );
};

export default TemplateMenu;
