"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getBodyVariants = (data: {
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
        body: {
            name: "Body",
            description:
                "The main content of your cover letter. This can be a paragraph or multiple paragraphs.",
            keyWords: ["body", "content", "main", "paragraph"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.medium}>
                        {document.information.body}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getBodyVariants;
