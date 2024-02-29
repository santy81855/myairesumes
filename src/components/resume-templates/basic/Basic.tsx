"use client";
import styles from "./Basic.module.css";
import { useAppContext } from "@/app/providers";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { DraggableContainer, updateDocumentArray } from "@/features/editor";
import Section from "../Section/Section";
import SectionContainerEditor from "../section-components/section-container-editor/SectionContainerEditor";

type BasicProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Basic = ({ document, isEditor, isDownload, isPreview }: BasicProps) => {
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(
        document.information.style.baseFontSize
    );
    const [margin, setMargin] = useState(
        document.information.style.baseMarginSize
    );

    useEffect(() => {
        if (isDownload) return;
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = document.information.style.baseFontSize * (width / 610);
        setFontSize(size);
        let newMargin =
            document.information.style.baseMarginSize * (width / 610);
        setMargin(newMargin);

        // handle the text scaling
        function handleResize() {
            if (isDownload) return;
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size =
                (document.information.style.baseFontSize + 5) * (width / 610);
            setFontSize(size);
            let newMargin =
                document.information.style.baseMarginSize * (width / 610);
            setMargin(newMargin);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [document]);

    const checkoverflow = () => {
        if (!templateRef.current) return;
        const content = templateRef.current as unknown as HTMLElement;
        // check if it is overflowing by more than like 2 pixels
        if (content.scrollHeight - content.clientHeight > 2) {
            const bigRect = content.getBoundingClientRect();

            const children = content.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const childRect = child.getBoundingClientRect();

                if (childRect.bottom > bigRect.bottom) {
                    console.log("overflow in child: ");
                    console.log(child);
                }
            }
        }
    };

    // Create pdfStyles
    const pdfStyles = StyleSheet.create({
        page: { width: "100%", height: "100%" },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: margin,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize,
            overflow: "hidden",
        },
    });

    if (isEditor) {
        return (
            <Document>
                <Page wrap={false} style={pdfStyles.page}>
                    <View
                        wrap={false}
                        style={pdfStyles.pageContainer}
                        ref={templateRef}
                    >
                        {document.information.sectionOrder[
                            document.currentPage - 1
                        ].map((section: string, index: number) => (
                            <DraggableContainer
                                key={section + index.toString()}
                                id={`${section}-${index}`}
                                orderArray={
                                    document.information.sectionOrder[
                                        document.currentPage - 1
                                    ]
                                }
                                document={document}
                            >
                                <SectionContainerEditor document={document}>
                                    <Section
                                        sectionId={section}
                                        document={document}
                                        templateRef={templateRef}
                                    />
                                </SectionContainerEditor>
                            </DraggableContainer>
                        ))}
                    </View>
                </Page>
            </Document>
        );
    }
    if (isDownload) {
        return (
            <Document title="Resume">
                {document.information.sectionOrder.map(
                    (array: string[], index: number) => (
                        <Page
                            wrap={false}
                            key={index}
                            style={pdfStyles.page}
                            size={[610, 789.4]}
                        >
                            <View wrap={false} style={pdfStyles.pageContainer}>
                                {array.map((section: string, index: number) => (
                                    <Section
                                        key={section + index.toString()}
                                        sectionId={section}
                                        document={document}
                                    />
                                ))}
                            </View>
                        </Page>
                    )
                )}
            </Document>
        );
    }
};

export default Basic;
