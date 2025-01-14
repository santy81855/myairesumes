"use client";
import styles from "./AddSectionModal.module.css";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";
import {
    circledXIcon,
    searchIcon,
    basicLeftArrow,
    basicRightArrow,
} from "@/components/icons/iconSVG";
import { motion, AnimatePresence } from "framer-motion";
import {
    updateDocumentArray,
    SectionConfig,
    CoverLetterSectionConfig,
} from "@/features/editor";
import { Section } from "@/features/resume";

const AddSectionModal = () => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();
    const params = useParams();
    const type = params.slug[0];
    const id = params.slug[1];
    const [document, setDocument] = useState<any>(null);
    const [searchContent, setSearchContent] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(11);
    const [allSections, setAllSections] = useState<any>(null);
    const keyWordContainerRef = useRef<HTMLDivElement>(null);
    const allKeywords = [
        "header",
        "contact",
        "summary",
        "education",
        "experience",
        "skills",
        "projects",
        "languages",
        "interests",
    ];

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = 11 * (width / 610);
        setFontSize(size);
        let newMargin = 11 * (width / 610);
        setMargin(newMargin);

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            setFontSize(size);
            //  do the same for the margin value, which should be 16px at 610px width
            let newMargin = 11 * (width / 610);
            setMargin(newMargin);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const doc = documentArray.find((document) => document.id === id);
        if (!doc) return;
        setDocument(doc);
        let temp = {};
        if (type === "resume") {
            temp = SectionConfig({
                document: doc,
                fontSize: null,
                font: doc.information.font,
                template: doc.information.template,
                isDownload: false,
                accentColumn: false,
            });
        } else {
            temp = CoverLetterSectionConfig({
                document: doc,
                fontSize: null,
                font: doc.information.font,
                template: doc.information.template,
                isDownload: false,
                accentColumn: false,
            });
        }
        let sectionConfigArray = Object.entries(temp).map(([id, config]) => ({
            id,
            ...(config as object),
        }));
        setAllSections(sectionConfigArray);
    }, [documentArray]);

    const searchContentChanged = (content: string) => {
        setSearchContent(content);
        if (content === "") {
            setResults([]);
            return;
        }
        const tempArray = [...allSections];
        const results = tempArray.filter(
            (item: {
                id: string;
                name: string;
                description: string;
                keyWords: string[];
            }) =>
                // check if each word of the content is one of hte keywords
                content
                    .split(" ")
                    .every((word) =>
                        item.keyWords.some((keyword) =>
                            keyword.toLowerCase().includes(word.toLowerCase())
                        )
                    )
        );
        // make the results be in alphabetical order by name
        results.sort((a, b) => a.name.localeCompare(b.name));
        setResults(results);
    };

    const handleAddSectionClicked = (section: string) => {
        var index = showComponentModal[id as string];
        // add given section at given index in the sectionOrder array of the document and update the documentArray
        if (!document) return;
        const currentPageIndex = document.currentPage - 1;
        let newSectionOrder = [...document.information.sectionOrder];
        // if a negative index is given it means we need to replace the section at the positive index
        // if 9999 is given it means we need to replace the item in index 0
        if (index < 0 || index === 9999) {
            // set the index back to positive
            if (index < 0) index = -1 * index;
            if (index === 9999) index = 0;
            // add section at index while removing the current value at the index
            newSectionOrder[currentPageIndex].splice(index, 1);
            newSectionOrder[currentPageIndex].splice(index, 0, section);
        } else {
            newSectionOrder[currentPageIndex].splice(index, 0, section);
        }
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

    const closeComponentModal = () => {
        const { [id as string]: _, ...newState } = showComponentModal;
        setShowComponentModal(newState);
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
        showComponentModal &&
        showComponentModal.hasOwnProperty(id as string) &&
        document && (
            <section className={styles.background}>
                <section
                    className={styles.container}
                    style={
                        results.length === 0
                            ? {
                                  paddingBlockEnd: "var(--padding-block-large)",
                              }
                            : {}
                    }
                >
                    <section className={styles.titleContainer}>
                        <h1 className={styles.title}>Find a section</h1>
                        <button
                            className={styles.cancelButton}
                            onClick={() => {
                                closeComponentModal();
                            }}
                        >
                            {circledXIcon}
                        </button>
                    </section>
                    <section
                        id="searchBarContainer"
                        className={styles.searchBarContainer}
                    >
                        {searchIcon}
                        <input
                            id="searchBar"
                            type="text"
                            className={styles.searchBar}
                            placeholder="Search for a section. Eg. 'Experience', 'Skills', etc."
                            value={searchContent}
                            onChange={(e) =>
                                searchContentChanged(e.target.value)
                            }
                            autoFocus
                            autoComplete="off"
                        />
                    </section>
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
                                {allKeywords.map(
                                    (keyword: string, index: number) => {
                                        return (
                                            <motion.div
                                                key={index}
                                                className={
                                                    searchContent
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .includes(
                                                            keyword.toLowerCase()
                                                        )
                                                        ? styles.keywordItemActive
                                                        : styles.keywordItem
                                                }
                                                onClick={() => {
                                                    searchContentChanged(
                                                        keyword.toLowerCase()
                                                    );
                                                }}
                                            >
                                                <motion.p
                                                    className={styles.keyword}
                                                >
                                                    {keyword}
                                                </motion.p>
                                            </motion.div>
                                        );
                                    }
                                )}
                            </motion.section>
                            <motion.button
                                className={styles.button}
                                onClick={scrollRight}
                            >
                                {basicRightArrow}
                            </motion.button>
                        </motion.section>
                    </motion.section>
                    {results.length > 0 && (
                        <div className={styles.divider}></div>
                    )}
                    <AnimatePresence>
                        {results.length > 0 && (
                            <motion.section
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className={styles.resultsContainer}
                                ref={templateRef}
                            >
                                {results.map((result, index) => (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`${styles.resultItem} ${
                                            index % 2 !== 0 && styles.odd
                                        }`}
                                        key={result.id}
                                    >
                                        <section
                                            className={styles.colContainer}
                                        >
                                            <section
                                                className={styles.rowContainer}
                                            >
                                                <p className={styles.name}>
                                                    {result.name}
                                                </p>
                                                <button
                                                    title={`Add ${result.name} Section`}
                                                    className={
                                                        styles.selectButton
                                                    }
                                                    onClick={() =>
                                                        handleAddSectionClicked(
                                                            result.id
                                                        )
                                                    }
                                                >
                                                    + Add Section
                                                </button>
                                            </section>
                                            <p className={styles.description}>
                                                {result.description}
                                            </p>
                                        </section>
                                        <div
                                            className={styles.exampleContainer}
                                        >
                                            <Section
                                                type={type}
                                                key={
                                                    result.id + index.toString()
                                                }
                                                sectionId={result.id}
                                                document={document}
                                                templateRef={templateRef}
                                            />
                                        </div>
                                        <button
                                            title={`Add ${result.name} Section`}
                                            className={
                                                styles.selectButtonMobile
                                            }
                                            onClick={() =>
                                                handleAddSectionClicked(
                                                    result.id
                                                )
                                            }
                                        >
                                            + Add Section
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.section>
                        )}
                    </AnimatePresence>
                </section>
            </section>
        )
    );
};

export default AddSectionModal;
