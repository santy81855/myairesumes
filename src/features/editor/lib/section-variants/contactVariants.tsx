"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getContactVariants = (data: {
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

    const accentEmailIcon = getAccentEmailIcon({
        document,
        fontSize,
        font,
        template,
        accentColumn,
        isDownload,
        styles,
    });

    const accentPhoneIcon = getAccentPhoneIcon({
        document,
        fontSize,
        font,
        template,
        accentColumn,
        isDownload,
        styles,
    });

    const accentWebsiteIcon = getAccentWebsiteIcon({
        document,
        fontSize,
        font,
        template,
        accentColumn,
        isDownload,
        styles,
    });

    return {
        contactHorizontal: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed horizontally with a pipe separator. You can choose to omit any of the three contact details.",
            keyWords: ["contact", "email", "phone", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.row,
                            ...styles.alignCenter,
                            ...styles.width100,
                            ...styles.gapSmall,
                            justifyContent:
                                document.information.sectionEdit.contact
                                    .textAlignment === "left"
                                    ? "flex-start"
                                    : document.information.sectionEdit.contact
                                          .textAlignment === "center"
                                    ? "center"
                                    : "flex-end",
                        }}
                    >
                        {document.information.sectionEdit.contact.showEmail ===
                            true && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.contact
                                            .fontRatio,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                        )}
                        {document.information.sectionEdit.contact.showEmail &&
                            document.information.sectionEdit.contact
                                .showPhone && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                    }}
                                >
                                    |
                                </Text>
                            )}
                        {document.information.sectionEdit.contact.showPhone && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.contact
                                            .fontRatio,
                                }}
                            >
                                {document.information.contactInfo.phone}
                            </Text>
                        )}
                        {document.information.sectionEdit.contact
                            .showWebsite && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.contact
                                            .fontRatio,
                                }}
                            >
                                |
                            </Text>
                        )}
                        {document.information.sectionEdit.contact
                            .showWebsite && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.contact
                                            .fontRatio,
                                }}
                            >
                                {document.information.contactInfo.website}
                            </Text>
                        )}
                    </View>
                </View>
            ) : null,
        },
        contactVertical: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed as a column. Defaults to the left side, but can be changed to be center or right aligned. You can choose to omit any of the three contact details.",
            keyWords: ["contact", "email", "phone", "website", "vertical"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.col,
                            ...styles.alignCenter,
                            ...styles.justifyStart,
                            ...styles.gapSmall,
                        }}
                    >
                        {document.information.sectionEdit.contact.showEmail ===
                            true && (
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.width100,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.bold,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    Email
                                </Text>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    {document.information.contactInfo.email}
                                </Text>
                            </View>
                        )}
                        {document.information.sectionEdit.contact.showPhone ===
                            true && (
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.width100,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.bold,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    Phone
                                </Text>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    {document.information.contactInfo.phone}
                                </Text>
                            </View>
                        )}
                        {document.information.sectionEdit.contact
                            .showWebsite === true && (
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.width100,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.bold,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    Website
                                </Text>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                        ...styles.width100,
                                        textAlign:
                                            document.information.sectionEdit
                                                .contact.textAlignment,
                                    }}
                                >
                                    {document.information.contactInfo.website}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            ) : null,
        },
        contactVerticalIcons: {
            name: "Contact Details with Icons",
            description:
                "Your email, phone number, and website displayed with their respective icons as a column. Defaults to the left side, but can be changed to be center or right aligned. You can choose to omit any of the three contact details.",
            keyWords: [
                "contact",
                "email",
                "phone",
                "website",
                "icons",
                "vertical",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.col,
                            ...styles.alignCenter,
                            ...styles.justifyStart,
                            ...styles.gapSmall,
                        }}
                    >
                        {document.information.sectionEdit.contact.showEmail ===
                            true && (
                            <View
                                style={{
                                    ...styles.row,
                                    ...styles.alignCenter,
                                    justifyContent:
                                        document.information.sectionEdit.contact
                                            .textAlignment === "left"
                                            ? "flex-start"
                                            : document.information.sectionEdit
                                                  .contact.textAlignment ===
                                              "center"
                                            ? "center"
                                            : "flex-end",
                                    ...styles.gapSmall,
                                    ...styles.width100,
                                }}
                            >
                                {(document.information.sectionEdit.contact
                                    .textAlignment === "left" ||
                                    document.information.sectionEdit.contact
                                        .textAlignment === "center") &&
                                    accentEmailIcon}
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.email}
                                </Text>
                                {document.information.sectionEdit.contact
                                    .textAlignment === "right" &&
                                    accentEmailIcon}
                            </View>
                        )}
                        {document.information.sectionEdit.contact.showPhone ===
                            true && (
                            <View
                                style={{
                                    ...styles.row,
                                    ...styles.alignCenter,
                                    justifyContent:
                                        document.information.sectionEdit.contact
                                            .textAlignment === "left"
                                            ? "flex-start"
                                            : document.information.sectionEdit
                                                  .contact.textAlignment ===
                                              "center"
                                            ? "center"
                                            : "flex-end",
                                    ...styles.gapSmall,
                                    ...styles.width100,
                                }}
                            >
                                {(document.information.sectionEdit.contact
                                    .textAlignment === "left" ||
                                    document.information.sectionEdit.contact
                                        .textAlignment === "center") &&
                                    accentPhoneIcon}
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.phone}
                                </Text>
                                {document.information.sectionEdit.contact
                                    .textAlignment === "right" &&
                                    accentPhoneIcon}
                            </View>
                        )}
                        {document.information.sectionEdit.contact
                            .showWebsite === true && (
                            <View
                                style={{
                                    ...styles.row,
                                    ...styles.alignCenter,
                                    justifyContent:
                                        document.information.sectionEdit.contact
                                            .textAlignment === "left"
                                            ? "flex-start"
                                            : document.information.sectionEdit
                                                  .contact.textAlignment ===
                                              "center"
                                            ? "center"
                                            : "flex-end",
                                    ...styles.gapSmall,
                                    ...styles.width100,
                                }}
                            >
                                {(document.information.sectionEdit.contact
                                    .textAlignment === "left" ||
                                    document.information.sectionEdit.contact
                                        .textAlignment === "center") &&
                                    accentWebsiteIcon}
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .contact.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.website}
                                </Text>
                                {document.information.sectionEdit.contact
                                    .textAlignment === "right" &&
                                    accentWebsiteIcon}
                            </View>
                        )}
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getContactVariants;
