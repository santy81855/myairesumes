"use client";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";
import { useState, useEffect } from "react";
import { SectionConfig } from "../../../features/editor";

type SectionProps = {
    document: any;
    baseFontSize: any;
    font: string;
    baseMarginSize: any;
    sectionId: string;
    templateRef?: React.RefObject<HTMLElement>;
};

const Section = ({
    document,
    baseFontSize,
    font,
    baseMarginSize,
    sectionId,
    templateRef,
}: SectionProps) => {
    const [fontSize, setFontSize] = useState(baseFontSize);
    const [margin, setMargin] = useState(baseMarginSize);
    const [sectionConfig, setSectionConfig] = useState<any>(
        SectionConfig(document, fontSize, font, margin)
    );

    useEffect(() => {
        console.log(templateRef);
        if (!templateRef) return;
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = 11 * (width / 610);
        setFontSize(size);
        let newMargin = 11 * (width / 610);
        setMargin(newMargin);
        setSectionConfig(SectionConfig(document, size, font, newMargin));

        // handle the text scaling
        function handleResize() {
            if (!templateRef) return;
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = 11 * (width / 610);
            setFontSize(size);
            //  do the same for the margin value, which should be 16px at 610px width
            let newMargin = 11 * (width / 610);
            setMargin(newMargin);
            setSectionConfig(SectionConfig(document, size, font, newMargin));
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        sectionConfig[sectionId as keyof typeof sectionConfig]?.component ??
        null
    );
};

export default Section;
