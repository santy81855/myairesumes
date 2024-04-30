"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import {
    formatDateMonthYear,
    formatDateMonYear,
    sortObjectArrayByDateEnd,
} from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getExperienceVariants = (data: {
    document: any;
    fontSize: any;
    font: string;
    template: string;
    accentColumn: boolean;
    isDownload: boolean;
    styles: any;
}) => {
    const {
        document,
        fontSize,
        font,
        template,
        accentColumn,
        isDownload,
        styles,
    } = data;

    return {
        experience: {
            name: "Experience",
            description: "Your previous employment history.",
            keyWords: [
                "experience",
                "work",
                "job",
                "career",
                "professional",
                "employment",
                "history",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="experiencePdf">
                    {getSectionTitleComponent({ ...data, title: "Experience" })}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.experienceArray,
                            -1
                        ).map((experience: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .experience.fontRatio,
                                            ...styles.bold,
                                        }}
                                    >
                                        {experience.company}
                                    </Text>
                                    {document.information.sectionEdit.experience
                                        .dateFormat === "long" ? (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.experience
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.sectionEdit
                                                .experience.showStartDate
                                                ? formatDateMonthYear(
                                                      experience.startDate
                                                  ) +
                                                  " - " +
                                                  (experience.endDate ===
                                                  "Present"
                                                      ? "Present"
                                                      : formatDateMonthYear(
                                                            experience.endDate
                                                        ))
                                                : experience.endDate ===
                                                  "Present"
                                                ? "Present"
                                                : formatDateMonthYear(
                                                      experience.endDate
                                                  )}
                                        </Text>
                                    ) : (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.experience
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.sectionEdit
                                                .experience.showStartDate
                                                ? formatDateMonYear(
                                                      experience.startDate
                                                  ) +
                                                  " - " +
                                                  (experience.endDate ===
                                                  "Present"
                                                      ? "Present"
                                                      : formatDateMonYear(
                                                            experience.endDate
                                                        ))
                                                : experience.endDate ===
                                                  "Present"
                                                ? "Present"
                                                : formatDateMonYear(
                                                      experience.endDate
                                                  )}
                                        </Text>
                                    )}
                                </View>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .experience.fontRatio,
                                    }}
                                >
                                    {experience.position}
                                </Text>
                                {document.information.sectionEdit.experience
                                    .showSummary && (
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .experience.fontRatio,
                                        }}
                                    >
                                        {experience.summary}
                                    </Text>
                                )}
                                <View style={styles.bulletItemContainer}>
                                    {experience.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text
                                                    style={{
                                                        ...styles.small,
                                                        fontSize:
                                                            fontSize *
                                                            0.8 *
                                                            document.information
                                                                .sectionEdit
                                                                .experience
                                                                .fontRatio,
                                                    }}
                                                >
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getExperienceVariants;
