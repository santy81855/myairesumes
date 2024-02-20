"use client";
import styles from "./Basic.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import DraggableContainer from "@/components/editor/draggable-section-container/DraggableContainer";

type ResumeProps = {
    resume: any;
    id: string;
};

const Basic = ({ resume, id }: ResumeProps) => {
    const information = resume;
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(16);
    const [orderArray, setOrderArray] = useState(resume.sectionOrder[0]);

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = 11 * (width / 610);
        setFontSize(size);
        let newMargin = 16 * (width / 610);
        setMargin(newMargin);

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            setFontSize(size);
            //  do the same for the margin value, which should be 16px at 610px width
            let newMargin = 16 * (width / 610);
            setMargin(newMargin);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };

    // function to handle work break
    Font.registerHyphenationCallback(hyphenationCallback);

    /**
     * Available fonts
     * Courier
     * Courier-Bold
     * Courier-Oblique
     * Courier-BoldOblique
     * Helvetica
     * Helvetica-Bold
     * Helvetica-Oblique
     * Helvetica-BoldOblique
     * Times-Roman
     */

    // Create pdfstyles
    const pdfstyles = StyleSheet.create({
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
        <View style={pdfstyles.sectionContainer}>
            <Text style={pdfstyles.name}>
                {information.firstName} {information.lastName}
            </Text>
        </View>
    );

    const positionSection = (
        <View style={pdfstyles.sectionContainer}>
            <Text style={pdfstyles.title}>{information.position}</Text>
        </View>
    );

    const contactSection = (
        <View style={pdfstyles.sectionContainer}>
            <View style={pdfstyles.rowContainer}>
                <Text style={pdfstyles.contact}>
                    {information.contactInfo.email}
                </Text>
                <Text style={pdfstyles.contact}>|</Text>
                <Text style={pdfstyles.contact}>
                    {information.contactInfo.phone}
                </Text>
                <Text style={pdfstyles.contact}>|</Text>
                <Text style={pdfstyles.contact}>
                    {information.contactInfo.website}
                </Text>
            </View>
        </View>
    );

    const moveSection = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const newOrderArray = [...orderArray]; // Create a copy of the orderArray
            const draggedItem = newOrderArray[dragIndex]; // Get the dragged item

            // Remove the dragged item from its original position
            newOrderArray.splice(dragIndex, 1);
            // Insert the dragged item at the new position
            newOrderArray.splice(hoverIndex, 0, draggedItem);

            setOrderArray(newOrderArray); // Update the state with the new orderArray
        },
        [orderArray]
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

    const summarySection = (
        <View style={pdfstyles.sectionContainer} id="summaryPdf">
            <Text style={pdfstyles.sectionTitle}>Summary</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
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
        <View style={pdfstyles.sectionContainer} id="skillsPdf">
            <Text style={pdfstyles.sectionTitle}>Skills</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
                Leadership, Communication, Teamwork, Problem-solving, Time
                management, Adaptability, Creativity, Technical proficiency,
                Analytical skills, Customer service.
            </Text>
        </View>
    );

    const experienceSection = (
        <View style={pdfstyles.sectionContainer} id="experiencePdf">
            <Text style={pdfstyles.sectionTitle}>Experience</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <View style={pdfstyles.experienceItemContainer}>
                <View style={pdfstyles.companyTopRow}>
                    <Text style={pdfstyles.company}>Google</Text>
                    <Text style={pdfstyles.date}>2019 - Present</Text>
                </View>
                <Text style={pdfstyles.position}>Business Analyst</Text>
                <View style={pdfstyles.bulletItemContainer}>
                    <View style={pdfstyles.bulletItem}>
                        <View style={pdfstyles.bullet}></View>
                        <Text style={pdfstyles.contentText}>
                            Lead a team of 5 analysts to drive results and
                            achieve goals. atnosehu toehu tehu ethut etuheot n
                            tah uetoh tueh uotehu sntaoeutnh deo u oedhuone uoe
                            utoaedu o
                        </Text>
                    </View>
                    <View style={pdfstyles.bulletItem}>
                        <View style={pdfstyles.bullet}></View>
                        <Text style={pdfstyles.contentText}>
                            Developed and implemented new strategies to improve
                            customer service.
                        </Text>
                    </View>
                    <View style={pdfstyles.bulletItem}>
                        <View style={pdfstyles.bullet}></View>
                        <Text style={pdfstyles.contentText}>
                            Conducted market research and analysis to identify
                            new opportunities for growth.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const educationSection = (
        <View style={pdfstyles.sectionContainer} id="educationPdf">
            <Text style={pdfstyles.sectionTitle}>Education</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <View style={pdfstyles.educationItemContainer}>
                <View style={pdfstyles.educationTopRow}>
                    <Text style={pdfstyles.school}>Georgia Tech</Text>
                    <Text style={pdfstyles.date}>2015 - 2019</Text>
                </View>
                <Text style={pdfstyles.degree}>
                    Bachelor of Science in Business Administration
                </Text>
                <View style={pdfstyles.bulletItemContainer}>
                    <View style={pdfstyles.bulletItem}>
                        <View style={pdfstyles.bullet}></View>
                        <Text style={pdfstyles.contentText}>
                            Graduated with honors and a 3.8 GPA.
                        </Text>
                    </View>
                    <View style={pdfstyles.bulletItem}>
                        <View style={pdfstyles.bullet}></View>
                        <Text style={pdfstyles.contentText}>
                            Completed a minor in Computer Science.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const languageSection = (
        <View style={pdfstyles.sectionContainer} id="languagesPdf">
            <Text style={pdfstyles.sectionTitle}>Languages</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
                English (Native), Spanish (Fluent), French (Conversational)
            </Text>
        </View>
    );

    const interestSection = (
        <View style={pdfstyles.sectionContainer} id="interests">
            <Text style={pdfstyles.sectionTitle}>Interests</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
                Travel, Hiking, Reading, Cooking, Photography, Music
            </Text>
        </View>
    );

    const projectSection = (
        <View style={pdfstyles.sectionContainer} id="projects">
            <Text style={pdfstyles.sectionTitle}>Projects</Text>
            <View style={pdfstyles.horizontalLine}></View>
        </View>
    );

    return (
        <Document title="Resume">
            <Page wrap={false} style={pdfstyles.page}>
                <View style={pdfstyles.pageContainer} ref={templateRef}>
                    {orderArray.map((section: string, index: number) => {
                        return (
                            <DraggableContainer
                                id={section}
                                key={section}
                                orderArray={orderArray}
                                setOrderArray={setOrderArray}
                                moveSection={moveSection}
                            >
                                {getSection(section)}
                            </DraggableContainer>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
};

export default Basic;
