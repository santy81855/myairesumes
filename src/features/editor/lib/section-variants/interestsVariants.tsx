"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getInterestsVariants = (data: {
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
        interestsBullet: {
            name: "Interests - Bullet Points",
            description: "Your interests in a bullet point list.",
            keyWords: ["interests", "hobbies", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interestsPdf">
                    {getSectionTitleComponent({ ...data, title: "Interests" })}
                    <View style={styles.bulletItemContainer}>
                        {document.information.interestArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize: fontSize * 0.8,
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
        interestsComma: {
            name: "Interests - Comma Separated",
            description: "Your interests in a comma separated list.",
            keyWords: ["interests", "hobbies", "comma"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interestsPdf">
                    {getSectionTitleComponent({ ...data, title: "Interests" })}
                    <Text
                        style={{
                            ...styles.small,
                            fontSize: fontSize * 0.8,
                            ...styles.width100,
                            ...styles.textLeft,
                        }}
                    >
                        {document.information.interestArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getInterestsVariants;
