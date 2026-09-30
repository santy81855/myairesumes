"use client";
import { Text, View } from "@react-pdf/renderer";

const getSectionTitleComponent = (data: {
    document: any;
    fontSize: any;
    font: string;
    template: string;
    accentColumn: boolean;
    isDownload: boolean;
    styles: any;
    title: string;
}) => {
    const {
        document,
        fontSize,
        font,
        template,
        accentColumn,
        isDownload,
        styles,
        title,
    } = data;

    switch (template) {
        case "basic":
            return (
                <>
                    <Text
                        style={{
                            ...styles.textColor,
                            ...styles.small,
                            fontSize: fontSize * 0.8,
                            ...styles.uppercase,
                        }}
                    >
                        {title}
                    </Text>
                    <View
                        style={{
                            ...styles.horizontalLine,
                            ...styles.marginBottomMedium,
                        }}
                    ></View>
                </>
            );
        case "velocity":
            return (
                <>
                    <Text
                        style={{
                            ...styles.textColor,
                            ...styles.small,
                            fontSize: fontSize * 0.8,
                            ...styles.uppercase,
                            ...styles.width100,
                            ...styles.textLeft,
                        }}
                    >
                        {title}
                    </Text>
                    <View
                        style={{
                            ...styles.horizontalLine,
                            ...styles.marginBottomMedium,
                        }}
                    ></View>
                </>
            );
        case "triumph":
            return (
                <>
                    <Text
                        style={{
                            ...styles.textColor,
                            ...styles.small,
                            fontSize: fontSize * 0.8,
                            ...styles.uppercase,
                        }}
                    >
                        {title}
                    </Text>
                    <View
                        style={{
                            ...styles.horizontalLine,
                            ...styles.marginBottomMedium,
                        }}
                    ></View>
                </>
            );
        case "nexus":
            return (
                <View
                    style={{
                        backgroundColor:
                            document.information.style.accentBackgroundColor,
                        width: "100%",
                        minHeight: fontSize * 1.6,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...styles.small,
                            fontSize: fontSize * 0.8,
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
                            fontSize: fontSize * 0.8,
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
                            fontSize: fontSize * 0.8,
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
                            fontSize: fontSize * 1,
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
        case "vivid":
            return (
                <>
                    <Text
                        style={{
                            ...styles.width100,
                            ...styles.large,
                            fontSize: fontSize * 1.2,
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
                            fontSize: fontSize * 1,
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
                            fontSize: fontSize * 1,
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

export default getSectionTitleComponent;
