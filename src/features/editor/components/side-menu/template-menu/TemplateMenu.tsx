"use client";
import styles from "./TemplateMenu.module.css";
import { searchIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MenuContainer,
    getAllResumeTemplates,
    getAllCoverLetterTemplates,
    updateDocumentArray,
    updateDocument,
    updateCoverLetter,
} from "@/features/editor";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";

type TemplateMenuProps = {
    document: any;
};

const TemplateMenu = ({ document }: TemplateMenuProps) => {
    const params = useParams();
    const type = params.slug[0];
    const [searchText, setSearchText] = useState("");
    const { documentArray, setDocumentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    const [allTemplates, setAllTemplates] = useState<any>([]);
    const [allKeywords, setAllKeywords] = useState<string[]>([]);
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
        if (!doc) return;
        setCurrentDocument(doc);
        const template =
            type === "resume"
                ? getAllResumeTemplates(doc, true)
                : getAllCoverLetterTemplates(doc, true);
        // get every key in the template object and store it in an array
        const uniqueKeys = Object.keys(template);
        const uniqueKeywords = new Set<string>();
        // get the previewComponent for each template
        const templateComponents = uniqueKeys.map((key) => {
            template[key as keyof typeof template].keywords.forEach(
                (keyword: string) => {
                    uniqueKeywords.add(keyword);
                }
            );
            return {
                component:
                    template[key as keyof typeof template].previewComponent,
                key,
                name: template[key as keyof typeof template].name,
                keywords: template[key as keyof typeof template].keywords,
            };
        });
        setAllKeywords(Array.from(uniqueKeys));
        setResults(templateComponents);
        setAllTemplates(templateComponents);
        setCurrentTemplate(
            template[doc.information.template as keyof typeof template]
                ?.previewComponent
        );
    }, [documentArray]);

    const handleClick = (template: any) => {
        if (!currentDocument) return;
        if (currentDocument.information.template === template.key) return;
        // update the document with the new template
        const updatedDocument =
            type === "resume"
                ? updateDocument(currentDocument, template.key, true)
                : updateCoverLetter(currentDocument, template.key, true);
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const searchContentChanged = (content: string) => {
        setSearchText(content);
        if (content === "") {
            setResults(allTemplates);
            return;
        }
        const tempArray = [...allTemplates];
        const results = tempArray.filter((item: { keywords: string[] }) =>
            // check if each word of the content is one of hte keywords
            content
                .split(" ")
                .every((word) =>
                    item.keywords.some((keyword) =>
                        keyword.toLowerCase().includes(word.toLowerCase())
                    )
                )
        );
        // make the results be in alphabetical order by name
        results.sort((a, b) => a.name.localeCompare(b.name));
        setResults(results);
        console.log(results);
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
                    onChange={(e) => searchContentChanged(e.target.value)}
                    className={styles.searchBarInput}
                    placeholder="Search Templates"
                />
            </motion.section>
            <motion.section className={styles.keywordContainer}>
                {allKeywords.map((keyword, index) => {
                    return (
                        <motion.div key={index} className={styles.keywordItem}>
                            <motion.p className={styles.keyword}>
                                {keyword}
                            </motion.p>
                        </motion.div>
                    );
                })}
            </motion.section>
            <motion.section className={styles.grid}>
                {results.map((template: any, index: number) => {
                    return (
                        <motion.div
                            key={index}
                            className={styles.template}
                            onClick={() => handleClick(template)}
                        >
                            <motion.div className={styles.templatePreview}>
                                {template.component}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.section>
        </MenuContainer>
    );
};

export default TemplateMenu;
