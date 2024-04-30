"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getPositionVariants = (data: {
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
        position: {
            name: "Position",
            description: "Your job title displayed as its own line.",
            keyWords: ["position", "job", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text
                        style={{
                            ...styles.small,
                            fontSize:
                                fontSize *
                                0.8 *
                                document.information.sectionEdit.position
                                    .fontRatio,
                            ...styles.width100,
                            textAlign:
                                document.information.sectionEdit.position
                                    .textAlignment,
                        }}
                    >
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getPositionVariants;
