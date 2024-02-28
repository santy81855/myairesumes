"use client";
import { useState, useEffect, forwardRef } from "react";
import { SectionConfig } from "../../../features/editor";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";

type SectionProps = {
    sectionId: string;
    document: any;
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ sectionId, document }, ref) => {
        const [fontSize, setFontSize] = useState(
            document.information.style.baseFontSize
        );
        const [margin, setMargin] = useState(
            document.information.style.baseMarginSize
        );
        const [sectionConfig, setSectionConfig] = useState<any>(
            SectionConfig(
                document,
                document.information.style.baseFontSize,
                document.information.font,
                document.information.style.baseMarginSize
            )
        );

        // useEffect(() => {
        //     if (!ref) return;
        //     const template = ref.current as unknown as HTMLElement;
        //     if (!template) return;
        //     const { width, height } = template.getBoundingClientRect();
        //     let size = document.information.style.baseFontSize * (width / 612);
        //     setFontSize(size);
        //     let newMargin =
        //         document.information.style.baseMarginSize * (width / 612);
        //     setMargin(newMargin);

        //     setSectionConfig(
        //         SectionConfig(
        //             document,
        //             size,
        //             document.information.font,
        //             newMargin
        //         )
        //     );

        //     // handle the text scaling
        // //     function handleResize() {
        // //         console.log("here");
        // //         if (!ref) return;
        // //         console.log("here2");
        // //         const template = ref.current as unknown as HTMLElement;
        // //         if (!template) return;
        // //         const { width, height } = template.getBoundingClientRect();
        // //         let size =
        // //             document.information.style.baseFontSize * (width / 612);
        // //         // console.log(width, height);
        // //         // console.log(size);
        // //         setFontSize(size);
        // //         //  do the same for the margin value, which should be 16px at 610px width
        // //         let newMargin =
        // //             document.information.style.baseMarginSize * (width / 612);
        // //         setMargin(newMargin);
        // //         setSectionConfig(
        // //             SectionConfig(
        // //                 document,
        // //                 size,
        // //                 document.information.font,
        // //                 newMargin
        // //             )
        // //         );
        // //     }

        // //     window.addEventListener("resize", handleResize);

        // //     return () => window.removeEventListener("resize", handleResize);
        // // }, []);

        console.log(fontSize);
        const styles = {
            sectionContainer: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "center",
                alignItems: "center",
                gap: margin,
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
                gap: margin / 1.5,
            },

            columnGroupCenter: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "center",
                alignItems: "center",
                gap: margin / 12,
            },

            columnGroupLeft: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: margin / 12,
            },

            columnGroupRight: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: margin / 12,
            },
            bullet: {
                width: fontSize / 4,
                height: fontSize / 4,
                backgroundColor: "black",
                borderRadius: "50%",
            },

            horizontalLine: {
                width: "100%",
                height: margin / 10,
                backgroundColor: "black",
            },

            arrayContainer: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: margin,
            },

            arrayItem: {
                width: "100%",
                display: "flex",
                flexDirection: "column" as "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: margin / 2,
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
                gap: margin / 3,
            },

            bulletItem: {
                width: "100%",
                display: "flex",
                flexDirection: "row" as "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: margin / 4,
            },
        };

        const example = (
            <div style={styles.sectionContainer}>
                <p style={{ ...styles.medium, ...styles.bold }}>Education</p>
                <div style={styles.horizontalLine}></div>
                <div style={styles.arrayContainer}>
                    {sortObjectArrayByDateEnd(
                        document.information.educationArray,
                        -1
                    ).map((education: any, index: number) => (
                        <div key={index} style={styles.arrayItem}>
                            <div style={styles.rowSpaceBetween}>
                                <p
                                    style={{
                                        ...styles.medium,
                                        ...styles.bold,
                                    }}
                                >
                                    {education.schoolName}
                                </p>
                                <p style={styles.small}>
                                    {formatDateMonthDayYear(
                                        education.startDate
                                    )}{" "}
                                    -{" "}
                                    {education.endDate === "Present"
                                        ? "Present"
                                        : formatDateMonthDayYear(
                                              education.endDate
                                          )}
                                </p>
                            </div>
                            <p style={styles.small}>
                                {education.degreeType} in{" "}
                                {education.degreeField}
                            </p>
                            <p style={styles.small}>GPA: {education.gpa}</p>
                            <div style={styles.bulletItemContainer}>
                                {education.bullets.map(
                                    (bullet: string, index: number) => (
                                        <div
                                            key={index}
                                            style={styles.bulletItem}
                                        >
                                            <div style={styles.bullet}></div>
                                            <p style={styles.small}>{bullet}</p>
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
            sectionConfig[sectionId as keyof typeof sectionConfig]?.component ??
            null
        );
    }
);

Section.displayName = "Section";

export default Section;
