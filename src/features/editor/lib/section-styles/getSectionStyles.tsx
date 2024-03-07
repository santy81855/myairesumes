"use client";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import {
    getAccentEmailIcon,
    getAccentPhoneIcon,
    getAccentWebsiteIcon,
} from "../section-icons/SectionIcons";

import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import { getSectionTitleComponent } from "@/features/editor";

const getSectionStyles = (data: {
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

    return StyleSheet.create({
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
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        small: {
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        medium: {
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        large: {
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        extraLarge: {
            fontFamily: font,
            lineHeight: 1.2,
            color: accentColumn
                ? document.information.style.accentTextColor
                : document.information.style.textColor,
        },
        x2Large: {
            fontFamily: font,
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
            marginTop: fontSize / 3,
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
            // align items to the top
            alignItems: "flex-start",
            paddingLeft: fontSize / 4,
            gap: fontSize / 2,
        },
        bulletItem30: {
            flexBasis: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
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
};

export default getSectionStyles;
