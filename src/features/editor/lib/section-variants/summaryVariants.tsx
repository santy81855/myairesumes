"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getSummaryVariants = (data: {
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
        summary: {
            name: "Summary",
            description:
                "A brief summary of yourself, like a bio or objective statement.",
            keyWords: [
                "summary",
                "description",
                "about",
                "objective",
                "bio",
                "me",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    {getSectionTitleComponent({ ...data, title: "Summary" })}
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.col,
                            ...styles.alignStart,
                            ...styles.justifyStart,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.summary
                                        .fontRatio,
                                ...styles.width100,
                                textAlign:
                                    document.information.sectionEdit.summary
                                        .textAlignment,
                            }}
                        >
                            {document.information.summary}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getSummaryVariants;
