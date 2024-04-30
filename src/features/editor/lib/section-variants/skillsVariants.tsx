"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getSkillsVariants = (data: {
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
        skillsVivid: {
            name: "Skills - Vivid",
            description:
                "Your skills in a column, with a contrasting background. Ideal for a list of short skills. Made to match the Vivid template.",
            keyWords: [
                "skills",
                "abilities",
                "strengths",
                "brief",
                "column",
                "vivid",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent({ ...data, title: "Skills" })}
                    <View style={styles.rowContainerWrap}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View
                                    style={
                                        accentColumn
                                            ? {
                                                  ...styles.col,
                                                  ...styles.justifyCenter,
                                                  alignItems:
                                                      document.information
                                                          .sectionEdit.skills
                                                          .textAlignment ===
                                                      "left"
                                                          ? "flex-start"
                                                          : document.information
                                                                .sectionEdit
                                                                .skills
                                                                .textAlignment ===
                                                            "center"
                                                          ? "center"
                                                          : "flex-end",
                                                  ...styles.width100,
                                                  ...styles.minHeightMedium,
                                                  ...styles.accentTextBackground,
                                                  ...styles.borderRadiusSmall,
                                              }
                                            : {
                                                  ...styles.col,
                                                  ...styles.justifyCenter,
                                                  alignItems:
                                                      document.information
                                                          .sectionEdit.skills
                                                          .textAlignment ===
                                                      "left"
                                                          ? "flex-start"
                                                          : document.information
                                                                .sectionEdit
                                                                .skills
                                                                .textAlignment ===
                                                            "center"
                                                          ? "center"
                                                          : "flex-end",
                                                  ...styles.width100,
                                                  ...styles.minHeightMedium,
                                                  ...styles.accentBackgroundColor,
                                                  ...styles.borderRadiusSmall,
                                              }
                                    }
                                    key={index}
                                >
                                    <Text
                                        style={
                                            accentColumn
                                                ? {
                                                      ...styles.marginLeftSmall,
                                                      ...styles.marginRightSmall,
                                                      ...styles.marginTopSmall,
                                                      ...styles.marginBottomSmall,
                                                      ...styles.small,
                                                      fontSize:
                                                          fontSize *
                                                          0.8 *
                                                          document.information
                                                              .sectionEdit
                                                              .skills.fontRatio,
                                                      ...styles.backgroundAccentForText,
                                                  }
                                                : {
                                                      ...styles.marginLeftSmall,
                                                      ...styles.marginRightSmall,
                                                      ...styles.marginTopSmall,
                                                      ...styles.marginBottomSmall,
                                                      ...styles.small,
                                                      fontSize:
                                                          fontSize *
                                                          0.8 *
                                                          document.information
                                                              .sectionEdit
                                                              .skills.fontRatio,
                                                      ...styles.accentText,
                                                  }
                                        }
                                    >
                                        {skill}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsBulletRow: {
            name: "Skills - Brief, Bullet Points",
            description:
                "Your skills in a horizontal bullet point list. Ideal for a list of short skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent({ ...data, title: "Skills" })}
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.row,
                            ...styles.flexWrap,
                            justifyContent:
                                document.information.sectionEdit.skills
                                    .textAlignment === "left"
                                    ? "flex-start"
                                    : document.information.sectionEdit.skills
                                          .textAlignment === "center"
                                    ? "center"
                                    : "flex-end",
                        }}
                    >
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem30} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .skills.fontRatio,
                                        }}
                                    >
                                        {skill}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsBullet: {
            name: "Skills - Detailed, Bullet Points",
            description:
                "Your skills in a vertical bullet point list. Ideal for a list of detailed skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    {getSectionTitleComponent({ ...data, title: "Skills" })}
                    <View style={styles.bulletItemContainer}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .skills.fontRatio,
                                        }}
                                    >
                                        {skill}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsComma: {
            name: "Skills - Brief, Comma-Separated",
            description:
                "Your skills in a comma separated list. Ideal for a list of skills that are only 1 or 2 words long. Useful for when you want to save space.",
            keyWords: ["skills", "abilities", "strengths", "short", "comma"],
            // short skills are displayed as a comma separated list
            component: fontSize ? (
                <View style={styles.sectionContainer} id="shortSkillsPdf">
                    {getSectionTitleComponent({ ...data, title: "Skills" })}
                    <Text
                        style={{
                            ...styles.small,
                            fontSize:
                                fontSize *
                                0.8 *
                                document.information.sectionEdit.skills
                                    .fontRatio,
                            ...styles.width100,
                            textAlign:
                                document.information.sectionEdit.skills
                                    .textAlignment,
                        }}
                    >
                        {document.information.skillArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        skillsCategory: {
            name: "Skills - Specialized",
            description:
                "Your skills sectioned into categories. Ideal for a list of specialized skills.",
            keyWords: [
                "skills",
                "abilities",
                "strengths",
                "categorized",
                "specialized",
            ],
            component: fontSize ? (
                <View
                    style={{ ...styles.sectionContainer, ...styles.gapSmall }}
                    id="skillsPdf"
                >
                    {getSectionTitleComponent({ ...data, title: "Skills" })}
                    {document.information.skillCategoryArray.map(
                        (category: any, index: number) => (
                            <View
                                key={index}
                                style={{
                                    ...styles.row,
                                    ...styles.width100,
                                    ...styles.justifyStart,
                                    ...styles.alignStart,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .skills.fontRatio,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .skills.fontRatio,
                                            ...styles.bold,
                                        }}
                                    >
                                        {category.category}
                                        {": "}
                                    </Text>
                                    {category.skills.join(", ")}
                                </Text>
                            </View>
                        )
                    )}
                </View>
            ) : null,
        },
    };
};

export default getSkillsVariants;
