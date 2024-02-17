"use client";
//import styles from "./Basic.module.css";
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
        view: {
            display: "flex",
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            fontSize: fontSize,
            fontFamily: "Times-Roman",
        },
        text: {
            fontSize: fontSize * 1.5,
            marginTop: margin,
            marginLeft: margin,
            marginRight: margin,
        },
    });

    return (
        <Document title="Resume">
            <Page wrap={false} style={styles.page}>
                <View style={styles.view} ref={templateRef}>
                    <Text style={styles.text}>
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
        <main className={`${styles.container} ${inter.className}`}>
            <section className={styles.template} ref={templateRef}>
                <p
                    className={styles.text}
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
