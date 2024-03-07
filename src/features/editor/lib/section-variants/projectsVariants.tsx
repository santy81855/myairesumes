"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getProjectsVariants = (data: {
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
        projects: {
            name: "Projects",
            description: "Your projects",
            keyWords: [
                "projects",
                "project",
                "portfolio",
                "work",
                "assignments",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    {getSectionTitleComponent({ ...data, title: "Projects" })}
                    <View style={styles.arrayContainer}>
                        {document.information.projectArray.map(
                            (project: any, index: number) => {
                                return (
                                    <View key={index} style={styles.arrayItem}>
                                        <View
                                            style={{
                                                ...styles.rowSpaceBetween,
                                                ...styles.width100,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.small,
                                                    fontSize:
                                                        fontSize *
                                                        0.8 *
                                                        document.information
                                                            .sectionEdit
                                                            .projects.fontRatio,
                                                    ...styles.bold,
                                                }}
                                            >
                                                {project.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...styles.small,
                                                    fontSize:
                                                        fontSize *
                                                        0.8 *
                                                        document.information
                                                            .sectionEdit
                                                            .projects.fontRatio,
                                                }}
                                            >
                                                {project.source}
                                            </Text>
                                        </View>
                                        {document.information.sectionEdit
                                            .projects.showSummary && (
                                            <Text
                                                style={{
                                                    ...styles.width100,
                                                    ...styles.small,
                                                    fontSize:
                                                        fontSize *
                                                        0.8 *
                                                        document.information
                                                            .sectionEdit
                                                            .projects.fontRatio,
                                                }}
                                            >
                                                {project.summary}
                                            </Text>
                                        )}
                                        <View
                                            style={styles.bulletItemContainer}
                                        >
                                            {project.bullets.map(
                                                (
                                                    bullet: string,
                                                    index: number
                                                ) => (
                                                    <View
                                                        key={index}
                                                        style={
                                                            styles.bulletItem
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.bullet
                                                            }
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
                                                                        .projects
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
                                );
                            }
                        )}
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getProjectsVariants;
