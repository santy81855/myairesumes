"use client";
import { Text, View } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "@/features/editor";

const getHeaderVariants = (data: {
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
        headerBasic: {
            name: "Basic Header",
            description:
                "A header with your name, position, and contact information displayed as a column. Made to match the Basic template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "basic",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text
                        style={{
                            ...styles.large,
                            fontSize:
                                fontSize *
                                1.2 *
                                document.information.sectionEdit.header
                                    .fontRatio,
                        }}
                    >
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    {document.information.sectionEdit.header.showPosition && (
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                            }}
                        >
                            {document.information.position}
                        </Text>
                    )}
                    <View style={styles.rowContainer}>
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                            }}
                        >
                            {document.information.contactInfo.email}
                        </Text>
                        {document.information.sectionEdit.contact.showPhone && (
                            <>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                    }}
                                >
                                    |
                                </Text>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.phone}
                                </Text>
                            </>
                        )}
                        {document.information.sectionEdit.contact
                            .showWebsite && (
                            <>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                    }}
                                >
                                    |
                                </Text>
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.website}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            ) : null,
        },
        headerVelocity: {
            name: "Velocity Header",
            description:
                "A header with your name, position, and contact information displayed as a column. Made to match the Velocity template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "column",
                "velocity",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
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
                                ...styles.large,
                                fontSize:
                                    fontSize *
                                    1.2 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                            }}
                        >
                            {document.information.firstName}{" "}
                            {document.information.lastName}
                        </Text>
                        {document.information.sectionEdit.header
                            .showPosition && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                }}
                            >
                                {document.information.position}
                            </Text>
                        )}
                        <View
                            style={{
                                ...styles.rowContainer,
                                ...styles.justifyStart,
                                ...styles.marginTopMedium,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                            {document.information.sectionEdit.contact
                                .showPhone && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {document.information.contactInfo.phone}
                                    </Text>
                                </>
                            )}
                            {document.information.sectionEdit.contact
                                .showWebsite && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {
                                            document.information.contactInfo
                                                .website
                                        }
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerTriumph: {
            name: "Triumph Header",
            description:
                "A header with your name, position, and contact information displayed as a column. It puts an emphasis on your contact information. Made to match the Triumph template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "column",
                "triumph",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.width100,
                            ...styles.col,
                            ...styles.alignCenter,
                            ...styles.justifyStart,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.x2Large,
                                fontSize:
                                    fontSize *
                                    2.5 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                            }}
                        >
                            {document.information.firstName}{" "}
                            {document.information.lastName}
                        </Text>
                        {document.information.sectionEdit.header
                            .showPosition && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                }}
                            >
                                {document.information.position}
                            </Text>
                        )}
                        <View
                            style={{
                                ...styles.rowContainer,
                                ...styles.justifyCenter,
                                ...styles.marginTopMedium,
                                ...styles.accentBackgroundColor,
                                ...styles.minHeightSmall,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                            {document.information.sectionEdit.contact
                                .showPhone && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        {document.information.contactInfo.phone}
                                    </Text>
                                </>
                            )}
                            {document.information.sectionEdit.contact
                                .showWebsite && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        {
                                            document.information.contactInfo
                                                .website
                                        }
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerNexus: {
            name: "Nexus Header",
            description:
                "A header with your name, a graphic with your initials, position, and contact information displayed as a row. Made to match the Nexus template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "row",
                "nexus",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainerSpaceBetweenBottom}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerBottom}>
                                <View style={styles.initialsBox}>
                                    <Text
                                        style={{
                                            ...styles.firstInitial,
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName[0]}
                                    </Text>

                                    <Text
                                        style={{
                                            ...styles.lastInitial,
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName[0]}
                                    </Text>
                                </View>
                                <View style={styles.columnGroupLeft}>
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            fontSize:
                                                fontSize *
                                                2 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            fontSize:
                                                fontSize *
                                                2 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName}
                                    </Text>
                                    {document.information.sectionEdit.header
                                        .showPosition && (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.position}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.columnGroupRight}>
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.alignEnd,
                                    ...styles.justifyStart,
                                    ...styles.gapSmall,
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.row,
                                        ...styles.alignCenter,
                                        ...styles.justifyEnd,
                                        ...styles.gapSmall,
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
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {document.information.contactInfo.email}
                                    </Text>
                                    {accentEmailIcon}
                                </View>
                                {document.information.sectionEdit.contact
                                    .showPhone && (
                                    <View
                                        style={{
                                            ...styles.row,
                                            ...styles.alignCenter,
                                            ...styles.justifyEnd,
                                            ...styles.gapSmall,
                                            ...styles.width100,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {
                                                document.information.contactInfo
                                                    .phone
                                            }
                                        </Text>
                                        {accentPhoneIcon}
                                    </View>
                                )}
                                {document.information.sectionEdit.contact
                                    .showWebsite && (
                                    <View
                                        style={{
                                            ...styles.row,
                                            ...styles.alignCenter,
                                            ...styles.justifyEnd,
                                            ...styles.gapSmall,
                                            ...styles.width100,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {
                                                document.information.contactInfo
                                                    .website
                                            }
                                        </Text>
                                        {accentWebsiteIcon}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerImpact: {
            name: "Impact Header",
            description:
                "A header with your name, position, and contact information displayed as a row. Made to match the Impact template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "row",
                "impact",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.rowSpaceBetween,
                            ...styles.alignEnd,
                        }}
                    >
                        <View
                            style={{
                                ...styles.columnGroupLeft,
                                ...styles.accentBackgroundColor,
                                ...styles.paddingLarge,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.extraLarge,
                                    fontSize:
                                        fontSize *
                                        2 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.firstName}{" "}
                                {document.information.lastName}
                            </Text>
                            {document.information.sectionEdit.header
                                .showPosition && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                        ...styles.accentText,
                                    }}
                                >
                                    {document.information.position}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                ...styles.columnGroupRight,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.alignEnd,
                                    ...styles.justifyStart,
                                    ...styles.gapSmall,
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.row,
                                        ...styles.alignCenter,
                                        ...styles.justifyEnd,
                                        ...styles.gapSmall,
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
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {document.information.contactInfo.email}
                                    </Text>
                                    {accentEmailIcon}
                                </View>
                                {document.information.sectionEdit.contact
                                    .showPhone && (
                                    <View
                                        style={{
                                            ...styles.row,
                                            ...styles.alignCenter,
                                            ...styles.justifyEnd,
                                            ...styles.gapSmall,
                                            ...styles.width100,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {
                                                document.information.contactInfo
                                                    .phone
                                            }
                                        </Text>
                                        {accentPhoneIcon}
                                    </View>
                                )}
                                {document.information.sectionEdit.contact
                                    .showWebsite && (
                                    <View
                                        style={{
                                            ...styles.row,
                                            ...styles.alignCenter,
                                            ...styles.justifyEnd,
                                            ...styles.gapSmall,
                                            ...styles.width100,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {
                                                document.information.contactInfo
                                                    .website
                                            }
                                        </Text>
                                        {accentWebsiteIcon}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerNova: {
            name: "Nova Header",
            description:
                "A header that emphasizes your name. Made to match the Nova template.",
            keyWords: ["header", "name", "position", "title", "nova"],
            component: fontSize ? (
                <View
                    style={{
                        ...styles.columnGroupLeft,
                        ...styles.col,
                        ...styles.alignStart,
                        ...styles.justifyStart,
                        ...styles.gapSmall,
                        ...styles.width100,
                    }}
                >
                    <Text
                        style={{
                            ...styles.extraLarge,
                            fontSize:
                                fontSize *
                                2 *
                                document.information.sectionEdit.header
                                    .fontRatio,
                            ...styles.accentBackgroundText,
                            ...styles.uppercase,
                            ...styles.bold,
                        }}
                    >
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    {document.information.sectionEdit.header.showPosition && (
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                                ...styles.textColor,
                            }}
                        >
                            {document.information.position}
                        </Text>
                    )}
                </View>
            ) : null,
        },
        headerFresh: {
            name: "Fresh Header",
            description:
                "A header with your name, position, and contact information displayed as a row. Made to match the Fresh template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "row",
                "fresh",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainerSpaceBetweenBottom}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerBottom}>
                                <View style={styles.columnGroupLeft}>
                                    <Text
                                        style={{
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName}
                                    </Text>
                                    {document.information.sectionEdit.header
                                        .showPosition && (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.position}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                ...styles.width100,
                                ...styles.col,
                                ...styles.alignStart,
                                ...styles.justifyStart,
                                ...styles.gapSmall,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.alignEnd,
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
                                                .header.fontRatio,
                                        ...styles.bold,
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
                                                .header.fontRatio,
                                    }}
                                >
                                    {document.information.contactInfo.email}
                                </Text>
                            </View>
                            {document.information.sectionEdit.contact
                                .showPhone && (
                                <View
                                    style={{
                                        ...styles.col,
                                        ...styles.alignEnd,
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
                                                    .header.fontRatio,
                                            ...styles.bold,
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
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {document.information.contactInfo.phone}
                                    </Text>
                                </View>
                            )}
                            {document.information.sectionEdit.contact
                                .showWebsite && (
                                <View
                                    style={{
                                        ...styles.col,
                                        ...styles.alignEnd,
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
                                                    .header.fontRatio,
                                            ...styles.bold,
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
                                                    .header.fontRatio,
                                        }}
                                    >
                                        {
                                            document.information.contactInfo
                                                .website
                                        }
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerVivid: {
            name: "Vivid Header",
            description:
                "A header with your name, position, and a summary. Made to match the Vivid template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "picture",
                "vivid",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainerSpaceBetweenTop}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerTop}>
                                <View style={styles.initialsBox}>
                                    <Text
                                        style={{
                                            ...styles.firstInitial,
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName[0]}
                                    </Text>

                                    <Text
                                        style={{
                                            ...styles.lastInitial,
                                            ...styles.x2Large,
                                            fontSize:
                                                fontSize *
                                                2.5 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName[0]}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.columnGroupLeft,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            fontSize:
                                                fontSize *
                                                2 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}{" "}
                                        {document.information.lastName}
                                    </Text>
                                    {document.information.sectionEdit.header
                                        .showPosition && (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                            }}
                                        >
                                            {document.information.position}
                                        </Text>
                                    )}
                                    {document.information.sectionEdit.header
                                        .showSummary && (
                                        <Text
                                            style={{
                                                ...styles.small,
                                                fontSize:
                                                    fontSize *
                                                    0.8 *
                                                    document.information
                                                        .sectionEdit.header
                                                        .fontRatio,
                                                ...styles.marginTopSmall,
                                            }}
                                        >
                                            {document.information.summary}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerSharp: {
            name: "Sharp Header",
            description:
                "A header with your name, position, and contact information displayed as a row. Made to match the Sharp template.",
            keyWords: [
                "header",
                "name",
                "position",
                "title",
                "contact",
                "row",
                "sharp",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View
                        style={{
                            ...styles.columnGroupCenter,
                            ...styles.accentBackgroundColor,
                            ...styles.paddingLarge,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.x2Large,
                                fontSize:
                                    fontSize *
                                    2.5 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                                ...styles.accentText,
                            }}
                        >
                            {document.information.firstName}{" "}
                            {document.information.lastName}
                        </Text>
                        {document.information.sectionEdit.header
                            .showPosition && (
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.position}
                            </Text>
                        )}
                        <View
                            style={{
                                ...styles.horizontalLineSmall,
                                ...styles.accentTextBackground,
                                ...styles.marginTopMedium,
                                ...styles.marginBottomMedium,
                            }}
                        ></View>
                        <View
                            style={{
                                ...styles.rowContainer,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                            {document.information.sectionEdit.contact
                                .showPhone && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        {document.information.contactInfo.phone}
                                    </Text>
                                </>
                            )}
                            {document.information.sectionEdit.contact
                                .showWebsite && (
                                <>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        |
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            fontSize:
                                                fontSize *
                                                0.8 *
                                                document.information.sectionEdit
                                                    .header.fontRatio,
                                            ...styles.accentText,
                                        }}
                                    >
                                        {
                                            document.information.contactInfo
                                                .website
                                        }
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerLuminary: {
            name: "Luminary Header",
            description:
                "A bold header that really makes your name stand out. Made to match the Luminary template.",
            keyWords: ["header", "name", "position", "title", "luminary"],
            component: fontSize ? (
                <View
                    style={{
                        ...styles.columnGroupLeft,
                        ...styles.col,
                        ...styles.alignStart,
                        ...styles.justifyStart,
                        ...styles.gapSmall,
                        ...styles.width100,
                    }}
                >
                    <View
                        style={{
                            ...styles.row,
                            ...styles.justifyStart,
                            ...styles.alignCenter,
                            ...styles.gapSmall,
                            ...styles.flexWrap,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.extraLarge,
                                fontSize:
                                    fontSize *
                                    2 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                                ...styles.textColor,
                                ...styles.uppercase,
                            }}
                        >
                            {document.information.firstName}
                        </Text>
                        <Text
                            style={{
                                ...styles.extraLarge,
                                fontSize:
                                    fontSize *
                                    2 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                                ...styles.accentBackgroundText,
                                ...styles.uppercase,
                            }}
                        >
                            {document.information.lastName}
                        </Text>
                    </View>
                    {document.information.sectionEdit.header.showPosition && (
                        <Text
                            style={{
                                ...styles.small,
                                fontSize:
                                    fontSize *
                                    0.8 *
                                    document.information.sectionEdit.header
                                        .fontRatio,
                                ...styles.textColor,
                            }}
                        >
                            {document.information.position}
                        </Text>
                    )}
                </View>
            ) : null,
        },
        headerRow: {
            name: "Basic Header - Horizontal",
            description:
                "A header with your name, position, and contact information displayed horizontally to save space.",
            keyWords: ["header", "name", "position", "title", "contact", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowSpaceBetween}>
                        <View style={styles.columnGroupLeft}>
                            <Text
                                style={{
                                    ...styles.large,
                                    fontSize:
                                        fontSize *
                                        1.2 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.textColor,
                                }}
                            >
                                {document.information.firstName}{" "}
                                {document.information.lastName}
                            </Text>
                            {document.information.sectionEdit.header
                                .showPosition && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                        ...styles.textColor,
                                    }}
                                >
                                    {document.information.position}
                                </Text>
                            )}
                        </View>
                        <View style={styles.columnGroupRight}>
                            <Text
                                style={{
                                    ...styles.small,
                                    fontSize:
                                        fontSize *
                                        0.8 *
                                        document.information.sectionEdit.header
                                            .fontRatio,
                                    ...styles.textColor,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                            {document.information.sectionEdit.contact
                                .showPhone && (
                                <Text
                                    style={{
                                        ...styles.small,
                                        fontSize:
                                            fontSize *
                                            0.8 *
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                        ...styles.textColor,
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
                                            document.information.sectionEdit
                                                .header.fontRatio,
                                        ...styles.textColor,
                                    }}
                                >
                                    {document.information.contactInfo.website}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
    };
};

export default getHeaderVariants;
