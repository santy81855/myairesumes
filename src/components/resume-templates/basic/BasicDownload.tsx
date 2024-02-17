"use client";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

const BasicDownload = () => {
    const hyphenationCallback = (word: string) => {
        // Return word parts in an array
        return [word];
    };

    Font.registerHyphenationCallback(hyphenationCallback);
    // register inter font
    Font.register({
        family: "Inter",
        src: "/fonts/inter.ttf",
        fontStyle: "normal",
        fontWeight: "normal",
    });

    // Create styles
    const styles = StyleSheet.create({
        page: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        view: {
            backgroundColor: "white",
            width: 610,
            height: 789,
            fontSize: 11,
        },
        text: {
            fontSize: 11 * 1.5,
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16,
            fontFamily: "Inter",
            fontWeight: 300,
        },
    });

    // add margins to individual sections rather than the whole page to account for templates with more complex layouts

    return (
        <Document title="Resume">
            <Page wrap={false} style={styles.page}>
                <View style={styles.view}>
                    <Text style={styles.text}>
                        tho auntoheau tnaoehu toehuntshetunho easntuh asontedhu
                        tnaoeh utnaoeh utnshaoesnutaoheuaoedutnshaoe utnshaoe
                        utnshoae uoaedu aoetuh aoeudaoe
                        udheduhindihuedinehotdisb mbva oevmubavoe uhaoedu
                        oaecrug acogrucae oucgraoeuclroaeg ucaoergu olarc
                        ugcrlag oercug oaecrug acogrucae oucgraoeuclroaeg
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default BasicDownload;
