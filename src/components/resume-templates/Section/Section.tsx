"use client";
import { useState, useEffect, forwardRef } from "react";
import { SectionConfig } from "../../../features/editor";
import {
    formatDateMonthDayYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";

type SectionProps = {
    sectionId: string;
    document: any;
    templateRef?: React.RefObject<HTMLDivElement>;
};

const Section = ({ sectionId, document, templateRef }: SectionProps) => {
    const [fontSize, setFontSize] = useState(
        document.information.style.baseFontSize
    );
    const [margin, setMargin] = useState(
        document.information.style.baseMarginSize
    );
    const [sectionConfig, setSectionConfig] = useState<any>(
        SectionConfig(
            document,
            document.information.style.baseFontSize,
            document.information.font,
            document.information.style.baseMarginSize
        )
    );

    useEffect(() => {
        if (!templateRef) return;
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = document.information.style.baseFontSize * (width / 610);
        setFontSize(size);
        let newMargin =
            document.information.style.baseMarginSize * (width / 610);
        setMargin(newMargin);
        setSectionConfig(
            SectionConfig(document, size, document.information.font, newMargin)
        );

        // handle the text scaling
        function handleResize() {
            if (!templateRef) return;
            const template = templateRef.current as unknown as HTMLElement;
            if (!template) return;
            const { width, height } = template.getBoundingClientRect();
            let size = document.information.style.baseFontSize * (width / 610);
            setFontSize(size);
            //  do the same for the margin value, which should be 16px at 610px width
            let newMargin =
                document.information.style.baseMarginSize * (width / 610);
            setMargin(newMargin);
            setSectionConfig(
                SectionConfig(
                    document,
                    size,
                    document.information.font,
                    newMargin
                )
            );
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
