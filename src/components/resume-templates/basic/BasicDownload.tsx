"use client";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import SectionComponents from "../section-components/SectionComponents";

type DocumentProps = {
    document: any;
};

const BasicDownload = ({ document }: DocumentProps) => {
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };
    const margin = 11;
    const fontSize = 11;

    Font.registerHyphenationCallback(hyphenationCallback);
    // Create styles
    const styles = StyleSheet.create({
        page: { flexDirection: "row" },
        pageContainer: {
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: margin,
            fontSize: fontSize,
            fontFamily: "Times-Roman",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: margin,
        },
    });

    return (
        <Document title="Resume">
            {document &&
                document.information.sectionOrder.map(
                    (array: string[], index: number) => (
                        <Page
                            wrap={false}
                            key={index}
                            style={styles.page}
                            size={[610, 789.4]}
                        >
                            <View wrap={false} style={styles.pageContainer}>
                                <SectionComponents
                                    document={document}
                                    font="Times-Roman"
                                    fontSize={fontSize}
                                    margin={margin}
                                    orderArray={array}
                                />
                            </View>
                        </Page>
                    )
                )}
        </Document>
    );
};

export default BasicDownload;
