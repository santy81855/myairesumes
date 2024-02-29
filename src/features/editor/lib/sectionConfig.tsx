"use client";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";

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
            gap: fontSize / 4,
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
            lineHeight: 1.2,
        },
        small: {
            fontSize: fontSize,
            fontFamily: font,
            lineHeight: 1.2,
        },
        medium: {
            fontSize: fontSize * 1.2,
            fontFamily: font,
            lineHeight: 1.2,
        },
        large: {
            fontSize: fontSize * 1.5,
            fontFamily: font,
            lineHeight: 1.2,
        },
        extraLarge: {
            fontFamily: font,
            fontSize: fontSize * 2,
            lineHeight: 1.2,
        },
        rowContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 1.5,
        },
        columnGroupCenter: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 12,
        },
        columnGroupLeft: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 12,
        },
        columnGroupRight: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: fontSize / 12,
        },
        bullet: {
            width: fontSize / 4,
            height: fontSize / 4,
            backgroundColor: "black",
            borderRadius: "50%",
        },
        horizontalLine: {
            width: "100%",
            height: fontSize / 10,
            backgroundColor: "black",
        },
        arrayContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize,
        },
        arrayItem: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 2,
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
            gap: fontSize / 3,
        },
        bulletItem: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize / 4,
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
    };

    const nameVariants = {
        name: {
            name: "Name",
            description: "Your name in its own line.",
            keyWords: ["name", "first", "last"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
    };

    const positionVariants = {
        position: {
            name: "Position",
            description: "Your job title displayed as its own line.",
            keyWords: ["position", "job", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
    };

    const contactVariants = {
        contactHorizontal: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed horizontally with a pipe separator. You can choose to omit any of the three contact details.",
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
        contactVertical: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed as a column. Defaults to the left side, but can be changed to be center or right aligned. You can choose to omit any of the three contact details.",
            keyWords: ["contact", "email", "phone", "website", "vertical"],
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
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
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
                                (skill: string, index: number) => (
                                    <View style={styles.bulletItem} key={index}>
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
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
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
