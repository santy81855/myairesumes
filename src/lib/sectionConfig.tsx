import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

export const SectionConfig = (document: any, fontSize?: any, font?: string) => {
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
        name: {
            fontSize: fontSize * 2,
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        title: {
            fontSize: fontSize * 1.2,
        },
        contact: {
            fontSize: fontSize,
        },
        rowContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 1.5,
        },
        columnGroup: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
        contentText: {
            fontSize: fontSize,
            fontFamily: font,
            fontWeight: "normal",
            width: "100%",
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
        school: {
            fontSize: fontSize * 1.2,
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        degree: {
            fontSize: fontSize * 1.1,
        },
        company: {
            fontSize: fontSize * 1.2,
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        date: {
            fontSize: fontSize,
        },
        position: {
            fontSize: fontSize * 1.1,
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

    return {
        name: {
            name: "Position",
            description: "Your job title",
            keyWords: ["position", "job", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.name}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
        position: {
            name: "Position",
            description: "Your job title",
            keyWords: ["position", "job", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.title}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        contact: {
            name: "Contact",
            description: "Your contact information",
            keyWords: ["contact", "email", "phone", "website", "information"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhoneWebsite: {
            name: "Contact: Email, Phone, Website",
            description: "Your email, phone number, and website",
            keyWords: ["contact", "email", "phone", "website"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailPhone: {
            name: "Contact: Email, Phone",
            description: "Your email and phone number",
            keyWords: ["contact", "email", "phone"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.phone}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactEmailWebsite: {
            name: "Contact: Email, Website",
            description: "Your email and website",
            keyWords: ["contact", "email", "website"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
        contactPhoneWebsite: {
            name: "Contact: Phone, Website",
            description: "Your phone number and website",
            keyWords: ["contact", "phone", "website"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.contact}>|</Text>
                        <Text style={styles.contact}>
                            {document.information.contactInfo.website}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
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
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.contentText}>
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
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.bulletItemContainer}>
                        {document.information.skillArray.map(
                            (skill: string) => (
                                <View style={styles.bulletItem}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.contentText}>
                                        {skill}
                                    </Text>
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
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.contentText}>
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
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {document.information.experienceArray.map(
                            (experience: any, index: number) => (
                                <View key={index} style={styles.arrayItem}>
                                    <View style={styles.rowSpaceBetween}>
                                        <Text style={styles.company}>
                                            {experience.company}
                                        </Text>
                                        <Text style={styles.date}>
                                            {experience.startDate} -{" "}
                                            {experience.endDate}
                                        </Text>
                                    </View>
                                    <Text style={styles.position}>
                                        {experience.position}
                                    </Text>
                                    <Text style={styles.contentText}>
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
                                                    <Text
                                                        style={
                                                            styles.contentText
                                                        }
                                                    >
                                                        {bullet}
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        education: {
            name: "Education",
            description: "Your educational history.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        {document.information.educationArray.map(
                            (education: any, index: number) => (
                                <View key={index} style={styles.arrayItem}>
                                    <View style={styles.rowSpaceBetween}>
                                        <Text style={styles.school}>
                                            {education.school}
                                        </Text>
                                        <Text style={styles.date}>
                                            {education.startDate} -{" "}
                                            {education.endDate}
                                        </Text>
                                    </View>
                                    <Text style={styles.degree}>
                                        {education.degree}
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
                                                    <Text
                                                        style={
                                                            styles.contentText
                                                        }
                                                    >
                                                        {bullet}
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </View>
                            )
                        )}
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
                    <Text style={styles.sectionTitle}>Languages</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.arrayContainer}>
                        <View style={styles.bulletItemContainer}>
                            {document.information.languageArray.map(
                                (skill: string) => (
                                    <View style={styles.bulletItem}>
                                        <View style={styles.bullet}></View>
                                        <Text style={styles.contentText}>
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
                    <Text style={styles.sectionTitle}>Languages</Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.contentText}>
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
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.bulletItemContainer}>
                        {document.information.interestArray.map(
                            (skill: string) => (
                                <View style={styles.bulletItem}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.contentText}>
                                        {skill}
                                    </Text>
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
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <View style={styles.horizontalLine}></View>
                    <Text style={styles.contentText}>
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
                    <Text style={styles.sectionTitle}>Projects</Text>
                    <View style={styles.horizontalLine}></View>
                </View>
            ) : null,
        },
        namePositionVertical: {
            name: "Name and Position",
            description: "Your name and job title",
            keyWords: ["name", "position", "job", "title", "first", "last"],
            component: fontSize ? (
                <View style={styles.columnGroup}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.name}>
                            {document.information.firstName}{" "}
                            {document.information.lastName}
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.title}>
                            {document.information.position}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
    };
};
