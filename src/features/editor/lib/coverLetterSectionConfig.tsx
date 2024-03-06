"use client";
import {
    getHeaderVariants,
    getSectionStyles,
    getSalutationVariants,
    getClosingVariants,
    getBodyVariants,
} from "@/features/editor";

export const CoverLetterSectionConfig = (data: {
    document: any;
    fontSize: any;
    font: string;
    template: string;
    accentColumn: boolean;
    isDownload: boolean;
}) => {
    const styles = getSectionStyles({ ...data });
    const headerVariants = getHeaderVariants({ ...data, styles });
    const salutationVariants = getSalutationVariants({ ...data, styles });
    const bodyVariants = getBodyVariants({ ...data, styles });
    const closingVariants = getClosingVariants({ ...data, styles });

    return {
        ...headerVariants,
        ...salutationVariants,
        ...bodyVariants,
        ...closingVariants,
    };
};
