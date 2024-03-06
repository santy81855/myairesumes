"use client";
import {
    getHeaderVariants,
    getEducationVariants,
    getNameVariants,
    getPositionVariants,
    getSectionStyles,
    getContactVariants,
    getSkillsVariants,
    getLanguagesVariants,
    getInterestsVariants,
    getExperienceVariants,
    getSummaryVariants,
    getProjectsVariants,
} from "@/features/editor";

export const SectionConfig = (data: {
    document: any;
    fontSize: any;
    font: string;
    template: string;
    accentColumn: boolean;
    isDownload: boolean;
}) => {
    const styles = getSectionStyles({ ...data });
    const headerVariants = getHeaderVariants({ ...data, styles });
    const educationVariants = getEducationVariants({ ...data, styles });
    const nameVariants = getNameVariants({ ...data, styles });
    const positionVariants = getPositionVariants({ ...data, styles });
    const contactVariants = getContactVariants({ ...data, styles });
    const skillsVariants = getSkillsVariants({ ...data, styles });
    const languagesVariants = getLanguagesVariants({ ...data, styles });
    const interestsVariants = getInterestsVariants({ ...data, styles });
    const experienceVariants = getExperienceVariants({ ...data, styles });
    const summaryVariants = getSummaryVariants({ ...data, styles });
    const projectsVariants = getProjectsVariants({ ...data, styles });

    return {
        ...headerVariants,
        ...nameVariants,
        ...positionVariants,
        ...experienceVariants,
        ...educationVariants,
        ...contactVariants,
        ...skillsVariants,
        ...languagesVariants,
        ...interestsVariants,
        ...summaryVariants,
        ...projectsVariants,
    };
};
