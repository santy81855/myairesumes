"use client";
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
import SectionComponents from "../section-components/SectionComponents";
import {
    DraggableContainer,
    updateDocumentArray,
    SectionConfig,
} from "@/features/editor";

type BasicProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Basic = ({ document, isEditor, isDownload, isPreview }: BasicProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(11);
    const [margin, setMargin] = useState(11);

    useEffect(() => {
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        console.log(width);
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

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        if (isEditor) {
            // Create a copy of the sectionOrder
            const newOrderArray = [...document.information.sectionOrder];

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
        }
    };

    // Create styles
    const styles = StyleSheet.create({
        page: { flexDirection: "row" },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: margin,
            fontSize: fontSize,
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
                {isEditor && (
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
                                orderArray={
                                    document.information.sectionOrder[
                                        document.currentPage - 1
                                    ]
                                }
                            />
                        </View>
                    </Page>
                )}
                {isDownload &&
                    document.information.sectionOrder.map(
                        (array: string[], index: number) => (
                            <Page
                                wrap={false}
                                key={index}
                                style={styles.page}
                                size={[610, 789.4]}
                            >
                                <View wrap={false} style={styles.pageContainer}>
                                    <SectionComponents
                                        document={document}
                                        font="Times-Roman"
                                        fontSize={fontSize}
                                        margin={margin}
                                        orderArray={array}
                                        isDownload={true}
                                    />
                                </View>
                            </Page>
                        )
                    )}
            </Document>
        )
    );
};

export default Basic;
