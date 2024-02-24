"use client";
import { useAppContext } from "@/app/providers";
import { useState, useEffect, useRef } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import SectionComponents from "../section-components/SectionComponents";

type BasicProps = {
    index: number;
    resumeId: string;
};

const Basic = ({ index, resumeId }: BasicProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(11);
    const [document, setDocument] = useState(
        documentArray.find((document) => document.id === resumeId)
    );
    useEffect(() => {
        const updatedDocument = documentArray.find(
            (document) => document.id === resumeId
        );
        if (!updatedDocument) return;
        setDocument(updatedDocument);
        setOrderArray(
            updatedDocument.information.sectionOrder[
                updatedDocument.currentPage - 1
            ]
        );
    }, [documentArray]);

    const [orderArray, setOrderArray] = useState(
        document?.information.sectionOrder[document.currentPage - 1]
    );

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = 11 * (width / 610);
        setFontSize(size);
        let newMargin = 11 * (width / 610);
        setMargin(newMargin);

        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            setFontSize(size);
            //  do the same for the margin value, which should be 16px at 610px width
            let newMargin = 11 * (width / 610);
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
        page: {
            width: "100%",
            height: "100%",
        },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: margin,
            fontSize: fontSize,
            fontFamily: "Times-Roman",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: margin,
        },
    });

    return (
        document && (
            <Document>
                <Page wrap={false} style={styles.page}>
                    <View
                        wrap={false}
                        style={styles.pageContainer}
                        ref={templateRef}
                    >
                        <SectionComponents
                            document={document}
                            font={document.information.font}
                            fontSize={fontSize}
                            margin={margin}
                            orderArray={orderArray}
                            setOrderArray={setOrderArray}
                        />
                    </View>
                </Page>
            </Document>
        )
    );
};

export default Basic;
