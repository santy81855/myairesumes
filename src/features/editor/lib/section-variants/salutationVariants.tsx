"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import {
    formatDateMonthYear,
    sortObjectArrayByDateEnd,
    formatDateMonthDayYear,
} from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getSalutationVariants = (data: {
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
        salutation: {
            name: "Salutation",
            description:
                "A greeting to the employer, like 'Dear Hiring Manager,'.",
            keyWords: ["salutation", "greeting", "dear"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.col,
                            ...styles.justifyStart,
                            ...styles.gapMedium,
                            ...styles.marginTopMedium,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.small,
                                ...styles.width100,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.salutation
                                        .fontRatio,
                            }}
                        >
                            {formatDateMonthDayYear(document.information.date)}
                        </Text>
                        <View
                            style={{
                                ...styles.col,
                                ...styles.width100,
                                ...styles.justifyStart,
                                ...styles.gapSmall,
                            }}
                        >
                            {document.information.sectionEdit.salutation
                                .showCompanyName && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .salutation.fontRatio,
                                    }}
                                >
                                    {document.information.companyName}
                                </Text>
                            )}
                            {document.information.sectionEdit.salutation
                                .showAddress1 && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .salutation.fontRatio,
                                    }}
                                >
                                    {document.information.address1}
                                </Text>
                            )}
                            {document.information.sectionEdit.salutation
                                .showAddress2 && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .salutation.fontRatio,
                                    }}
                                >
                                    {document.information.address2}
                                </Text>
                            )}
                            {document.information.sectionEdit.salutation
                                .showAddress3 && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .salutation.fontRatio,
                                    }}
                                >
                                    {document.information.address3}
                                </Text>
                            )}
                        </View>
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.salutation
                                        .fontRatio,
                            }}
                        >
                            {document.information.salutation}
                        </Text>
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getSalutationVariants;
