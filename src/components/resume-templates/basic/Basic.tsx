"use client";
import styles from "./Basic.module.css";
import { useState, useEffect, useRef } from "react";
import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

type ResumeProps = {
    download?: boolean;
};

const Basic = ({ download }: ResumeProps) => {
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(16);

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template || download) return;
        const { width, height } = template.getBoundingClientRect();
        let size = 11 * (width / 610);
        setFontSize(size);
        let newMargin = 16 * (width / 610);
        setMargin(newMargin);

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template || download) return;
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
            paddingInline: margin,
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
            width: fontSize / 3,
            height: fontSize / 3,
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
        },
        text: {
            fontSize: fontSize * 1.5,
            marginTop: margin,
            marginLeft: margin,
            marginRight: margin,
        },
    });

    const contactSection = (
        <View style={pdfstyles.sectionContainer} id="contact">
            <Text style={pdfstyles.name}>Santiago Garcia</Text>
            <Text style={pdfstyles.title}>Business Analyst</Text>
            <view style={pdfstyles.rowContainer}>
                <Text style={pdfstyles.contact}>(678) 735-9580</Text>
                <view style={pdfstyles.bullet}></view>
                <Text style={pdfstyles.contact}>santy@santiagogarcia.dev</Text>
            </view>
        </View>
    );

    const summarySection = (
        <View style={pdfstyles.sectionContainer} id="summary">
            <Text style={pdfstyles.sectionTitle}>Summary</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
                Experienced professional with diverse skills in leadership,
                communication, and problem-solving. Proven track record of
                achieving goals and driving results. Strong team player with
                excellent organizational abilities. Experienced professional
                with diverse skills in leadership, communication, and
                problem-solving. Proven track record of achieving goals and
                driving results. Strong team player with excellent
                organizational abilities.
            </Text>
        </View>
    );

    const skillSection = (
        <View style={pdfstyles.sectionContainer} id="skills">
            <Text style={pdfstyles.sectionTitle}>Skills</Text>
            <View style={pdfstyles.horizontalLine}></View>
            <Text style={pdfstyles.contentText}>
                Leadership, Communication, Teamwork, Problem-solving, Time
                management, Adaptability, Creativity, Technical proficiency,
                Analytical skills, Customer service.
            </Text>
        </View>
    );

    const handleMouseEnter = (e: any) => {
        const divElement = document.getElementById("section");
        if (!divElement) return;
        divElement.style.backgroundColor = "red";
    };

    const handleMouseLeave = (e: any) => {
        const divElement = document.getElementById("section");
        if (!divElement) return;
        divElement.style.backgroundColor = "white";
    };

    return (
        <Document title="Resume">
            <Page wrap={false} style={pdfstyles.page}>
                <View style={pdfstyles.pageContainer} ref={templateRef}>
                    <div
                        id="section"
                        className={styles.sectionContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {contactSection}
                    </div>
                    <div
                        id="section"
                        className={styles.sectionContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {summarySection}
                    </div>
                    <div
                        id="section"
                        className={styles.sectionContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {skillSection}
                    </div>
                    <Text style={pdfstyles.text}>
                        tho auntoheau tnaoehu toehuntshetunho easntuh asontedhu
                        tnaoeh utnaoeh utnshaoesnutaoheuaoedutnshaoe utnshaoe
                        utnshoae uoaedu aoetuh aoeudaoe
                        udheduhindihuedinehotdisb mbva oevmubavoe uhaoedu
                        oaecrug acogrucae oucgraoeuclroaeg ucaoergu olarc
                        ugcrlag oercug oaecrug acogrucae oucgraoeuclroaeg
                    </Text>
                </View>
            </Page>
        </Document>
        /*
        <main className={`${pdfstyles.container} ${inter.className}`}>
            <section className={pdfstyles.template} ref={templateRef}>
                <p
                    className={pdfstyles.text}
                    style={{
                        fontSize: 1.5 * fontSize,
                        marginTop: margin,
                        marginLeft: margin,
                        marginRight: margin,
                    }}
                >
                    tho auntoheau tnaoehu toehuntshetunho easntuh asontedhu
                    tnaoeh utnaoeh utnshaoesnutaoheuaoedutnshaoe utnshaoe
                    utnshoae uoaedu aoetuh aoeudaoe udheduhindihuedinehotdisb
                    mbva oevmubavoe uhaoedu oaecrug acogrucae oucgraoeuclroaeg
                    ucaoergu olarc ugcrlag oercug oaecrug acogrucae
                    oucgraoeuclroaeg
                </p>
            </section>
        </main>
        */
    );
};

export default Basic;
