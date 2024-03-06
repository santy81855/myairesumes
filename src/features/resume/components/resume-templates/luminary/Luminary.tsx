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
import { Section } from "@/features/resume";
import SectionContainerEditor from "../../section-container-editor/SectionContainerEditor";

type BasicProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
};

const Luminary = ({
    document,
    isEditor,
    isDownload,
    isPreview,
}: BasicProps) => {
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
    const [sectionOrder, setSectionOrder] = useState(
        document.information.sectionOrder[document.currentPage - 1]
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
              },
              extraPageContainer: {
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                  paddingLeft: document.information.style.baseMarginSize,
                  paddingRight: document.information.style.baseMarginSize,
                  paddingTop: document.information.style.baseMarginSize,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: document.information.style.baseSectionGap,
                  overflow: "hidden",
              },
              pageContainerLeft: {
                  backgroundColor: "#fafafa",
                  width: "30%",
                  height: "100%",
                  borderRightWidth: document.information.style.baseFontSize / 5,
                  borderRightColor:
                      document.information.style.accentBackgroundColor,
                  borderRightStyle: "solid",
                  paddingLeft: document.information.style.baseMarginSize,
                  paddingTop: document.information.style.baseMarginSize,
                  paddingRight: document.information.style.baseFontSize,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: document.information.style.baseSectionGap,
                  overflow: "hidden",
              },
              pageContainerRight: {
                  backgroundColor: "white",
                  width: "70%",
                  height: "100%",
                  paddingLeft: fontSize,
                  paddingRight: document.information.style.baseMarginSize,
                  paddingTop: document.information.style.baseMarginSize,
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
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
              },
              extraPageContainer: {
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
                  gap: sectionGap,
                  overflow: "hidden",
              },
              pageContainerLeft: {
                  backgroundColor: "#fafafa",
                  width: "30%",
                  height: "100%",
                  paddingLeft: margin,
                  paddingTop: margin,
                  paddingRight: fontSize,
                  borderRightWidth: fontSize / 5,
                  borderRightColor:
                      document.information.style.accentBackgroundColor,
                  borderRightStyle: "solid",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: sectionGap,
                  overflow: "hidden",
              },
              pageContainerRight: {
                  backgroundColor: "white",
                  width: "70%",
                  height: "100%",
                  paddingLeft: fontSize,
                  paddingRight: margin,
                  paddingTop: margin,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: sectionGap,
                  overflow: "hidden",
              },
          });

    const cutArray = (
        arr: string[],
        condition: string,
        isLeft: boolean
    ): string[] => {
        if (arr.length === 0) return arr;
        if (!arr.includes(condition)) return arr;
        if (arr.indexOf(condition) === 0 && !isLeft) return [];
        if (arr.indexOf(condition) === arr.length - 1 && isLeft) return [];
        const index = arr.indexOf(condition);
        if (!isLeft) {
            return arr.slice(0, index);
        } else {
            return arr.slice(index + 1, arr.length);
        }
    };

    if (isPreview) {
        return (
            <Document>
                <Page wrap={false} style={pdfStyles.page}>
                    <View
                        wrap={false}
                        style={pdfStyles.pageContainer}
                        ref={templateRef}
                    >
                        <View wrap={false} style={pdfStyles.pageContainerLeft}>
                            {cutArray(
                                document.information.sectionOrder[
                                    document.currentPage - 1
                                ],
                                "colBreak",
                                true
                            ).map((section: string, index: number) => {
                                return (
                                    <Section
                                        type="resume"
                                        key={section + index.toString()}
                                        sectionId={section}
                                        document={document}
                                        templateRef={templateRef}
                                    />
                                );
                            })}
                        </View>
                        <View wrap={false} style={pdfStyles.pageContainerRight}>
                            {cutArray(
                                document.information.sectionOrder[
                                    document.currentPage - 1
                                ],
                                "colBreak",
                                false
                            ).map((section: string, index: number) => {
                                return (
                                    <Section
                                        type="resume"
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
                        style={pdfStyles.extraPageContainer}
                        ref={templateRef}
                    >
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
                                        sectionId={section}
                                        document={document}
                                    >
                                        <Section
                                            type="resume"
                                            sectionId={section}
                                            document={document}
                                            templateRef={templateRef}
                                        />
                                    </SectionContainerEditor>
                                </DraggableContainer>
                            );
                        })}
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
                        <View wrap={false} style={pdfStyles.pageContainerLeft}>
                            {cutArray(
                                document.information.sectionOrder[
                                    document.currentPage - 1
                                ],
                                "colBreak",
                                true
                            ).map((section: string, index: number) => {
                                const breakIndex =
                                    document.information.sectionOrder[
                                        document.currentPage - 1
                                    ].indexOf("colBreak");
                                return (
                                    <DraggableContainer
                                        key={section + index.toString()}
                                        id={`${section}-${
                                            breakIndex + 1 + index
                                        }`}
                                        orderArray={
                                            document.information.sectionOrder[
                                                document.currentPage - 1
                                            ]
                                        }
                                        document={document}
                                    >
                                        <SectionContainerEditor
                                            sectionId={section}
                                            document={document}
                                        >
                                            <Section
                                                type="resume"
                                                sectionId={section}
                                                document={document}
                                                templateRef={templateRef}
                                            />
                                        </SectionContainerEditor>
                                    </DraggableContainer>
                                );
                            })}
                        </View>
                        <View wrap={false} style={pdfStyles.pageContainerRight}>
                            {cutArray(
                                document.information.sectionOrder[
                                    document.currentPage - 1
                                ],
                                "colBreak",
                                false
                            ).map((section: string, index: number) => {
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
                                            sectionId={section}
                                            document={document}
                                        >
                                            <Section
                                                type="resume"
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
                        return index === 0 ? (
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
                                    >
                                        {cutArray(array, "colBreak", true).map(
                                            (
                                                section: string,
                                                index: number
                                            ) => {
                                                return (
                                                    <Section
                                                        type="resume"
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
                                    <View
                                        wrap={false}
                                        style={pdfStyles.pageContainerRight}
                                    >
                                        {cutArray(array, "colBreak", false).map(
                                            (
                                                section: string,
                                                index: number
                                            ) => {
                                                return (
                                                    <Section
                                                        type="resume"
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
                        ) : (
                            <Page
                                wrap={false}
                                key={index}
                                style={pdfStyles.page}
                                size={[610, 789.4]}
                            >
                                <View
                                    wrap={false}
                                    style={pdfStyles.extraPageContainer}
                                >
                                    {array.map(
                                        (section: string, index: number) => {
                                            return (
                                                <Section
                                                    type="resume"
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
                            </Page>
                        );
                    }
                )}
            </Document>
        );
    }
};

export default Luminary;
