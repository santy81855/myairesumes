"use client";
import styles from "./Basic.module.css";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect, useRef } from "react";

const Basic = () => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);
    const TEMPLATE_NAME = "Clean";
    const [fontSize, setFontSize] = useState("11px");
    const [margin, setMargin] = useState(1);

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        console.log(template);
        const { width, height } = template.getBoundingClientRect();
        setDivSize({ width, height });
        if (template) {
            let size = 11 * (width / 610);
            setFontSize(size + "px");
        }
        // handle the text scaling
        function handleResize() {
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            setDivSize({ width, height });
            let size = 11 * (width / 610);
            setFontSize(size + "px");
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Create styles
    const pdfStyles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "white",
            fontSize: fontSize,
        },
        section: {
            width: `calc(100% - ${margin}rem`,
            height: `calc(100% - ${margin}rem`,
            margin: "auto",
            backgroundColor: "red",
        },
    });

    return (
        <Document style={pdfStyles.container}>
            <Page wrap={false} style={pdfStyles.section} ref={templateRef}>
                <p className={styles.text}>
                    50 words of lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </Page>
        </Document>
    );
};

export default Basic;
