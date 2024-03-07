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

const getEducationVariants = (data: {
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
        educationShort: {
            name: "Brief Education",
            description:
                "A short education history that includes a bold heading, school name, degree, and graduation date.",
            keyWords: ["education", "school", "degree", "graduation", "short"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    {getSectionTitleComponent({ ...data, title: "Education" })}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View
                                    style={{
                                        ...styles.rowSpaceBetween,
                                        ...styles.width100,
                                        ...styles.flexWrap,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .education.fontRatio,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    {document.information.sectionEdit.education
                                        .showStartDate ? (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.education
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.sectionEdit
                                                .education.dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.startDate
                                                  )
                                                : formatDateMonYear(
                                                      education.startDate
                                                  )}{" "}
                                            -{" "}
                                            {education.endDate === "Present"
                                                ? "Present"
                                                : document.information
                                                      .sectionEdit.education
                                                      .dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.endDate
                                                  )
                                                : formatDateMonYear(
                                                      education.endDate
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
                                                        .sectionEdit.education
                                                        .fontRatio,
                                            }}
                                        >
                                            {education.endDate === "Present"
                                                ? "Present"
                                                : document.information
                                                      .sectionEdit.education
                                                      .dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.endDate
                                                  )
                                                : formatDateMonYear(
                                                      education.endDate
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
                                                .education.fontRatio,
                                    }}
                                >
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailed: {
            name: "Detailed Education",
            description:
                "A detailed education history. Includes a bold heading, a start date, a graduation date, a school name, a degree type, a degree field, a GPA, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    {getSectionTitleComponent({ ...data, title: "Education" })}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View
                                    style={{
                                        ...styles.rowSpaceBetween,
                                        ...styles.flexWrap,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .education.fontRatio,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    {document.information.sectionEdit.education
                                        .showStartDate ? (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.education
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.sectionEdit
                                                .education.dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.startDate
                                                  )
                                                : formatDateMonYear(
                                                      education.startDate
                                                  )}{" "}
                                            -{" "}
                                            {education.endDate === "Present"
                                                ? "Present"
                                                : document.information
                                                      .sectionEdit.education
                                                      .dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.endDate
                                                  )
                                                : formatDateMonYear(
                                                      education.endDate
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
                                                        .sectionEdit.education
                                                        .fontRatio,
                                            }}
                                        >
                                            {education.endDate === "Present"
                                                ? "Present"
                                                : document.information
                                                      .sectionEdit.education
                                                      .dateFormat === "long"
                                                ? formatDateMonthYear(
                                                      education.endDate
                                                  )
                                                : formatDateMonYear(
                                                      education.endDate
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
                                                .education.fontRatio,
                                    }}
                                >
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                {document.information.sectionEdit.education
                                    .showGpa && (
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .education.fontRatio,
                                        }}
                                    >
                                        GPA: {education.gpa}
                                    </Text>
                                )}
                                {document.information.sectionEdit.education
                                    .showBullets && (
                                    <View style={styles.bulletItemContainer}>
                                        {education.bullets.map(
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
                                                                document
                                                                    .information
                                                                    .sectionEdit
                                                                    .education
                                                                    .fontRatio,
                                                        }}
                                                    >
                                                        {bullet}
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getEducationVariants;
