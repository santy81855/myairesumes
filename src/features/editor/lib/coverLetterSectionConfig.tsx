"use client";
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { formatDateMonthYear } from "../../../lib/date";

export const CoverLetterSectionConfig = (
    document: any,
    fontSize: any,
    font: string,
    template: string,
    accentColumn?: boolean
) => {
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
    // Create styles
    const styles = StyleSheet.create({
        horizontalLineBackgroundAccent: {
            width: "100%",
            height: fontSize / 10,
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
            height: fontSize / 10,
            backgroundColor: "black",
        },
        horizontalLineTextAccent: {
            width: "100%",
            height: fontSize / 10,
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
            height: fontSize / 12,
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
    };

    const employerInfoVariants = {
        employerInfo: {
            name: "Employer Info",
            description:
                "Your employer's name, address, and contact information displayed as a column.",
            keyWords: ["employer", "company", "address", "contact"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.large}>
                        {document.information.companyName}
                    </Text>
                </View>
            ) : null,
        },
    };

    const dateVariants = {
        date: {
            name: "Date",
            description:
                "The current date displayed in the format of Month Year.",
            keyWords: ["date", "month", "year"],
            component: fontSize ? (
                <Text style={styles.small}>
                    {formatDateMonthYear(document.information.date)}
                </Text>
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
                    <View style={styles.columnGroupLeft}>
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
            ) : null,
        },
    };

    const salutationVariants = {
        salutation: {
            name: "Salutation",
            description:
                "A greeting to the employer, like 'Dear Hiring Manager,'.",
            keyWords: ["salutation", "greeting", "dear"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.medium}>
                        {document.information.salutation}
                    </Text>
                </View>
            ) : null,
        },
    };

    const closingVariants = {
        closing: {
            name: "Closing",
            description: "A closing to the employer, like 'Sincerely,'.",
            keyWords: ["closing", "sincerely", "regards"],
            component: fontSize ? (
                <View style={styles.sectionContainer}>
                    <Text style={styles.medium}>
                        {document.information.closing}
                    </Text>
                </View>
            ) : null,
        },
    };

    const bodyVariants = {
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

    return {
        ...bodyVariants,
        ...salutationVariants,
        ...employerInfoVariants,
        ...dateVariants,
        ...headerVariants,
        ...nameVariants,
        ...positionVariants,
        ...contactVariants,
        ...closingVariants,
        body: {
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
                    <Text style={styles.small}>
                        {document.information.summary}
                    </Text>
                </View>
            ) : null,
        },
    };
};
