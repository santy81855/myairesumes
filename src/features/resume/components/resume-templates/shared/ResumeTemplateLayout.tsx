"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import { DraggableContainer } from "@/features/editor";
import { Section } from "@/features/resume";
import SectionContainerEditor from "../../section-container-editor/SectionContainerEditor";

type ResumeTemplateLayoutProps = {
    document: any;
    isEditor?: boolean;
    isDownload?: boolean;
    isPreview?: boolean;
    layout: "single" | "sidebar";
};

const PAGE_WIDTH = 610;

const ResumeTemplateLayout = ({
    document,
    isEditor,
    isDownload,
    isPreview,
    layout,
}: ResumeTemplateLayoutProps) => {
    const templateRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (isDownload) return;

        const updateScale = () => {
            const template = templateRef.current as unknown as HTMLElement;
            if (template) setScale(template.getBoundingClientRect().width / PAGE_WIDTH);
        };

        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, [document, isDownload]);

    const baseMargin = document.information.style.baseMarginSize;
    const baseGap = document.information.style.baseSectionGap;
    const fontSize = document.information.style.baseFontSize;
    const measuredMargin = isDownload ? baseMargin : baseMargin * scale;
    const measuredGap = isDownload ? baseGap : baseGap * scale;
    const measuredFont = isDownload ? fontSize : fontSize * scale;
    const accent = document.information.style.accentBackgroundColor;

    const styles = StyleSheet.create({
        page: { width: "100%", height: "100%", backgroundColor: "white" },
        single: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingTop: measuredMargin,
            paddingRight: measuredMargin,
            paddingBottom: measuredMargin,
            paddingLeft: measuredMargin,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: measuredGap,
            overflow: "hidden",
            borderTopWidth: measuredFont * 0.65,
            borderTopStyle: "solid",
            borderTopColor: accent,
        },
        columns: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
        },
        sidebar: {
            width: "32%",
            height: "100%",
            paddingTop: measuredMargin,
            paddingRight: measuredFont * 1.1,
            paddingBottom: measuredMargin,
            paddingLeft: measuredMargin,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: measuredGap,
            overflow: "hidden",
            backgroundColor: accent,
        },
        main: {
            backgroundColor: "white",
            width: "68%",
            height: "100%",
            paddingTop: measuredMargin,
            paddingRight: measuredMargin,
            paddingBottom: measuredMargin,
            paddingLeft: measuredFont * 1.45,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: measuredGap,
            overflow: "hidden",
        },
        continuation: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingTop: measuredMargin,
            paddingRight: measuredMargin,
            paddingBottom: measuredMargin,
            paddingLeft: measuredMargin,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: measuredGap,
            overflow: "hidden",
        },
    });

    const currentPage = Math.max(
        0,
        (document.currentPage ?? document.information.currentPage ?? 1) - 1
    );
    const pageSections = document.information.sectionOrder[currentPage] ?? [];

    const splitSections = (sections: string[]) => {
        const breakIndex = sections.indexOf("colBreak");
        if (breakIndex === -1) return { main: sections, sidebar: [] };
        return {
            main: sections.slice(0, breakIndex),
            sidebar: sections.slice(breakIndex + 1),
        };
    };

    const renderSection = (
        section: string,
        index: number,
        order: string[],
        accentColumn = false
    ) => {
        const content = (
            <Section
                type="resume"
                sectionId={section}
                document={document}
                templateRef={isDownload ? undefined : templateRef}
                accentColumn={accentColumn}
            />
        );

        if (!isEditor) {
            return (
                <Fragment key={`${section}-${index}`}>{content}</Fragment>
            );
        }

        const actualIndex = order.indexOf(section);
        return (
            <DraggableContainer
                key={`${section}-${actualIndex}`}
                id={`${section}-${actualIndex}`}
                orderArray={order}
                document={document}
            >
                <SectionContainerEditor sectionId={section} document={document}>
                    {content}
                </SectionContainerEditor>
            </DraggableContainer>
        );
    };

    const renderSinglePage = (sections: string[], ref?: any) => (
        <View wrap={false} style={styles.single} ref={ref}>
            {sections.map((section, index) =>
                renderSection(section, index, sections)
            )}
        </View>
    );

    const renderSidebarPage = (sections: string[], ref?: any) => {
        const split = splitSections(sections);
        return (
            <View wrap={false} style={styles.columns} ref={ref}>
                <View wrap={false} style={styles.sidebar}>
                    {split.sidebar.map((section, index) =>
                        renderSection(section, index, sections, true)
                    )}
                </View>
                <View wrap={false} style={styles.main}>
                    {split.main.map((section, index) =>
                        renderSection(section, index, sections)
                    )}
                </View>
            </View>
        );
    };

    const renderContinuationPage = (sections: string[], ref?: any) => (
        <View wrap={false} style={styles.continuation} ref={ref}>
            {sections.map((section, index) =>
                renderSection(section, index, sections)
            )}
        </View>
    );

    if (isDownload) {
        return (
            <Document title="Resume">
                {document.information.sectionOrder.map(
                    (sections: string[], index: number) => (
                        <Page
                            wrap={false}
                            key={index}
                            style={styles.page}
                            size={[610, 789.4]}
                        >
                            {layout === "sidebar" && index === 0
                                ? renderSidebarPage(sections)
                                : layout === "single"
                                  ? renderSinglePage(sections)
                                  : renderContinuationPage(sections)}
                        </Page>
                    )
                )}
            </Document>
        );
    }

    return (
        <Document>
            <Page wrap={false} style={styles.page}>
                {layout === "sidebar" && currentPage === 0
                    ? renderSidebarPage(pageSections, templateRef)
                    : layout === "single"
                      ? renderSinglePage(pageSections, templateRef)
                      : renderContinuationPage(pageSections, templateRef)}
            </Page>
        </Document>
    );
};

export default ResumeTemplateLayout;
