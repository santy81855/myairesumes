"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getNameVariants = (data: {
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
        name: {
            name: "Name",
            description: "Your name in its own line.",
            keyWords: ["name", "first", "last"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text
                        style={{
                            ...styles.large,
                            fontSize:
                                fontSize *
                                1.2 *
                                document.information.sectionEdit.name.fontRatio,
                            ...styles.width100,
                            textAlign:
                                document.information.sectionEdit.name
                                    .textAlignment,
                        }}
                    >
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
    };
};

export default getNameVariants;
