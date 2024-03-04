"use client";
import {
    Text,
    View,
    StyleSheet,
    Font,
    Svg,
    Path,
    G,
} from "@react-pdf/renderer";
import {
    formatDateMonthYear,
    sortObjectArrayByDateEnd,
} from "../../../lib/date";

/**
     document: any,
    fontSize: any,
    font: string,
    template: string,
    accentColumn?: boolean
 */

export const SectionConfig = (data: {
    document: any;
    fontSize: any;
    font: string;
    template: string;
    accentColumn: boolean;
    isDownload: boolean;
}) => {
    const { document, fontSize, font, template, accentColumn, isDownload } =
        data;
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };
    // function to handle work break
    Font.registerHyphenationCallback(hyphenationCallback);

    const getSectionTitleComponent = (title: string) => {
        switch (template) {
            case "basic":
                return (
                    <>
                        <Text
                            style={{
                                ...styles.textColor,
                                ...styles.small,
                                ...styles.bold,
                            }}
                        >
                            {title}
                        </Text>
                        <View style={styles.horizontalLine}></View>
                    </>
                );
            case "nexus":
                return (
                    <View
                        style={{
                            backgroundColor:
                                document.information.style
                                    .accentBackgroundColor,
                            width: "100%",
                            maxHeight: fontSize * 1.6,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                ...styles.small,
                                ...styles.accentText,
                                ...styles.textLeftAlign,
                                ...styles.marginLeftMedium,
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                );
            case "impact":
                return (
                    <View
                        style={{
                            ...styles.row,
                            ...styles.width100,
                            ...styles.alignCenter,
                            ...styles.justifyStart,
                            ...styles.gapMedium,
                            ...styles.marginBottomMedium,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.small,
                                ...styles.accentBackgroundText,
                                ...styles.textLeftAlign,
                                ...styles.uppercase,
                            }}
                        >
                            {title}
                        </Text>
                        <View
                            style={{
                                ...styles.flexGrow,
                                ...styles.dottedHorizontalLineAccent,
                            }}
                        ></View>
                    </View>
                );
            case "nova":
                return (
                    <>
                        <Text
                            style={{
                                ...styles.width100,
                                ...styles.small,
                                ...styles.bold,
                                ...styles.uppercase,
                                ...styles.textLeft,
                                ...styles.accentBackgroundText,
                            }}
                        >
                            {title}
                        </Text>
                        <View
                            style={{
                                ...styles.horizontalLineBackgroundAccent,
                                ...styles.marginBottomMedium,
                            }}
                        ></View>
                    </>
                );
            case "fresh":
                return (
                    <>
                        <Text
                            style={{
                                ...styles.width100,
                                ...styles.medium,
                                ...styles.bold,
                                ...styles.uppercase,
                                ...styles.textLeft,
                                ...styles.accentBackgroundText,
                            }}
                        >
                            {title}
                        </Text>
                        <View
                            style={{
                                ...styles.horizontalLineBackgroundAccent,
                                ...styles.marginBottomSmall,
                            }}
                        ></View>
                    </>
                );
            case "vivid":
                return (
                    <>
                        <Text
                            style={{
                                ...styles.width100,
                                ...styles.large,
                                ...styles.bold,
                                ...styles.uppercase,
                                ...styles.textLeft,
                                ...styles.accentBackgroundText,
                                ...styles.marginBottomMedium,
                            }}
                        >
                            {title}
                        </Text>
                    </>
                );
            case "sharp":
                return (
                    <>
                        <Text
                            style={{
                                ...styles.width100,
                                ...styles.medium,
                                ...styles.bold,
                                ...styles.uppercase,
                                ...styles.textLeft,
                                ...styles.accentBackgroundText,
                                ...styles.marginBottomMedium,
                            }}
                        >
                            {title}
                        </Text>
                    </>
                );
            case "luminary":
                return (
                    <>
                        <View
                            style={{
                                ...styles.horizontalLineBackgroundAccent,
                                ...styles.marginBottomSmall,
                                ...styles.opacity80,
                            }}
                        ></View>
                        <Text
                            style={{
                                ...styles.width100,
                                ...styles.medium,
                                ...styles.bold,
                                ...styles.uppercase,
                                ...styles.textLeft,
                                ...styles.accentBackgroundText,
                                ...styles.marginBottomMedium,
                                ...styles.opacity80,
                            }}
                        >
                            {title}
                        </Text>
                    </>
                );
            default:
                return "Section Title";
        }
    };

    const getBoldFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-Bold";
            case "Helvetica":
                return "Helvetica-Bold";
            case "Courier":
                return "Courier-Bold";
            default:
                return "Times-Bold";
        }
    };

    const getItalicFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-Italic";
            case "Helvetica":
                return "Helvetica-Oblique";
            case "Courier":
                return "Courier-Oblique";
            default:
                return "Times-Italic";
        }
    };

    const getBoldItalicFont = () => {
        switch (font) {
            case "Times-Roman":
                return "Times-BoldItalic";
            case "Helvetica":
                return "Helvetica-BoldOblique";
            case "Courier":
                return "Courier-BoldOblique";
            default:
                return "Times-BoldItalic";
        }
    };
    const accentEmailIcon = isDownload ? (
        <Svg
            viewBox="0 0 24 24"
            width={document.information.style.baseFontSize}
            height={document.information.style.baseFontSize}
        >
            <Path
                fill={
                    accentColumn
                        ? document.information.style.accentTextColor
                        : document.information.style.accentBackgroundColor
                }
                d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
            />
        </Svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={fontSize}
            height={fontSize}
            viewBox="0 0 24 24"
        >
            <path
                fill={
                    accentColumn
                        ? document.information.style.accentTextColor
                        : document.information.style.accentBackgroundColor
                }
                d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
            />
        </svg>
    );

    const accentPhoneIcon = isDownload ? (
        <Svg
            viewBox="0 0 24 24"
            width={document.information.style.baseFontSize}
            height={document.information.style.baseFontSize}
        >
            <G fill="none" fill-rule="evenodd">
                <Path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <Path
                    fill={
                        accentColumn
                            ? document.information.style.accentTextColor
                            : document.information.style.accentBackgroundColor
                    }
                    d="M8.172 15.829c3.845 3.845 7.408 4.266 8.454 4.305c1.264.046 2.554-.986 3.112-2.043c-.89-1.044-2.049-1.854-3.318-2.732c-.749.748-1.672 2.138-2.901 1.64c-.699-.281-2.425-1.076-3.933-2.585C8.077 12.906 7.283 11.18 7 10.482c-.498-1.231.896-2.156 1.645-2.905c-.878-1.29-1.674-2.479-2.716-3.324c-1.072.56-2.11 1.84-2.063 3.121c.039 1.046.46 4.609 4.306 8.455m8.38 6.304c-1.44-.053-5.521-.617-9.795-4.89c-4.273-4.274-4.836-8.354-4.89-9.795c-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.608 1.173 2.717 2.95 3.67 4.342A1.504 1.504 0 0 1 10.35 8.7l-1.356 1.357C9.309 10.752 9.95 11.95 11 13c1.05 1.05 2.248 1.691 2.944 2.006l1.355-1.356a1.503 1.503 0 0 1 1.918-.171c1.42.984 3.088 2.077 4.304 3.634a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"
                />
            </G>
        </Svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={fontSize}
            height={fontSize}
            viewBox="0 0 24 24"
        >
            <g fill="none" fill-rule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                    fill={
                        accentColumn
                            ? document.information.style.accentTextColor
                            : document.information.style.accentBackgroundColor
                    }
                    d="M8.172 15.829c3.845 3.845 7.408 4.266 8.454 4.305c1.264.046 2.554-.986 3.112-2.043c-.89-1.044-2.049-1.854-3.318-2.732c-.749.748-1.672 2.138-2.901 1.64c-.699-.281-2.425-1.076-3.933-2.585C8.077 12.906 7.283 11.18 7 10.482c-.498-1.231.896-2.156 1.645-2.905c-.878-1.29-1.674-2.479-2.716-3.324c-1.072.56-2.11 1.84-2.063 3.121c.039 1.046.46 4.609 4.306 8.455m8.38 6.304c-1.44-.053-5.521-.617-9.795-4.89c-4.273-4.274-4.836-8.354-4.89-9.795c-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.608 1.173 2.717 2.95 3.67 4.342A1.504 1.504 0 0 1 10.35 8.7l-1.356 1.357C9.309 10.752 9.95 11.95 11 13c1.05 1.05 2.248 1.691 2.944 2.006l1.355-1.356a1.503 1.503 0 0 1 1.918-.171c1.42.984 3.088 2.077 4.304 3.634a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535"
                />
            </g>
        </svg>
    );

    const accentWebsiteIcon = isDownload ? (
        <Svg
            viewBox="0 0 20 20"
            width={document.information.style.baseFontSize}
            height={document.information.style.baseFontSize}
        >
            <G
                fill={
                    accentColumn
                        ? document.information.style.accentTextColor
                        : document.information.style.accentBackgroundColor
                }
            >
                <Path
                    fill-rule="evenodd"
                    d="M1.5 10a8.5 8.5 0 1 0 17 0a8.5 8.5 0 0 0-17 0m16 0a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0"
                    clip-rule="evenodd"
                />
                <Path
                    fill-rule="evenodd"
                    d="M6.5 10c0 4.396 1.442 8 3.5 8s3.5-3.604 3.5-8s-1.442-8-3.5-8s-3.5 3.604-3.5 8m6 0c0 3.889-1.245 7-2.5 7s-2.5-3.111-2.5-7S8.745 3 10 3s2.5 3.111 2.5 7"
                    clip-rule="evenodd"
                />
                <Path d="m3.735 5.312l.67-.742c.107.096.221.19.343.281c1.318.988 3.398 1.59 5.665 1.59c1.933 0 3.737-.437 5.055-1.19a5.59 5.59 0 0 0 .857-.597l.65.76c-.298.255-.636.49-1.01.704c-1.477.845-3.452 1.323-5.552 1.323c-2.47 0-4.762-.663-6.265-1.79a5.81 5.81 0 0 1-.413-.34m0 9.389l.67.74c.107-.096.221-.19.343-.28c1.318-.988 3.398-1.59 5.665-1.59c1.933 0 3.737.436 5.055 1.19c.321.184.608.384.857.596l.65-.76a6.583 6.583 0 0 0-1.01-.704c-1.477-.844-3.452-1.322-5.552-1.322c-2.47 0-4.762.663-6.265 1.789c-.146.11-.284.223-.413.34M2 10.5v-1h16v1z" />
            </G>
        </Svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={fontSize}
            height={fontSize}
            viewBox="0 0 20 20"
        >
            <g
                fill={
                    accentColumn
                        ? document.information.style.accentTextColor
                        : document.information.style.accentBackgroundColor
                }
            >
                <path
                    fill-rule="evenodd"
                    d="M1.5 10a8.5 8.5 0 1 0 17 0a8.5 8.5 0 0 0-17 0m16 0a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0"
                    clip-rule="evenodd"
                />
                <path
                    fill-rule="evenodd"
                    d="M6.5 10c0 4.396 1.442 8 3.5 8s3.5-3.604 3.5-8s-1.442-8-3.5-8s-3.5 3.604-3.5 8m6 0c0 3.889-1.245 7-2.5 7s-2.5-3.111-2.5-7S8.745 3 10 3s2.5 3.111 2.5 7"
                    clip-rule="evenodd"
                />
                <path d="m3.735 5.312l.67-.742c.107.096.221.19.343.281c1.318.988 3.398 1.59 5.665 1.59c1.933 0 3.737-.437 5.055-1.19a5.59 5.59 0 0 0 .857-.597l.65.76c-.298.255-.636.49-1.01.704c-1.477.845-3.452 1.323-5.552 1.323c-2.47 0-4.762-.663-6.265-1.79a5.81 5.81 0 0 1-.413-.34m0 9.389l.67.74c.107-.096.221-.19.343-.28c1.318-.988 3.398-1.59 5.665-1.59c1.933 0 3.737.436 5.055 1.19c.321.184.608.384.857.596l.65-.76a6.583 6.583 0 0 0-1.01-.704c-1.477-.844-3.452-1.322-5.552-1.322c-2.47 0-4.762.663-6.265 1.789c-.146.11-.284.223-.413.34M2 10.5v-1h16v1z" />
            </g>
        </svg>
    );

    // Create styles
    const styles = StyleSheet.create({
        opacity80: {
            opacity: 0.8,
        },
        horizontalLineBackgroundAccent: {
            width: "100%",
            height: fontSize / 20,
            backgroundColor: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.accentBackgroundColor,
        },
        flexWrap: {
            flexWrap: "wrap",
        },
        textColor: {
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        width100: {
            width: "100%",
        },
        textLeft: {
            textAlign: "left",
        },
        textRight: {
            textAlign: "right",
        },
        textCenter: {
            textAlign: "center",
        },
        uppercase: {
            textTransform: "uppercase",
        },
        accentText: {
            color: document.information.style.accentTextColor,
        },
        accentBackgroundText: {
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.accentBackgroundColor,
        },
        accentBackgroundColor: {
            backgroundColor: document.information.style.accentBackgroundColor,
        },
        sectionContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 4,
        },
        sectionTitle: {
            fontSize: fontSize * 1.3,
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        italic: {
            fontFamily: getItalicFont(),
            fontStyle: "italic",
        },
        boldItalic: {
            fontFamily: getBoldItalicFont(),
            fontWeight: "bold",
            fontStyle: "italic",
        },
        bold: {
            fontFamily: getBoldFont(),
            fontWeight: "bold",
        },
        marginLeftSmall: {
            marginLeft: fontSize / 4,
        },
        marginLeftMedium: {
            marginLeft: fontSize / 2,
        },
        marginLeftLarge: {
            marginLeft: fontSize,
        },
        textLeftAlign: {
            textAlign: "left",
        },
        textCenterAlign: {
            textAlign: "center",
        },
        textRightAlign: {
            textAlign: "right",
        },
        extraSmall: {
            fontSize: fontSize * 0.6,
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        small: {
            fontSize: fontSize * 0.8,
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        medium: {
            fontSize: fontSize * 1,
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        large: {
            fontSize: fontSize * 1.2,
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        extraLarge: {
            fontFamily: font,
            fontSize: fontSize * 2,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        x2Large: {
            fontFamily: font,
            fontSize: fontSize * 2.5,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        row: {
            display: "flex",
            flexDirection: "row",
        },
        col: {
            display: "flex",
            flexDirection: "column",
        },
        alignStart: {
            alignItems: "flex-start",
        },
        alignEnd: {
            alignItems: "flex-end",
        },
        alignCenter: {
            alignItems: "center",
        },
        justifyStart: {
            justifyContent: "flex-start",
        },
        justifyEnd: {
            justifyContent: "flex-end",
        },
        justifyCenter: {
            justifyContent: "center",
        },
        gapSmall: {
            gap: fontSize / 2,
        },
        gapMedium: {
            gap: fontSize,
        },
        gapLarge: {
            gap: fontSize * 2,
        },
        flexGrow: {
            flexGrow: 1,
        },
        marginBottomSmall: {
            marginBottom: fontSize / 4,
        },
        marginBottomMedium: {
            marginBottom: fontSize / 2,
        },
        marginBottomLarge: {
            marginBottom: fontSize,
        },
        marginTopSmall: {
            marginTop: fontSize / 4,
        },
        marginTopMedium: {
            marginTop: fontSize / 2,
        },
        marginTopLarge: {
            marginTop: fontSize,
        },
        dottedHorizontalLine: {
            borderBottomStyle: "dotted",
            borderBottomWidth: fontSize / 6,
            borderBottomColor: "black",
        },
        dottedHorizontalLineAccent: {
            borderBottomStyle: "dotted",
            borderBottomWidth: fontSize / 6,
            borderBottomColor: document.information.style.accentBackgroundColor,
        },
        rowContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 1.5,
        },
        columnGroupCenter: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: fontSize / 12,
        },
        columnGroupLeft: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 12,
        },
        columnGroupRight: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: fontSize / 12,
        },
        bullet: {
            minWidth: fontSize / 3,
            minHeight: fontSize / 3,
            backgroundColor: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
            borderRadius: "50%",
        },
        horizontalLine: {
            width: "100%",
            height: fontSize / 20,
            backgroundColor: "black",
        },
        horizontalLineTextAccent: {
            width: "100%",
            height: fontSize / 20,
            backgroundColor: document.information.style.accentTextColor,
        },
        arrayContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize,
        },
        arrayItem: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 2,
        },
        rowSpaceBetween: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        bulletItemContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 3,
        },
        bulletItem: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: fontSize / 4,
            gap: fontSize / 2,
        },
        bulletItem30: {
            flexBasis: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: fontSize / 2,
        },
        rowContainerWrap: {
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        rowContainerBottom: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: fontSize / 1.5,
        },
        rowContainerSpaceBetweenBottom: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: fontSize / 1.5,
        },
        rowContainerSpaceBetweenTop: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        rowContainerTop: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: fontSize / 1.5,
        },
        initialsBox: {
            minWidth: fontSize * 6,
            minHeight: fontSize * 6,
            backgroundColor: "transparent",
            border: `${fontSize / 6}px solid ${
                document.information.style.accentBackgroundColor
            }`,
            position: "relative",
        },
        firstInitial: {
            width: "50%",
            fontFamily: font,
            color: document.information.style.accentBackgroundColor,
            position: "absolute",
            top: fontSize / 2,
            left: fontSize / 2,
        },
        lastInitial: {
            fontFamily: font,
            color: document.information.style.accentBackgroundColor,
            position: "absolute",
            bottom: fontSize / 2,
            right: fontSize / 2,
        },
        diagonalBar: {
            width: fontSize / 6,
            height: "100%",
            backgroundColor: document.information.style.accentBackgroundColor,
            position: "absolute",
            top: "0",
            left: `calc(50% - ${fontSize / 12}px)`,
            transform: "rotate(45deg)",
        },
        paddingSmall: {
            padding: fontSize / 4,
        },
        paddingMedium: {
            padding: fontSize / 2,
        },
        paddingLarge: {
            padding: fontSize,
        },
        flexShrink: {
            flexShrink: 1,
        },
        justifyBetween: {
            justifyContent: "space-between",
        },
        widthAuto: {
            width: "auto",
        },
        accentTextBackground: {
            backgroundColor: document.information.style.accentTextColor,
        },
        borderRadiusSmall: {
            borderRadius: fontSize / 4,
        },
        paddingVerticalSmall: {
            paddingVertical: fontSize / 6,
        },
        paddingHorizontalSmall: {
            paddingHorizontal: fontSize / 6,
        },
        paddingHorizontalMedium: {
            paddingHorizontal: fontSize / 4,
        },
        paddingHorizontalLarge: {
            paddingHorizontal: fontSize / 2,
        },
        paddingVerticalLarge: {
            paddingVertical: fontSize / 2,
        },
        paddingVerticalMedium: {
            paddingVertical: fontSize / 4,
        },
        backgroundAccentForText: {
            color: document.information.style.accentBackgroundColor,
        },
        minHeightSmall: {
            minHeight: fontSize * 2,
        },
        minHeightMedium: {
            minHeight: fontSize * 3,
        },
        minHeightLarge: {
            minHeight: fontSize * 4,
        },
        marginRightSmall: {
            marginRight: fontSize / 4,
        },
        marginRightMedium: {
            marginRight: fontSize / 2,
        },
        marginRightLarge: {
            marginRight: fontSize,
        },
        horizontalLineSmall: {
            width: "20%",
            height: fontSize / 20,
        },
    });

    const headerVariants = {
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
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
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
                    <View style={styles.rowContainerSpaceBetweenTop}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerBottom}>
                                <View style={styles.initialsBox}>
                                    <Text
                                        style={{
                                            ...styles.firstInitial,
                                            ...styles.x2Large,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName[0]}
                                    </Text>

                                    <Text
                                        style={{
                                            ...styles.lastInitial,
                                            ...styles.x2Large,
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
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.extraLarge,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {document.information.position}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.columnGroupRight}>
                            <Text style={styles.small}>
                                {document.information.contactInfo.email}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.phone}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.website}
                            </Text>
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
                    <View style={styles.rowSpaceBetween}>
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
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.firstName}{" "}
                                {document.information.lastName}
                            </Text>
                            <Text
                                style={{
                                    ...styles.small,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.position}
                            </Text>
                        </View>
                        <View style={styles.columnGroupRight}>
                            <Text style={styles.small}>
                                {document.information.contactInfo.email}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.phone}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.website}
                            </Text>
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
                            ...styles.accentBackgroundText,
                            ...styles.uppercase,
                            ...styles.bold,
                        }}
                    >
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                    <Text
                        style={{
                            ...styles.small,
                            ...styles.textColor,
                        }}
                    >
                        {document.information.position}
                    </Text>
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
                    <View style={styles.rowContainerSpaceBetweenTop}>
                        <View style={styles.columnGroupLeft}>
                            <View style={styles.rowContainerBottom}>
                                <View style={styles.columnGroupLeft}>
                                    <Text
                                        style={{
                                            ...styles.x2Large,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.x2Large,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.lastName}
                                    </Text>
                                    <Text style={styles.small}>
                                        {document.information.position}
                                    </Text>
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
                                    style={{ ...styles.small, ...styles.bold }}
                                >
                                    Email
                                </Text>
                                <Text style={styles.small}>
                                    {document.information.contactInfo.email}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.alignEnd,
                                    ...styles.width100,
                                }}
                            >
                                <Text
                                    style={{ ...styles.small, ...styles.bold }}
                                >
                                    Phone
                                </Text>
                                <Text style={styles.small}>
                                    {document.information.contactInfo.phone}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.col,
                                    ...styles.alignEnd,
                                    ...styles.width100,
                                }}
                            >
                                <Text
                                    style={{ ...styles.small, ...styles.bold }}
                                >
                                    Website
                                </Text>
                                <Text style={styles.small}>
                                    {document.information.contactInfo.website}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ) : null,
        },
        headerVivid: {
            name: "Vivid Header",
            description:
                "A header with your name, a headshot, position, and a summary. Made to match the Vivid template.",
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
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName[0]}
                                    </Text>

                                    <Text
                                        style={{
                                            ...styles.lastInitial,
                                            ...styles.x2Large,
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
                                            ...styles.large,
                                            ...styles.accentBackgroundText,
                                        }}
                                    >
                                        {document.information.firstName}{" "}
                                        {document.information.lastName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                        }}
                                    >
                                        {document.information.position}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                            ...styles.marginTopSmall,
                                        }}
                                    >
                                        {document.information.summary}
                                    </Text>
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
                                ...styles.accentText,
                            }}
                        >
                            {document.information.firstName}{" "}
                            {document.information.lastName}
                        </Text>
                        <Text
                            style={{
                                ...styles.small,
                                ...styles.accentText,
                            }}
                        >
                            {document.information.position}
                        </Text>
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
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.contactInfo.email}
                            </Text>
                            <Text
                                style={{
                                    ...styles.small,
                                    ...styles.accentText,
                                }}
                            >
                                |
                            </Text>
                            <Text
                                style={{
                                    ...styles.small,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.contactInfo.phone}
                            </Text>
                            <Text
                                style={{
                                    ...styles.small,
                                    ...styles.accentText,
                                }}
                            >
                                |
                            </Text>
                            <Text
                                style={{
                                    ...styles.small,
                                    ...styles.accentText,
                                }}
                            >
                                {document.information.contactInfo.website}
                            </Text>
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
                                ...styles.textColor,
                                ...styles.uppercase,
                            }}
                        >
                            {document.information.firstName}
                        </Text>
                        <Text
                            style={{
                                ...styles.extraLarge,
                                ...styles.accentBackgroundText,
                                ...styles.uppercase,
                            }}
                        >
                            {document.information.lastName}
                        </Text>
                    </View>
                    <Text
                        style={{
                            ...styles.small,
                            ...styles.textColor,
                        }}
                    >
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
        headerRow: {
            name: "Impact Header",
            description:
                "A header with your name, position, and contact information displayed as a row. Made to match the Impact template.",
            keyWords: ["header", "name", "position", "title", "contact", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowSpaceBetween}>
                        <View style={styles.columnGroupLeft}>
                            <Text style={styles.large}>
                                {document.information.firstName}{" "}
                                {document.information.lastName}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.position}
                            </Text>
                        </View>
                        <View style={styles.columnGroupRight}>
                            <Text style={styles.small}>
                                {document.information.contactInfo.email}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.phone}
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.website}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : null,
        },
    };

    const educationVariants = {
        educationShort: {
            name: "Brief Education",
            description:
                "A short education history that includes a bold heading, school name, degree, and graduation date.",
            keyWords: ["education", "school", "degree", "graduation", "short"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    {getSectionTitleComponent("Education")}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View
                                    style={{
                                        ...styles.rowSpaceBetween,
                                        ...styles.width100,
                                        ...styles.flexWrap,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.small,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.small,
                                        }}
                                    >
                                        {formatDateMonthYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        educationDetailed: {
            name: "Detailed Education",
            description:
                "A detailed education history. Includes a bold heading, a start date, a graduation date, a school name, a degree type, a degree field, a GPA, and a bullet point list of achievements.",
            keyWords: [
                "education",
                "school",
                "degree",
                "graduation",
                "academic",
                "history",
                "detailed",
                "comprehensive",
                "gpa",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="educationPdf">
                    {getSectionTitleComponent("Education")}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.educationArray,
                            -1
                        ).map((education: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View
                                    style={{
                                        ...styles.rowSpaceBetween,
                                        ...styles.flexWrap,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.small,
                                            ...styles.bold,
                                        }}
                                    >
                                        {education.schoolName}
                                    </Text>
                                    <Text
                                        style={{
                                            ...styles.extraSmall,
                                            ...styles.italic,
                                        }}
                                    >
                                        {formatDateMonthYear(
                                            education.startDate
                                        )}{" "}
                                        -{" "}
                                        {education.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthYear(
                                                  education.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {education.degreeType} in{" "}
                                    {education.degreeField}
                                </Text>
                                <Text style={styles.small}>
                                    GPA: {education.gpa}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {education.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
    };

    const nameVariants = {
        name: {
            name: "Name",
            description: "Your name in its own line.",
            keyWords: ["name", "first", "last"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.firstName}{" "}
                        {document.information.lastName}
                    </Text>
                </View>
            ) : null,
        },
    };

    const positionVariants = {
        position: {
            name: "Position",
            description: "Your job title displayed as its own line.",
            keyWords: ["position", "job", "title"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.small}>
                        {document.information.position}
                    </Text>
                </View>
            ) : null,
        },
    };

    const contactVariants = {
        contactHorizontal: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed horizontally with a pipe separator. You can choose to omit any of the three contact details.",
            keyWords: ["contact", "email", "phone", "website", "horizontal"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.small}>
                            {document.information.contactInfo.email}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.phone}
                        </Text>
                        <Text style={styles.small}>|</Text>
                        <Text style={styles.small}>
                            {document.information.contactInfo.website}
                        </Text>
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
                            ...styles.alignStart,
                            ...styles.justifyStart,
                            ...styles.gapSmall,
                        }}
                    >
                        <View
                            style={{
                                ...styles.col,
                                ...styles.alignStart,
                                ...styles.width100,
                            }}
                        >
                            <Text style={{ ...styles.small, ...styles.bold }}>
                                Email
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.email}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.col,
                                ...styles.alignStart,
                                ...styles.width100,
                            }}
                        >
                            <Text style={{ ...styles.small, ...styles.bold }}>
                                Phone
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.phone}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.col,
                                ...styles.alignStart,
                                ...styles.width100,
                            }}
                        >
                            <Text style={{ ...styles.small, ...styles.bold }}>
                                Website
                            </Text>
                            <Text style={styles.small}>
                                {document.information.contactInfo.website}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : null,
        },
        contactLuminary: {
            name: "Contact: Email, Phone, Website",
            description:
                "Your email, phone number, and website displayed as a row. Defaults to the left side, but can be changed to be center or right aligned. You can choose to omit any of the three contact details.",
            keyWords: [
                "contact",
                "email",
                "phone",
                "website",
                "luminary",
                "icons",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
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
                                ...styles.row,
                                ...styles.alignCenter,
                                ...styles.justifyStart,
                                ...styles.gapSmall,
                                ...styles.width100,
                            }}
                        >
                            {accentEmailIcon}
                            <Text style={styles.small}>
                                {document.information.contactInfo.email}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.row,
                                ...styles.alignCenter,
                                ...styles.justifyStart,
                                ...styles.gapSmall,
                                ...styles.width100,
                            }}
                        >
                            {accentPhoneIcon}
                            <Text style={styles.small}>
                                {document.information.contactInfo.phone}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.row,
                                ...styles.alignCenter,
                                ...styles.justifyStart,
                                ...styles.gapSmall,
                                ...styles.width100,
                            }}
                        >
                            {accentWebsiteIcon}
                            <Text style={styles.small}>
                                {document.information.contactInfo.website}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : null,
        },
    };

    const skillsVariants = {
        skillsVivid: {
            name: "Skills - Vivid",
            description:
                "Your skills in a column, with a contrasting background. Ideal for a list of short skills. Made to match the Vivid template.",
            keyWords: [
                "skills",
                "abilities",
                "strengths",
                "brief",
                "column",
                "vivid",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <View style={styles.rowContainerWrap}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View
                                    style={
                                        accentColumn
                                            ? {
                                                  ...styles.col,
                                                  ...styles.justifyCenter,
                                                  ...styles.alignStart,
                                                  ...styles.width100,
                                                  ...styles.minHeightMedium,
                                                  ...styles.accentTextBackground,
                                                  ...styles.borderRadiusSmall,
                                              }
                                            : {
                                                  ...styles.col,
                                                  ...styles.justifyCenter,
                                                  ...styles.alignStart,
                                                  ...styles.width100,
                                                  ...styles.minHeightMedium,
                                                  ...styles.accentBackgroundColor,
                                                  ...styles.borderRadiusSmall,
                                              }
                                    }
                                    key={index}
                                >
                                    <Text
                                        style={
                                            accentColumn
                                                ? {
                                                      ...styles.marginLeftSmall,
                                                      ...styles.marginRightSmall,
                                                      ...styles.marginTopSmall,
                                                      ...styles.marginBottomSmall,
                                                      ...styles.small,
                                                      ...styles.backgroundAccentForText,
                                                  }
                                                : {
                                                      ...styles.marginLeftSmall,
                                                      ...styles.marginRightSmall,
                                                      ...styles.marginTopSmall,
                                                      ...styles.marginBottomSmall,
                                                      ...styles.small,
                                                      ...styles.accentText,
                                                  }
                                        }
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
        skillsBulletRow: {
            name: "Skills - Brief, Bullet Points",
            description:
                "Your skills in a horizontal bullet point list. Ideal for a list of short skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet", "row"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <View style={{ ...styles.rowContainerWrap }}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem30} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsBullet: {
            name: "Skills - Detailed, Bullet Points",
            description:
                "Your skills in a vertical bullet point list. Ideal for a list of detailed skills.",
            keyWords: ["skills", "abilities", "strengths", "bullet"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="skillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <View style={styles.bulletItemContainer}>
                        {document.information.skillArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        skillsComma: {
            name: "Skills - Brief, Comma-Separated",
            description:
                "Your skills in a comma separated list. Ideal for a list of skills that are only 1 or 2 words long. Useful for when you want to save space.",
            keyWords: ["skills", "abilities", "strengths", "short", "comma"],
            // short skills are displayed as a comma separated list
            component: fontSize ? (
                <View style={styles.sectionContainer} id="shortSkillsPdf">
                    {getSectionTitleComponent("Skills")}
                    <Text style={styles.small}>
                        {document.information.skillArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
    };

    return {
        ...headerVariants,
        ...nameVariants,
        ...positionVariants,
        ...educationVariants,
        ...contactVariants,
        ...skillsVariants,
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
                <View style={styles.sectionContainer} id="summaryPdf">
                    {getSectionTitleComponent("Summary")}
                    <Text style={styles.small}>
                        {document.information.summary}
                    </Text>
                </View>
            ) : null,
        },
        experience: {
            name: "Experience",
            description: "Your previous employment history.",
            keyWords: [
                "experience",
                "work",
                "job",
                "career",
                "professional",
                "employment",
                "history",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="experiencePdf">
                    {getSectionTitleComponent("Experience")}
                    <View style={styles.arrayContainer}>
                        {sortObjectArrayByDateEnd(
                            document.information.experienceArray,
                            -1
                        ).map((experience: any, index: number) => (
                            <View key={index} style={styles.arrayItem}>
                                <View style={styles.rowSpaceBetween}>
                                    <Text
                                        style={{
                                            ...styles.medium,
                                            ...styles.bold,
                                        }}
                                    >
                                        {experience.company}
                                    </Text>
                                    <Text style={styles.small}>
                                        {formatDateMonthYear(
                                            experience.startDate
                                        )}{" "}
                                        -{" "}
                                        {experience.endDate === "Present"
                                            ? "Present"
                                            : formatDateMonthYear(
                                                  experience.endDate
                                              )}
                                    </Text>
                                </View>
                                <Text style={styles.small}>
                                    {experience.position}
                                </Text>
                                <Text style={styles.small}>
                                    {experience.summary}
                                </Text>
                                <View style={styles.bulletItemContainer}>
                                    {experience.bullets.map(
                                        (bullet: string, index: number) => (
                                            <View
                                                key={index}
                                                style={styles.bulletItem}
                                            >
                                                <View
                                                    style={styles.bullet}
                                                ></View>
                                                <Text style={styles.small}>
                                                    {bullet}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null,
        },
        languages: {
            name: "Languages",
            description: "Your languages in a bullet point list.",
            keyWords: ["languages"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="languagesPdf">
                    {getSectionTitleComponent("Languages")}
                    <View style={styles.arrayContainer}>
                        <View style={styles.bulletItemContainer}>
                            {document.information.languageArray.map(
                                (skill: string, index: number) => (
                                    <View style={styles.bulletItem} key={index}>
                                        <View style={styles.bullet}></View>
                                        <Text style={styles.small}>
                                            {skill}
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                </View>
            ) : null,
        },
        languagesShort: {
            name: "Languages",
            description: "Your languages in a comma separated list.",
            keyWords: ["languages"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="languagesPdf">
                    {getSectionTitleComponent("Languages")}
                    <Text style={styles.small}>
                        {document.information.languageArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        interests: {
            name: "Interests",
            description: "Your interests in a bullet point list.",
            keyWords: ["interests", "hobbies"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interests">
                    {getSectionTitleComponent("Interests")}
                    <View style={styles.bulletItemContainer}>
                        {document.information.interestArray.map(
                            (skill: string, index: number) => (
                                <View style={styles.bulletItem} key={index}>
                                    <View style={styles.bullet}></View>
                                    <Text style={styles.small}>{skill}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            ) : null,
        },
        interestsShort: {
            name: "Interests",
            description: "Your interests in a comma separated list.",
            keyWords: ["interests", "hobbies"],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="interests">
                    {getSectionTitleComponent("Interests")}
                    <Text style={styles.small}>
                        {document.information.interestArray.join(", ")}
                    </Text>
                </View>
            ) : null,
        },
        projects: {
            name: "Projects",
            description: "Your projects",
            keyWords: [
                "projects",
                "project",
                "portfolio",
                "work",
                "assignments",
            ],
            component: fontSize ? (
                <View style={styles.sectionContainer} id="projects">
                    {getSectionTitleComponent("Projects")}
                </View>
            ) : null,
        },
    };
};
