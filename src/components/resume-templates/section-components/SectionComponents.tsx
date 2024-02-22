"use client";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { useAppContext } from "@/app/providers";
import { updateDocumentArray } from "@/lib/document";
import DraggableContainer from "@/components/editor/draggable-section-container/DraggableContainer";
import SectionContainerEditor from "./section-container-editor/SectionContainerEditor";

const SectionComponents = ({
    document,
    font,
    fontSize,
    orderArray,
    margin,
    setOrderArray,
}: {
    document: any;
    font: string;
    fontSize: number;
    orderArray: string[];
    margin?: number;
    setOrderArray?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const { documentArray, setDocumentArray } = useAppContext();
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
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        degree: {
            fontSize: fontSize * 1.1,
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

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        if (!setOrderArray) return;
        if (!orderArray) return;
        // Create a copy of the orderArray
        const newOrderArray = [...orderArray];

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
        // Update the state with the new orderArray
        setOrderArray(newOrderArray);
    };

    const getSectionEditor = (id: string) => {
        switch (id) {
            case "namePositionVertical":
                return (
                    <SectionContainerEditor key={id}>
                        {namePositionSectionVertical}
                    </SectionContainerEditor>
                );
            case "name":
                return (
                    <SectionContainerEditor key={id}>
                        {nameSection}
                    </SectionContainerEditor>
                );
            case "position":
                return (
                    <SectionContainerEditor key={id}>
                        {positionSection}
                    </SectionContainerEditor>
                );
            case "contact":
                return (
                    <SectionContainerEditor key={id}>
                        {contactSection}
                    </SectionContainerEditor>
                );
            case "contactEmailPhoneWebsite":
                return (
                    <SectionContainerEditor key={id}>
                        {contactEmailPhoneWebsiteSection}
                    </SectionContainerEditor>
                );
            case "contactEmailPhone":
                return (
                    <SectionContainerEditor key={id}>
                        {contactEmailPhoneSection}
                    </SectionContainerEditor>
                );
            case "contactEmailWebsite":
                return (
                    <SectionContainerEditor key={id}>
                        {contactEmailWebsiteSection}
                    </SectionContainerEditor>
                );
            case "contactPhoneWebsite":
                return (
                    <SectionContainerEditor key={id}>
                        {contactPhoneWebsiteSection}
                    </SectionContainerEditor>
                );
            case "summary":
                return (
                    <SectionContainerEditor key={id}>
                        {summarySection}
                    </SectionContainerEditor>
                );
            case "skills":
                return (
                    <SectionContainerEditor key={id}>
                        {skillSection}
                    </SectionContainerEditor>
                );
            case "shortSkills":
                return (
                    <SectionContainerEditor key={id}>
                        {shortSkillSection}
                    </SectionContainerEditor>
                );
            case "experience":
                return (
                    <SectionContainerEditor key={id}>
                        {experienceSection}
                    </SectionContainerEditor>
                );
            case "education":
                return (
                    <SectionContainerEditor key={id}>
                        {educationSection}
                    </SectionContainerEditor>
                );
            case "languages":
                return (
                    <SectionContainerEditor key={id}>
                        {languageSection}
                    </SectionContainerEditor>
                );
            case "interests":
                return (
                    <SectionContainerEditor key={id}>
                        {interestSection}
                    </SectionContainerEditor>
                );
            case "projects":
                return (
                    <SectionContainerEditor key={id}>
                        {projectSection}
                    </SectionContainerEditor>
                );
            default:
                return null;
        }
    };

    const getSectionDownload = (id: string) => {
        switch (id) {
            case "namePositionVertical":
                return namePositionSectionVertical;
            case "name":
                return nameSection;
            case "position":
                return positionSection;
            case "contact":
                return contactSection;
            case "contactEmailPhoneWebsite":
                return contactEmailPhoneWebsiteSection;
            case "contactEmailPhone":
                return contactEmailPhoneSection;
            case "contactEmailWebsite":
                return contactEmailWebsiteSection;
            case "contactPhoneWebsite":
                return contactPhoneWebsiteSection;
            case "summary":
                return summarySection;
            case "skills":
                return skillSection;
            case "shortSkills":
                return shortSkillSection;
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

    const namePositionSectionVertical = (
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
    );

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

    const contactEmailPhoneWebsiteSection = (
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

    const contactEmailPhoneSection = (
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
    );

    const contactEmailWebsiteSection = (
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
    );

    const contactPhoneWebsiteSection = (
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

    const shortSkillSection = (
        <View style={styles.sectionContainer} id="shorkSkillsPdf">
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

    return orderArray.map((section: string, index: number) => {
        return setOrderArray ? (
            <DraggableContainer
                id={section}
                key={section}
                orderArray={orderArray}
                moveSection={moveSection}
            >
                {getSectionEditor(section)}
            </DraggableContainer>
        ) : (
            getSectionDownload(section)
        );
    });
};

export default SectionComponents;
