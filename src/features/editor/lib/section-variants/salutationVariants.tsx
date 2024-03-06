"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
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
                    <Text
                        style={{
                            ...styles.medium,
                            ...styles.width100,
                            ...styles.textLeftAlign,
                        }}
                    >
                        {document.information.salutation}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getSalutationVariants;
