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
import { DraggableContainer, updateDocumentArray } from "@/features/editor";
import Section from "../Section/Section";
import SectionContainerEditor from "../section-components/section-container-editor/SectionContainerEditor";

type BasicProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Fresh = ({ document, isEditor, isDownload, isPreview }: BasicProps) => {
    const templateRef = useRef(null);
    const [fontSize, setFontSize] = useState(
        document.information.style.baseFontSize
    );
    const [margin, setMargin] = useState(
        document.information.style.baseMarginSize
    );
    const [sectionGap, setSectionGap] = useState(
        document.information.style.baseSectionGap
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
        let newSectionGap =
            document.information.style.baseSectionGap * (width / 610);
        setSectionGap(newSectionGap);

        // handle the text scaling
        function handleResize() {
            if (isDownload) return;
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = document.information.style.baseFontSize * (width / 610);
            setFontSize(size);
            let newMargin =
                document.information.style.baseMarginSize * (width / 610);
            setMargin(newMargin);
            let newSectionGap =
                document.information.style.baseSectionGap * (width / 610);
            setSectionGap(newSectionGap);
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
    const pdfStyles = isDownload
        ? StyleSheet.create({
              page: { width: "100%", height: "100%" },
              pageContainer: {
                  width: "100%",
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
              },
              pageContainerLeft: {
                  backgroundColor:
                      document.information.style.accentBackgroundColor,
                  width: "2%",
                  height: "100%",
              },
              pageContainerRight: {
                  backgroundColor: "white",
                  width: "98%",
                  height: "100%",
                  paddingLeft: document.information.style.baseMarginSize,
                  paddingTop: document.information.style.baseMarginSize,
                  paddingRight: document.information.style.baseMarginSize,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: document.information.style.baseSectionGap,
                  overflow: "hidden",
              },
          })
        : StyleSheet.create({
              page: { width: "100%", height: "100%" },
              pageContainer: {
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
              },
              pageContainerLeft: {
                  backgroundColor:
                      document.information.style.accentBackgroundColor,
                  width: "2%",
                  height: "100%",
              },
              pageContainerRight: {
                  backgroundColor: "white",
                  width: "98%",
                  height: "100%",
                  paddingLeft: margin,
                  paddingTop: margin,
                  paddingRight: margin,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: sectionGap,
                  overflow: "hidden",
              },
          });

    if (isPreview) {
        return (
            <Document>
                <Page wrap={false} style={pdfStyles.page}>
                    <View
                        wrap={false}
                        style={pdfStyles.pageContainer}
                        ref={templateRef}
                    >
                        <View
                            wrap={false}
                            style={pdfStyles.pageContainerLeft}
                        ></View>
                        <View wrap={false} style={pdfStyles.pageContainerRight}>
                            {document.information.sectionOrder[
                                document.currentPage - 1
                            ].map((section: string, index: number) => {
                                return (
                                    <Section
                                        key={section + index.toString()}
                                        sectionId={section}
                                        document={document}
                                        templateRef={templateRef}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }

    if (isEditor && document && document.currentPage > 1) {
        return (
            <Document>
                <Page wrap={false} style={pdfStyles.page}>
                    <View
                        wrap={false}
                        style={pdfStyles.pageContainer}
                        ref={templateRef}
                    >
                        <View
                            wrap={false}
                            style={pdfStyles.pageContainerLeft}
                        ></View>
                        <View wrap={false} style={pdfStyles.pageContainerRight}>
                            {document.information.sectionOrder[
                                document.currentPage - 1
                            ].map((section: string, index: number) => {
                                return (
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
                                        <SectionContainerEditor
                                            document={document}
                                        >
                                            <Section
                                                sectionId={section}
                                                document={document}
                                                templateRef={templateRef}
                                            />
                                        </SectionContainerEditor>
                                    </DraggableContainer>
                                );
                            })}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }

    if (isEditor && document && document.currentPage === 1) {
        return (
            <Document>
                <Page wrap={false} style={pdfStyles.page}>
                    <View
                        wrap={false}
                        style={pdfStyles.pageContainer}
                        ref={templateRef}
                    >
                        <View
                            wrap={false}
                            style={pdfStyles.pageContainerLeft}
                        ></View>
                        <View wrap={false} style={pdfStyles.pageContainerRight}>
                            {document.information.sectionOrder[
                                document.currentPage - 1
                            ].map((section: string, index: number) => {
                                return (
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
                                        <SectionContainerEditor
                                            document={document}
                                        >
                                            <Section
                                                sectionId={section}
                                                document={document}
                                                templateRef={templateRef}
                                            />
                                        </SectionContainerEditor>
                                    </DraggableContainer>
                                );
                            })}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }

    if (isDownload) {
        return (
            <Document title="Resume">
                {document.information.sectionOrder.map(
                    (array: string[], index: number) => {
                        return (
                            <Page
                                wrap={false}
                                key={index}
                                style={pdfStyles.page}
                                size={[610, 789.4]}
                            >
                                <View
                                    wrap={false}
                                    style={pdfStyles.pageContainer}
                                >
                                    <View
                                        wrap={false}
                                        style={pdfStyles.pageContainerLeft}
                                    ></View>
                                    <View
                                        wrap={false}
                                        style={pdfStyles.pageContainerRight}
                                    >
                                        {array.map(
                                            (
                                                section: string,
                                                index: number
                                            ) => {
                                                return (
                                                    <Section
                                                        key={
                                                            section +
                                                            index.toString()
                                                        }
                                                        sectionId={section}
                                                        document={document}
                                                    />
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                            </Page>
                        );
                    }
                )}
            </Document>
        );
    }
};

export default Fresh;
