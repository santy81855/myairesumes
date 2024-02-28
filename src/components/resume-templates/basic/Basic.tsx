"use client";
import styles from "./Basic.module.css";
import { useAppContext } from "@/app/providers";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
    PDFViewer,
} from "@react-pdf/renderer";
import SectionComponents from "../section-components/SectionComponents";
import {
    DraggableContainer,
    updateDocumentArray,
    SectionConfig,
} from "@/features/editor";
import Section from "../Section/Section";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";
import SectionContainerEditor from "../section-components/section-container-editor/SectionContainerEditor";

type BasicProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Basic = ({ document, isEditor, isDownload, isPreview }: BasicProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(11);

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        console.log(width);
        let size = 11 * (width / 610);
        setFontSize((prev) => size);
        let newMargin = 11 * (width / 610);
        setMargin((prev) => newMargin);

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            setFontSize((prev) => size);
            let newMargin = 11 * (width / 610);
            setMargin((prev) => newMargin);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        if (isEditor) {
            // Create a copy of the sectionOrder
            const newOrderArray = [...document.information.sectionOrder];

            // Get the dragged item
            const draggedItem = newOrderArray[dragIndex];

            // Remove the dragged item from its original position
            newOrderArray.splice(dragIndex, 1);

            // Insert the dragged item at the new position
            newOrderArray.splice(hoverIndex, 0, draggedItem);
            // update the orderArray in the document
            const updatedDocument = { ...document };
            updatedDocument.information.sectionOrder[
                updatedDocument.currentPage - 1
            ] = newOrderArray;
            // update the documentArray
            const newDocumentArray = updateDocumentArray(
                updatedDocument,
                documentArray
            );
            setDocumentArray(newDocumentArray);
        }
    };

    // Create pdfStyles
    const pdfStyles = StyleSheet.create({
        page: { flexDirection: "row" },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: margin,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: margin,
        },
    });

    const editorStyles = {
        sectionContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
        },

        sectionTitle: {
            fontSize: fontSize * 1.3,
            fontWeight: "bold",
        },

        italic: {
            fontStyle: "italic",
        },

        boldItalic: {
            fontWeight: "bold",
            fontStyle: "italic",
        },

        bold: {
            fontWeight: "bold",
        },

        extraSmall: {
            fontSize: fontSize * 0.8,
        },

        small: {
            fontSize: fontSize,
        },

        medium: {
            fontSize: fontSize * 1.2,
        },
        large: {
            fontSize: fontSize * 1.5,
        },

        extraLarge: {
            fontSize: fontSize * 2,
        },

        rowContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row" as "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "calc(1em / 1.5)",
        },

        columnGroupCenter: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "calc(1em / 12)",
        },

        columnGroupLeft: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "calc(1em / 12)",
        },

        columnGroupRight: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: "calc(1em / 12)",
        },
        bullet: {
            width: fontSize / 4,
            height: fontSize / 4,
            backgroundColor: "black",
            borderRadius: "50%",
        },

        horizontalLine: {
            width: "100%",
            height: "calc(1em / 10)",
            backgroundColor: "black",
        },

        arrayContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "calc(1em)",
        },

        arrayItem: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "calc(1em / 2)",
        },

        rowSpaceBetween: {
            width: "100%",
            display: "flex",
            flexDirection: "row" as "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        bulletItemContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "calc(1em /3)",
        },

        bulletItem: {
            width: "100%",
            display: "flex",
            flexDirection: "row" as "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "calc(1em / 4)",
        },
    };

    const example = (
        <div style={editorStyles.sectionContainer}>
            <p style={{ ...editorStyles.medium, ...editorStyles.bold }}>
                Education
            </p>
            <div style={editorStyles.horizontalLine}></div>
            <div style={editorStyles.arrayContainer}>
                {sortObjectArrayByDateEnd(
                    document.information.educationArray,
                    -1
                ).map((education: any, index: number) => (
                    <div key={index} style={editorStyles.arrayItem}>
                        <div style={editorStyles.rowSpaceBetween}>
                            <p
                                style={{
                                    ...editorStyles.medium,
                                    ...editorStyles.bold,
                                }}
                            >
                                {education.schoolName}
                            </p>
                            <p style={editorStyles.small}>
                                {formatDateMonthDayYear(education.startDate)} -{" "}
                                {education.endDate === "Present"
                                    ? "Present"
                                    : formatDateMonthDayYear(education.endDate)}
                            </p>
                        </div>
                        <p style={editorStyles.small}>
                            {education.degreeType} in {education.degreeField}
                        </p>
                        <p style={editorStyles.small}>GPA: {education.gpa}</p>
                        <div style={editorStyles.bulletItemContainer}>
                            {education.bullets.map(
                                (bullet: string, index: number) => (
                                    <div
                                        key={index}
                                        style={editorStyles.bulletItem}
                                    >
                                        <div style={editorStyles.bullet}></div>
                                        <p style={editorStyles.small}>
                                            {bullet}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        document && (
            <>
                {isEditor && (
                    <div
                        className={styles.pageContainer}
                        style={{
                            paddingLeft: "1em",
                            paddingRight: "1em",
                            paddingTop: "1em",
                            fontSize: fontSize,
                            gap: "1em",
                        }}
                        ref={templateRef}
                    >
                        {document.information.sectionOrder[
                            document.currentPage - 1
                        ].map((section: string, index: number) => (
                            <DraggableContainer
                                key={section + index.toString()}
                                id={`${section}-${index}`}
                                orderArray={
                                    document.information.sectionOrder[
                                        document.currentPage - 1
                                    ]
                                }
                                moveSection={moveSection}
                            >
                                <SectionContainerEditor document={document}>
                                    <Section
                                        sectionId={section}
                                        document={document}
                                        ref={templateRef}
                                    />
                                </SectionContainerEditor>
                            </DraggableContainer>
                        ))}
                    </div>
                )}
                {isDownload && (
                    <Document title="Resume">
                        {document.information.sectionOrder.map(
                            (array: string[], index: number) => (
                                <Page
                                    wrap={false}
                                    key={index}
                                    style={pdfStyles.page}
                                    size="LETTER"
                                >
                                    <View
                                        wrap={false}
                                        style={pdfStyles.pageContainer}
                                    >
                                        <SectionComponents
                                            document={document}
                                            font="Times-Roman"
                                            fontSize={fontSize}
                                            margin={margin}
                                            orderArray={array}
                                            isDownload={true}
                                        />
                                    </View>
                                </Page>
                            )
                        )}
                    </Document>
                )}
            </>
        )
    );
};

export default Basic;
