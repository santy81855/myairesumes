"use client";
import { useState, useEffect } from "react";
import { SectionConfig } from "../../../features/editor";

type SectionProps = {
    sectionId: string;
    document: any;
    templateRef?: React.RefObject<HTMLDivElement>;
    accentColumn?: boolean;
};

const Section = ({
    sectionId,
    document,
    templateRef,
    accentColumn,
}: SectionProps) => {
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
            document.information.template,
            accentColumn ? true : false
        )
    );

    useEffect(() => {
        if (!templateRef) {
            // if there is no templateRef, then it is a download template, and we want to make sure we update the sectionConfig with any updated values
            setSectionConfig(
                SectionConfig(
                    document,
                    document.information.style.baseFontSize,
                    document.information.font,
                    document.information.template,
                    accentColumn ? true : false
                )
            );
            return;
        }
        const template = templateRef.current as unknown as HTMLElement;
        if (!template) return;
        const { width, height } = template.getBoundingClientRect();
        let size = document.information.style.baseFontSize * (width / 610);
        setFontSize(size);
        let newMargin =
            document.information.style.baseMarginSize * (width / 610);
        setMargin(newMargin);
        setSectionConfig(
            SectionConfig(
                document,
                size,
                document.information.font,
                document.information.template,
                accentColumn ? true : false
            )
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
                    document.information.template,
                    accentColumn ? true : false
                )
            );
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [document]);

    return (
        sectionConfig[sectionId as keyof typeof sectionConfig]?.component ??
        null
    );
};

Section.displayName = "Section";

export default Section;
