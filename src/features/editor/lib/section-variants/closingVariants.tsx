"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getClosingVariants = (data: {
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
        closing: {
            name: "Closing",
            description: "A closing to the employer, like 'Sincerely,'.",
            keyWords: ["closing", "sincerely", "regards"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text
                        style={{
                            ...styles.medium,
                            ...styles.width100,
                            ...styles.textLeftAlign,
                        }}
                    >
                        {document.information.closing}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getClosingVariants;
