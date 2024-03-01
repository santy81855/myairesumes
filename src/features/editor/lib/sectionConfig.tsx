"use client";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";

export const SectionConfig = (
    document: any,
    fontSize: any,
    font: string,
    template: string
) => {
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };
    // function to handle work break
    Font.registerHyphenationCallback(hyphenationCallback);

    const getSectionTitleComponent = (title: string) => {
        switch (template) {
            case "basic":
                return (
                    <>
                        <Text style={{ ...styles.medium, ...styles.bold }}>
                            {title}
                        </Text>
                        <View style={styles.horizontalLine}></View>
                    </>
                );
            case "nexus":
                return (
                    <View
                        style={{
                            backgroundColor: "#f5f5f5",
                            width: "100%",
                        }}
                    >
                        <Text
                            style={{
                                ...styles.medium,
                                ...styles.accentTextColor,
                                ...styles.textLeftAlign,
                                ...styles.marginLeftMedium,
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                );
            default:
                return "Section Title";
        }
    };

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
        accentTextColor: {
            color: document.information.style.accentBackgroundColor,
        },
        accentBackgroundColor: {
            backgroundColor: document.information.style.accentBackgroundColor,
        },
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
        marginLeftSmall: {
            marginLeft: fontSize / 4,
        },
        marginLeftMedium: {
            marginLeft: fontSize / 2,
        },
        marginLeftLarge: {
            marginLeft: fontSize,
        },
        textLeftAlign: {
            textAlign: "left",
        },
        textCenterAlign: {
            textAlign: "center",
        },
        textRightAlign: {
            textAlign: "right",
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
        x2Large: {
            fontFamily: font,
            fontSize: fontSize * 2.5,
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
            minWidth: fontSize / 3,
            minHeight: fontSize / 3,
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
            paddingLeft: fontSize / 4,
            gap: fontSize / 2,
        },
        bulletItem30: {
            flexBasis: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize / 2,
        },
        rowContainerWrap: {
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        rowContainerBottom: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: fontSize / 1.5,
        },
        rowContainerSpaceBetweenBottom: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: fontSize / 1.5,
        },
        rowContainerSpaceBetweenTop: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        rowContainerTop: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        initialsBox: {
            minWidth: fontSize * 6,
            minHeight: fontSize * 6,
            backgroundColor: "transparent",
            border: `${fontSize / 6}px solid ${
                document.information.style.accentBackgroundColor
            }`,
            position: "relative",
        },
        firstInitial: {
            width: "50%",
            fontFamily: font,
            color: document.information.style.accentBackgroundColor,
            position: "absolute",
            top: fontSize / 2,
            left: fontSize / 2,
        },
        lastInitial: {
            fontFamily: font,
            color: document.information.style.accentBackgroundColor,
            position: "absolute",
            bottom: fontSize / 2,
            right: fontSize / 2,
        },
        diagonalBar: {
            width: fontSize / 6,
            height: "100%",
            backgroundColor: document.information.style.accentBackgroundColor,
            position: "absolute",
            top: "0",
            left: `calc(50% - ${fontSize / 12}px)`,
            transform: "rotate(45deg)",
        },
    });

    const headerVariants = {
        headerNamePositionBasic: {
            name: "Basic Header with Name and Position",
            description: "A basic header with your name and position.",
            keyWords: ["header", "name", "position", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        headerNamePositionContactBasic: {
            name: "Basic Header - Vertical",
            description:
                "A header with your name, position, and contact information.",
            keyWords: ["header", "name", "position", "title", "contact"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
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
        headerNamePositionContactRowBasic: {
            name: "Basic Header - Horizontal",
            description:
                "A header with your name, position, and contact information displayed as a row.",
            keyWords: ["header", "name", "position", "title", "contact", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowSpaceBetween}>
                        <View style={styles.columnGroupLeft}>
                            <Text style={styles.large}>
                                {document.information.firstName}{" "}
                                {document.information.lastName}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.position}
                            </Text>
                        </View>
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
                </View>
            ) : null,
        },
        headerNamePositionContactRowNexus: {
            name: "Nexus Header - Horizontal",
            description:
                "A header with your name, position, and contact information displayed as a row. Made to match the Nexus template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "row",
                "nexus",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainerSpaceBetweenTop}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerBottom}>
                                <View style={styles.initialsBox}>
                                    <Text
                                        style={{
                                            ...styles.firstInitial,
                                            ...styles.x2Large,
                                        }}
                                    >
                                        {document.information.firstName[0]}
                                    </Text>

                                    <Text
                                        style={{
                                            ...styles.lastInitial,
                                            ...styles.x2Large,
                                        }}
                                    >
                                        {document.information.lastName[0]}
                                    </Text>
                                </View>
                                <View style={styles.columnGroupLeft}>
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            ...styles.accentTextColor,
                                        }}
                                    >
                                        {document.information.firstName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            ...styles.accentTextColor,
                                        }}
                                    >
                                        {document.information.lastName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {document.information.position}
                                    </Text>
                                </View>
                            </View>
                        </View>
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
                </View>
            ) : null,
        },
    };

    const educationVariants = {
        educationShort: {
            name: "Brief Education",
            description:
                "A short education history that includes a bold heading, school name, degree, and graduation date.",
            keyWords: ["education", "school", "degree", "graduation", "short"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    {getSectionTitleComponent("Education")}
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
                    {getSectionTitleComponent("Education")}
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

    const skillsVariants = {
        skillsBulletRow: {
            name: "Skills - Brief, Bullet Points",
            description:
                "Your skills in a horizontal bullet point list. Ideal for a list of short skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <View style={{ ...styles.rowContainerWrap }}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem30} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsBullet: {
            name: "Skills - Detailed, Bullet Points",
            description:
                "Your skills in a vertical bullet point list. Ideal for a list of detailed skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent("Skills")}
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
        skillsComma: {
            name: "Skills - Brief, Comma-Separated",
            description:
                "Your skills in a comma separated list. Ideal for a list of skills that are only 1 or 2 words long. Useful for when you want to save space.",
            keyWords: ["skills", "abilities", "strengths", "short", "comma"],
            // short skills are displayed as a comma separated list
            component: fontSize ? (
                <View style={styles.sectionContainer} id="shortSkillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <Text style={styles.small}>
                        {document.information.skillArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
    };

    return {
        ...headerVariants,
        ...nameVariants,
        ...positionVariants,
        ...educationVariants,
        ...contactVariants,
        ...skillsVariants,
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
                    {getSectionTitleComponent("Summary")}
                    <Text style={styles.small}>
                        {document.information.summary}
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
                    {getSectionTitleComponent("Experience")}
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
                    {getSectionTitleComponent("Languages")}
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
                    {getSectionTitleComponent("Languages")}
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
                    {getSectionTitleComponent("Interests")}
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
                    {getSectionTitleComponent("Interests")}
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
                    {getSectionTitleComponent("Projects")}
                </View>
            ) : null,
        },
    };
};
