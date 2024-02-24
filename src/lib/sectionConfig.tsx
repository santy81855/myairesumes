"use client";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { formatDateMonthDayYear, sortObjectArrayByDateEnd } from "./date";

export const SectionConfig = (
    document: any,
    fontSize: any,
    font: string,
    margin: any
) => {
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };
    // function to handle work break
    Font.registerHyphenationCallback(hyphenationCallback);

    const getBoldFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-Bold";
            case "Helvetica":
                return "Helvetica-Bold";
            case "Courier":
                return "Courier-Bold";
            default:
                return "Times-Bold";
        }
    };

    const getItalicFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-Italic";
            case "Helvetica":
                return "Helvetica-Oblique";
            case "Courier":
                return "Courier-Oblique";
            default:
                return "Times-Italic";
        }
    };

    const getBoldItalicFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-BoldItalic";
            case "Helvetica":
                return "Helvetica-BoldOblique";
            case "Courier":
                return "Courier-BoldOblique";
            default:
                return "Times-BoldItalic";
        }
    };
    // Create styles
    const styles = StyleSheet.create({
        sectionContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: margin / 4,
        },
        sectionTitle: {
            fontSize: fontSize * 1.3,
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        italic: {
            fontFamily: getItalicFont(),
            fontStyle: "italic",
        },
        boldItalic: {
            fontFamily: getBoldItalicFont(),
            fontWeight: "bold",
            fontStyle: "italic",
        },
        bold: {
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        extraSmall: {
            fontSize: fontSize * 0.8,
            fontFamily: font,
        },
        small: {
            fontSize: fontSize,
            fontFamily: font,
        },
        medium: {
            fontSize: fontSize * 1.2,
            fontFamily: font,
        },
        large: {
            fontSize: fontSize * 1.5,
            fontFamily: font,
        },
        extraLarge: {
            fontFamily: font,
            fontSize: fontSize * 2,
        },
        rowContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: margin / 1.5,
        },
        columnGroupCenter: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: margin / 12,
        },
        columnGroupLeft: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: margin / 12,
        },
        columnGroupRight: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
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
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: margin,
        },
        arrayItem: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: margin / 2,
        },
        rowSpaceBetween: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        bulletItemContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: margin / 3,
        },
        bulletItem: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: margin / 4,
        },
    });

    const educationVariants = {
        educationShort: {
            name: "Brief Education",
            description:
                "A short education history that includes a bold heading, school name, degree, and graduation date.",
            keyWords: ["education", "school", "degree", "graduation", "short"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthDayYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailed: {
            name: "Detailed Education",
            description:
                "A detailed education history. Includes a bold heading, a start date, a graduation date, a school name, a degree type, a degree field, a GPA, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthDayYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <Text style={styles.small}>
                                    GPA: {education.gpa}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {education.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailedNoGPA: {
            name: "Detailed Education - No GPA",
            description:
                "A detailed education history. Includes a bold heading, a start date, a graduation date, a school name, a degree type, a degree field, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthDayYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {education.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailedNoGPANoStartDate: {
            name: "Detailed Education - No GPA, No Start Date",
            description:
                "A detailed education history. Includes a bold heading, a graduation date, a school name, a degree type, a degree field, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {education.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailedNoStartDate: {
            name: "Detailed Education - No Start Date",
            description:
                "A detailed education history. Includes a bold heading, a graduation date, a school name, a degree type, a degree field, a GPA, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <Text style={styles.small}>
                                    GPA: {education.gpa}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {education.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailedNoBulletPointsNoStartDate: {
            name: "Detailed Education - No Bullet Points, No Start Date",
            description:
                "A detailed education history. Includes a bold heading, a graduation date, a school name, a degree type, a degree field, and a GPA.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <Text style={styles.small}>
                                    GPA: {education.gpa}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationShortNoStartDate: {
            name: "Brief Education - No Start Date",
            description:
                "A short education history that includes a bold heading, school name, degree, and graduation date.",
            keyWords: ["education", "school", "degree", "graduation", "short"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailedNoBulletPoints: {
            name: "Detailed Education - No Bullet Points",
            description:
                "A detailed education history. Includes a bold heading, a start date, a graduation date, a school name, a degree type, a degree field, and a GPA.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Education
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthDayYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <Text style={styles.small}>
                                    GPA: {education.gpa}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
    };

    const nameVariants = {
        nameLargeBold: {
            name: "Name - Bold, Large",
            description: "Your name in bold and large font.",
            keyWords: ["name", "first", "last", "bold", "large"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.large, ...styles.bold }}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameLarge: {
            name: "Name - Large",
            description: "Your name in large font.",
            keyWords: ["name", "first", "last", "large"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameMedium: {
            name: "Name - Medium",
            description: "Your name in medium font.",
            keyWords: ["name", "first", "last", "medium"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.medium}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameSmall: {
            name: "Name - Small",
            description: "Your name in small font.",
            keyWords: ["name", "first", "last", "small"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameSmallBold: {
            name: "Name - Small, Bold",
            description: "Your name in small and bold font.",
            keyWords: ["name", "first", "last", "small", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.small, ...styles.bold }}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameMediumBold: {
            name: "Name - Medium, Bold",
            description: "Your name in medium and bold font.",
            keyWords: ["name", "first", "last", "medium", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameExtraLarge: {
            name: "Name - Extra Large",
            description: "Your name in extra large font.",
            keyWords: ["name", "first", "last", "extra", "large"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.extraLarge}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameExtraLargeBold: {
            name: "Name - Extra Large, Bold",
            description: "Your name in extra large and bold font.",
            keyWords: ["name", "first", "last", "extra", "large", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.extraLarge, ...styles.bold }}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameExtraSmall: {
            name: "Name - Extra Small",
            description: "Your name in extra small font.",
            keyWords: ["name", "first", "last", "extra", "small"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.extraSmall}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        nameExtraSmallBold: {
            name: "Name - Extra Small, Bold",
            description: "Your name in extra small and bold font.",
            keyWords: ["name", "first", "last", "extra", "small", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.extraSmall, ...styles.bold }}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
    };

    const positionVariants = {
        positionLarge: {
            name: "Position - Large",
            description: "Your job title in large font.",
            keyWords: ["position", "job", "title", "large"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionMedium: {
            name: "Position - Medium",
            description: "Your job title in medium font.",
            keyWords: ["position", "job", "title", "medium"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.medium}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionSmall: {
            name: "Position - Small",
            description: "Your job title in small font.",
            keyWords: ["position", "job", "title", "small"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionExtraLarge: {
            name: "Position - Extra Large",
            description: "Your job title in extra large font.",
            keyWords: ["position", "job", "title", "extra", "large"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.extraLarge}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionExtraSmall: {
            name: "Position - Extra Small",
            description: "Your job title in extra small font.",
            keyWords: ["position", "job", "title", "extra", "small"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.extraSmall}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionLargeBold: {
            name: "Position - Large, Bold",
            description: "Your job title in large and bold font.",
            keyWords: ["position", "job", "title", "large", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.large, ...styles.bold }}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionMediumBold: {
            name: "Position - Medium, Bold",
            description: "Your job title in medium and bold font.",
            keyWords: ["position", "job", "title", "medium", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionSmallBold: {
            name: "Position - Small, Bold",
            description: "Your job title in small and bold font.",
            keyWords: ["position", "job", "title", "small", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.small, ...styles.bold }}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionExtraLargeBold: {
            name: "Position - Extra Large, Bold",
            description: "Your job title in extra large and bold font.",
            keyWords: ["position", "job", "title", "extra", "large", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.extraLarge, ...styles.bold }}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        positionExtraSmallBold: {
            name: "Position - Extra Small, Bold",
            description: "Your job title in extra small and bold font.",
            keyWords: ["position", "job", "title", "extra", "small", "bold"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={{ ...styles.extraSmall, ...styles.bold }}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
    };

    const contactVariants = {
        contactEmailPhoneWebsite: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed horizontally with a pipe separator.",
            keyWords: ["contact", "email", "phone", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhone: {
            name: "Contact: Email, Phone",
            description:
                "Your email and phone number displayed horizontally with a pipe separator.",
            keyWords: ["contact", "email", "phone", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailWebsite: {
            name: "Contact: Email, Website",
            description:
                "Your email and website displayed horizontally with a pipe separator.",
            keyWords: ["contact", "email", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactPhoneWebsite: {
            name: "Contact: Phone, Website",
            description:
                "Your phone number and website displayed horizontally with a pipe separator.",
            keyWords: ["contact", "phone", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmail: {
            name: "Contact: Email",
            description: "Your email address.",
            keyWords: ["contact", "email", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.contactInfo.email}
                    </Text>
                </View>
            ) : null,
        },
        contactPhone: {
            name: "Contact: Phone",
            description: "Your phone number.",
            keyWords: ["contact", "phone", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.contactInfo.phone}
                    </Text>
                </View>
            ) : null,
        },
        contactWebsite: {
            name: "Contact: Website",
            description: "Your website.",
            keyWords: ["contact", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.contactInfo.website}
                    </Text>
                </View>
            ) : null,
        },
        contactEmailPhoneWebsiteVerticalLeft: {
            name: "Contact: Email, Phone, Website - Column Left",
            description:
                "Your email, phone number, and website displayed as a left-aligned column..",
            keyWords: [
                "contact",
                "email",
                "phone",
                "website",
                "vertical",
                "left",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupLeft}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhoneWebsiteVerticalRight: {
            name: "Contact: Email, Phone, Website - Column Right",
            description:
                "Your email, phone number, and website displayed as a right-aligned column.",
            keyWords: [
                "contact",
                "email",
                "phone",
                "website",
                "vertical",
                "right",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupRight}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        coontactEmailPhoneWebsiteVerticalCenter: {
            name: "Contact: Email, Phone, Website - Column Center",
            description:
                "Your email, phone number, and website displayed as a center-aligned column.",
            keyWords: [
                "contact",
                "email",
                "phone",
                "website",
                "vertical",
                "center",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupCenter}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhoneVerticalLeft: {
            name: "Contact: Email, Phone - Column Left",
            description:
                "Your email and phone number displayed as a left-aligned column.",
            keyWords: ["contact", "email", "phone", "vertical", "left"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupLeft}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhoneVerticalRight: {
            name: "Contact: Email, Phone - Column Right",
            description:
                "Your email and phone number displayed as a right-aligned column.",
            keyWords: ["contact", "email", "phone", "vertical", "right"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupRight}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhoneVerticalCenter: {
            name: "Contact: Email, Phone - Column Center",
            description:
                "Your email and phone number displayed as a center-aligned column.",
            keyWords: ["contact", "email", "phone", "vertical", "center"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupCenter}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailWebsiteVerticalLeft: {
            name: "Contact: Email, Website - Column Left",
            description:
                "Your email and website displayed as a left-aligned column.",
            keyWords: ["contact", "email", "website", "vertical", "left"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupLeft}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailWebsiteVerticalRight: {
            name: "Contact: Email, Website - Column Right",
            description:
                "Your email and website displayed as a right-aligned column.",
            keyWords: ["contact", "email", "website", "vertical", "right"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupRight}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailWebsiteVerticalCenter: {
            name: "Contact: Email, Website - Column Center",
            description:
                "Your email and website displayed as a center-aligned column.",
            keyWords: ["contact", "email", "website", "vertical", "center"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupCenter}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactPhoneWebsiteVerticalLeft: {
            name: "Contact: Phone, Website - Column Left",
            description:
                "Your phone number and website displayed as a left-aligned column.",
            keyWords: ["contact", "phone", "website", "vertical", "left"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupLeft}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactPhoneWebsiteVerticalRight: {
            name: "Contact: Phone, Website - Column Right",
            description:
                "Your phone number and website displayed as a right-aligned column.",
            keyWords: ["contact", "phone", "website", "vertical", "right"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupRight}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactPhoneWebsiteVerticalCenter: {
            name: "Contact: Phone, Website - Column Center",
            description:
                "Your phone number and website displayed as a center-aligned column.",
            keyWords: ["contact", "phone", "website", "vertical", "center"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.columnGroupCenter}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
    };

    return {
        ...nameVariants,
        ...positionVariants,
        ...educationVariants,
        ...contactVariants,
        summary: {
            name: "Summary",
            description:
                "A brief summary of yourself, like a bio or objective statement.",
            keyWords: [
                "summary",
                "description",
                "about",
                "objective",
                "bio",
                "me",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="summaryPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Summary
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.small}>
                        {document.information.summary}
                    </Text>
                </View>
            ) : null,
        },
        skills: {
            name: "Skills",
            description: "Your skills in a bullet point list.",
            keyWords: ["skills", "abilities", "strengths", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Skills
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.bulletItemContainer}>
                        {document.information.skillArray.map(
                            (skill: string) => (
                                <View style={styles.bulletItem}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        shortSkills: {
            name: "Short Skills",
            description: "Your skills in a comma separated list.",
            keyWords: ["skills", "abilities", "strengths", "short", "comma"],
            // short skills are displayed as a comma separated list
            component: fontSize ? (
                <View style={styles.sectionContainer} id="shortSkillsPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Skills
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.small}>
                        {document.information.shortSkillArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        experience: {
            name: "Experience",
            description: "Your previous employment history.",
            keyWords: [
                "experience",
                "work",
                "job",
                "career",
                "professional",
                "employment",
                "history",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="experiencePdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Experience
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.experienceArray,
                            -1
                        ).map((experience: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {experience.company}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthDayYear(
                                            experience.startDate
                                        )}{" "}
                                        -{" "}
                                        {experience.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthDayYear(
                                                  experience.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {experience.position}
                                </Text>
                                <Text style={styles.small}>
                                    {experience.summary}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {experience.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        languages: {
            name: "Languages",
            description: "Your languages in a bullet point list.",
            keyWords: ["languages"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="languagesPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Languages
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        <View style={styles.bulletItemContainer}>
                            {document.information.languageArray.map(
                                (skill: string) => (
                                    <View style={styles.bulletItem}>
                                        <View style={styles.bullet}></View>
                                        <Text style={styles.small}>
                                            {skill}
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        languagesShort: {
            name: "Languages",
            description: "Your languages in a comma separated list.",
            keyWords: ["languages"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="languagesPdf">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Languages
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.small}>
                        {document.information.languageArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        interests: {
            name: "Interests",
            description: "Your interests in a bullet point list.",
            keyWords: ["interests", "hobbies"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interests">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Interests
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.bulletItemContainer}>
                        {document.information.interestArray.map(
                            (skill: string) => (
                                <View style={styles.bulletItem}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        interestsShort: {
            name: "Interests",
            description: "Your interests in a comma separated list.",
            keyWords: ["interests", "hobbies"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interests">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Interests
                    </Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.small}>
                        {document.information.interestArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        projects: {
            name: "Projects",
            description: "Your projects",
            keyWords: [
                "projects",
                "project",
                "portfolio",
                "work",
                "assignments",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="projects">
                    <Text style={{ ...styles.medium, ...styles.bold }}>
                        Projects
                    </Text>
                    <View style={styles.horizontalLine}></View>
                </View>
            ) : null,
        },
    };
};
