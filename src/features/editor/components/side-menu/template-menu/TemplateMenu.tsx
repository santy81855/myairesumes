"use client";
import styles from "./TemplateMenu.module.css";
import {
    searchIcon,
    forwardArrow,
    backArrow,
    templateIcon,
    basicLeftArrow,
    basicRightArrow,
    lockIcon,
} from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
    user: any;
};

const TemplateMenu = ({ document, user }: TemplateMenuProps) => {
    const keyWordContainerRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const type = params.slug[0];
    const [searchText, setSearchText] = useState("");
    const { documentArray, setDocumentArray } = useAppContext();
    const [currentDocument, setCurrentDocument] = useState<any>(null);
    const [currentTemplate, setCurrentTemplate] = useState<any>(null);
    const [allTemplates, setAllTemplates] = useState<any>([]);
    const [allKeywords, setAllKeywords] = useState<string[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        const doc = documentArray.find(
            (currentDocument) => currentDocument.id === params.slug[1]
        );
        if (!doc) return;
        const template =
            type === "resume"
                ? getAllResumeTemplates(doc, true)
                : getAllCoverLetterTemplates(doc, true);
        // get every key in the template object and store it in an array
        const keys = Object.keys(template);
        const uniqueKeywords = new Set<string>();
        // get the previewComponent for each template
        const templateComponents = keys.map((key: any) => {
            template[key as keyof typeof template].keywords.forEach(
                (keyword: string) => {
                    if (
                        keyword !==
                        template[
                            key as keyof typeof template
                        ].name.toLowerCase()
                    ) {
                        // add the keyword but with a capital first letter
                        uniqueKeywords.add(
                            keyword.charAt(0).toUpperCase() + keyword.slice(1)
                        );
                    }
                }
            );
            return {
                component:
                    template[key as keyof typeof template].previewComponent,
                key,
                name: template[key as keyof typeof template].name,
                keywords: template[key as keyof typeof template].keywords,
                description: template[key as keyof typeof template].description,
            };
        });
        setAllKeywords(Array.from(uniqueKeywords));
        setAllTemplates(templateComponents);
        setResults(templateComponents);
        setCurrentTemplate(
            template[doc.information.template as keyof typeof template]
        );
        setCurrentDocument(doc);
    }, [documentArray]);

    const searchContentChanged = (content: string) => {
        setSearchText(content);
        if (content === "" || content === "all") {
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
        setResults(results);
    };

    const handleClick = (template: any) => {
        if (!currentDocument) return;
        if (currentDocument.information.template === template.key) return;
        if (
            user?.status === "free" &&
            template.name.toLowerCase() !== "basic" &&
            template.name.toLowerCase() !== "velocity" &&
            template.name.toLowerCase() !== "triumph" &&
            template.name.toLowerCase() !== "sharp"
        ) {
            return;
        }
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

    const scrollRight = () => {
        const container = keyWordContainerRef.current;
        if (container) {
            // Scroll the container to the right by its full width
            container.scrollLeft += container.offsetWidth;
        }
    };

    const scrollLeft = () => {
        const container = keyWordContainerRef.current;
        if (container) {
            // Scroll the container to the left by its full width
            container.scrollLeft -= container.offsetWidth;
        }
    };

    return (
        <MenuContainer>
            <motion.section className={styles.titleContainer}>
                {templateIcon}
                <motion.p className={styles.title}>Templates</motion.p>
            </motion.section>
            <motion.section className={styles.searchBarContainer}>
                <motion.div className={styles.searchIconContainer}>
                    {searchIcon}
                </motion.div>
                <motion.input
                    id="templateSeachBar"
                    type="text"
                    value={searchText}
                    onChange={(e) => searchContentChanged(e.target.value)}
                    className={styles.searchBarInput}
                    placeholder="Search Templates"
                />
            </motion.section>
            <motion.section className={styles.keywordFunctionContainer}>
                <motion.section className={styles.buttonContainer}>
                    <motion.button
                        className={styles.button}
                        onClick={scrollLeft}
                    >
                        {basicLeftArrow}
                    </motion.button>
                    <motion.section
                        className={styles.keywordContainer}
                        ref={keyWordContainerRef}
                    >
                        <motion.div
                            className={
                                searchText.toLowerCase() === "all"
                                    ? styles.keywordItemActive
                                    : styles.keywordItem
                            }
                            onClick={() => {
                                searchContentChanged("all");
                            }}
                        >
                            <motion.p className={styles.keyword}>All</motion.p>
                        </motion.div>
                        {allKeywords.map((keyword, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    className={
                                        searchText
                                            .toLowerCase()
                                            .split(" ")
                                            .includes(keyword.toLowerCase())
                                            ? styles.keywordItemActive
                                            : styles.keywordItem
                                    }
                                    onClick={() => {
                                        searchContentChanged(
                                            keyword.toLowerCase()
                                        );
                                    }}
                                >
                                    <motion.p className={styles.keyword}>
                                        {keyword}
                                    </motion.p>
                                </motion.div>
                            );
                        })}
                    </motion.section>
                    <motion.button
                        className={styles.button}
                        onClick={scrollRight}
                    >
                        {basicRightArrow}
                    </motion.button>
                </motion.section>
            </motion.section>
            <motion.section className={styles.row}>
                <motion.div className={styles.template}>
                    <motion.div className={styles.templatePreview}>
                        {currentTemplate?.previewComponent}

                        <>
                            <div
                                className={styles.templateDiagonalContainer}
                            ></div>
                            <p className={styles.templateDiagonal}>
                                {currentTemplate?.name}
                                <br />
                                (current)
                            </p>
                        </>
                    </motion.div>
                </motion.div>
                {results.map((template: any, index: number) => {
                    return (
                        <motion.div
                            key={index}
                            className={styles.template}
                            onClick={() => handleClick(template)}
                            onMouseEnter={() => setHoverIndex(index + 1)}
                            onMouseLeave={() => setHoverIndex(-1)}
                            style={
                                user?.status === "free" &&
                                template.name.toLowerCase() !== "basic" &&
                                template.name.toLowerCase() !== "velocity" &&
                                template.name.toLowerCase() !== "triumph" &&
                                template.name.toLowerCase() !== "sharp"
                                    ? { opacity: 0.5, cursor: "default" }
                                    : {}
                            }
                        >
                            <motion.div className={styles.templatePreview}>
                                {user?.status === "free" &&
                                    template.name.toLowerCase() !== "basic" &&
                                    template.name.toLowerCase() !==
                                        "velocity" &&
                                    template.name.toLowerCase() !== "triumph" &&
                                    template.name.toLowerCase() !== "sharp" &&
                                    lockIcon}
                                {template.component}
                                {hoverIndex === index + 1 && (
                                    <>
                                        <div
                                            className={
                                                styles.templateDiagonalContainer
                                            }
                                        ></div>
                                        <p className={styles.templateDiagonal}>
                                            {template.name}
                                        </p>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.section>
        </MenuContainer>
    );
};

export default TemplateMenu;
