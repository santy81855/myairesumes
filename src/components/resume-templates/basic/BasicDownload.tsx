"use client";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

type DocumentProps = {
    document: any;
};

const BasicDownload = ({ document }: DocumentProps) => {
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };
    const margin = 16;
    const fontSize = 11;

    Font.registerHyphenationCallback(hyphenationCallback);
    // register inter font
    Font.register({
        family: "Inter",
        src: "/fonts/inter.ttf",
        fontStyle: "normal",
        fontWeight: "normal",
    });

    // Create styles
    const styles = StyleSheet.create({
        document: {
            width: "100%",
            height: "100%",
        },
        page: {
            width: "100%",
            height: "100%",
        },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            fontSize: fontSize,
            fontFamily: "Times-Roman",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize,
        },
        sectionContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: margin,
            paddingRight: margin,
            gap: fontSize / 4,
        },
        sectionTitle: {
            fontSize: fontSize * 1.3,
            fontWeight: "bold",
        },
        name: {
            fontSize: fontSize * 2,
            fontWeight: "bold",
            paddingTop: margin,
        },
        title: {
            fontSize: fontSize * 1.2,
            fontWeight: "light",
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
            width: "100%",
        },
        educationItemContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 2,
        },
        educationTopRow: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        school: {
            fontSize: fontSize * 1.2,
            fontWeight: "bold",
        },
        degree: {
            fontSize: fontSize * 1.1,
            fontWeight: "light",
        },
        experienceItemContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 2,
        },
        companyTopRow: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        company: {
            fontSize: fontSize * 1.2,
            fontWeight: "bold",
        },
        date: {
            fontSize: fontSize,
            fontWeight: "light",
        },
        position: {
            fontSize: fontSize * 1.1,
            fontWeight: "light",
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

    const nameSection = (
        <View style={styles.sectionContainer}>
            <Text style={styles.name}>
                {document.information.firstName} {document.information.lastName}
            </Text>
        </View>
    );

    const positionSection = (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{document.information.position}</Text>
        </View>
    );

    const contactSection = (
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
    );

    const summarySection = (
        <View style={styles.sectionContainer} id="summaryPdf">
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.contentText}>
                Experienced professional with diverse skills in leadership,
                communication, and problem-solving. Proven track record of
                achieving goals and driving results. Strong team player with
                excellent organizational abilities. Experienced amazing
                wonderful professional with diverse skills in leadership,
                communication, and problem-solving. Proven track record of
                achieving goals and driving results. Strong team player with
                excellent organizational abilities.
            </Text>
        </View>
    );

    const skillSection = (
        <View style={styles.sectionContainer} id="skillsPdf">
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.contentText}>
                Leadership, Communication, Teamwork, Problem-solving, Time
                management, Adaptability, Creativity, Technical proficiency,
                Analytical skills, Customer service.
            </Text>
        </View>
    );

    const experienceSection = (
        <View style={styles.sectionContainer} id="experiencePdf">
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.experienceItemContainer}>
                <View style={styles.companyTopRow}>
                    <Text style={styles.company}>Google</Text>
                    <Text style={styles.date}>2019 - Present</Text>
                </View>
                <Text style={styles.position}>Business Analyst</Text>
                <View style={styles.bulletItemContainer}>
                    <View style={styles.bulletItem}>
                        <View style={styles.bullet}></View>
                        <Text style={styles.contentText}>
                            Lead a team of 5 analysts to drive results and
                            achieve goals. atnosehu toehu tehu ethut etuheot n
                            tah uetoh tueh uotehu sntaoeutnh deo u oedhuone uoe
                            utoaedu o
                        </Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <View style={styles.bullet}></View>
                        <Text style={styles.contentText}>
                            Developed and implemented new strategies to improve
                            customer service.
                        </Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <View style={styles.bullet}></View>
                        <Text style={styles.contentText}>
                            Conducted market research and analysis to identify
                            new opportunities for growth.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const educationSection = (
        <View style={styles.sectionContainer} id="educationPdf">
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.educationItemContainer}>
                <View style={styles.educationTopRow}>
                    <Text style={styles.school}>Georgia Tech</Text>
                    <Text style={styles.date}>2015 - 2019</Text>
                </View>
                <Text style={styles.degree}>
                    Bachelor of Science in Business Administration
                </Text>
                <View style={styles.bulletItemContainer}>
                    <View style={styles.bulletItem}>
                        <View style={styles.bullet}></View>
                        <Text style={styles.contentText}>
                            Graduated with honors and a 3.8 GPA.
                        </Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <View style={styles.bullet}></View>
                        <Text style={styles.contentText}>
                            Completed a minor in Computer Science.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const languageSection = (
        <View style={styles.sectionContainer} id="languagesPdf">
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.contentText}>
                English (Native), Spanish (Fluent), French (Conversational)
            </Text>
        </View>
    );

    const interestSection = (
        <View style={styles.sectionContainer} id="interests">
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.contentText}>
                Travel, Hiking, Reading, Cooking, Photography, Music
            </Text>
        </View>
    );

    const projectSection = (
        <View style={styles.sectionContainer} id="projects">
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.horizontalLine}></View>
        </View>
    );

    const getSection = (id: string) => {
        switch (id) {
            case "name":
                return nameSection;
            case "position":
                return positionSection;
            case "contact":
                return contactSection;
            case "summary":
                return summarySection;
            case "skills":
                return skillSection;
            case "experience":
                return experienceSection;
            case "education":
                return educationSection;
            case "languages":
                return languageSection;
            case "interests":
                return interestSection;
            case "projects":
                return projectSection;
            default:
                return null;
        }
    };

    return (
        <Document title="Resume">
            {document.information.sectionOrder.map(
                (array: string[], index: number) => (
                    <Page key={index} wrap={false} style={styles.page}>
                        <View style={styles.pageContainer}>
                            {array.map((section: string, innerIndex: number) =>
                                getSection(section)
                            )}
                        </View>
                    </Page>
                )
            )}
        </Document>
    );
};

export default BasicDownload;
