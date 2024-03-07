"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getLanguagesVariants = (data: {
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
        languagesComma: {
            name: "Languages - Comma Separated",
            description: "Your languages in a comma separated list.",
            keyWords: ["languages", "comma"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    {getSectionTitleComponent({ ...data, title: "Languages" })}
                    <Text
                        style={{
                            ...styles.small,
                            fontSize:
                                fontSize *
                                0.8 *
                                document.information.sectionEdit.languages
                                    .fontRatio,
                            ...styles.width100,
                            textAlign:
                                document.information.sectionEdit.languages
                                    .textAlignment,
                        }}
                    >
                        {document.information.languageArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        languagesBullet: {
            name: "Languages - Bullet Points",
            description: "Your languages in a bullet point list.",
            keyWords: ["languages", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    {getSectionTitleComponent({ ...data, title: "Languages" })}
                    <View style={styles.bulletItemContainer}>
                        {document.information.languageArray.map(
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
                                                    .languages.fontRatio,
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
    };
};

export default getLanguagesVariants;
