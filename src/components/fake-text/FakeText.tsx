import styles from "./FakeText.module.css";

type props = {
    numLines: number;
    lineHeight: string;
    spacing: string;
};

// add numLines number of divs
const FakeText = ({ numLines, lineHeight, spacing }: props) => {
    return (
        <section className={styles.container}>
            {Array.from(Array(numLines).keys()).map((i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: "#cecece",
                        width: "80%",
                        height: lineHeight,
                        marginBottom: spacing,
                        display: "flex",
                    }}
                ></div>
            ))}
        </section>
    );
};

export default FakeText;
