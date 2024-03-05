"use client";
import styles from "./StyleMenu.module.css";
import { textIcon, minusIcon, plusIcon } from "@/components/icons/iconSVG";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";
import { MenuContainer, updateDocumentArray } from "@/features/editor";
import { HexColorPicker } from "react-colorful";

type StyleMenuProps = {
    document: any;
};

const StyleMenu = ({ document }: StyleMenuProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const params = useParams();
    const id = params.slug[1];
    const [color, setColor] = useState<string>(
        document.information.style.accentBackgroundColor
    );
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [accentTextColor, setAccentTextColor] = useState<string>(
        document.information.style.accentTextColor
    );
    const [fontSize, setFontSize] = useState<string>(
        document.information.style.baseFontSize
    );
    const [marginSize, setMarginSize] = useState<string>(
        document.information.style.baseMarginSize
    );
    const [sectionGap, setSectionGap] = useState<string>(
        document.information.style.baseSectionGap
    );
    const [showTextColorPicker, setShowTextColorPicker] =
        useState<boolean>(false);

    const handleFontSizeChange = (size: string) => {
        if (!document) return;
        // if it is not a number, return
        if (size === "") size = "12";
        if (parseInt(size) < 1) size = "12";
        if (isNaN(parseInt(size))) return;
        setFontSize(size);
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    baseFontSize: parseInt(size),
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const handleMarginSizeChange = (size: string) => {
        console.log(size);
        if (!document) return;
        // if it is not a number, return
        if (size === "") size = "12";
        if (parseInt(size) < 1) size = "12";
        if (isNaN(parseInt(size))) return;
        setMarginSize(size);
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    baseMarginSize: parseInt(size),
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const handleFontChange = (font: string) => {
        if (!document) return;
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                font: font,
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const handleSectionGapChange = (size: string) => {
        if (!document) return;
        // if it is not a number, return
        if (size === "") size = "12";
        if (parseInt(size) < 1) size = "12";
        if (isNaN(parseInt(size))) return;
        setSectionGap(size);
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    baseSectionGap: parseInt(size),
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const handleAccentColorChange = (color: string) => {
        if (!document) return;
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    accentBackgroundColor: color,
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const handleAccentTextColorChange = (color: string) => {
        if (!document) return;
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    accentTextColor: color,
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const backgroundColorPresets = ["#b5b357", "#b38758", "#5d906c", "#698bd7"];
    const textAccentColorPresets = ["#000000", "#e0e0e0", "#e0e0e0", "#ffffff"];

    return (
        <MenuContainer>
            <motion.section className={styles.stylesContainer}>
                <motion.section className={styles.titleContainer}>
                    {textIcon}
                    <motion.p className={styles.title}>Text style</motion.p>
                </motion.section>
                <motion.div className={styles.sectionTitleContainer}>
                    <motion.div className={styles.horizontalBar}></motion.div>
                    <motion.p className={styles.sectionTitle}>FONT</motion.p>
                </motion.div>
                <motion.section className={styles.section}>
                    <motion.section className={styles.sectionContainer}>
                        <motion.p className={styles.description}>Font</motion.p>
                        <motion.select
                            className={styles.font}
                            onChange={(e) => handleFontChange(e.target.value)}
                        >
                            <motion.option
                                value="Courier"
                                selected={
                                    document.information.font === "Courier"
                                }
                            >
                                Courier
                            </motion.option>
                            <motion.option
                                value="Helvetica"
                                selected={
                                    document.information.font === "Helvetica"
                                }
                            >
                                Helvetica
                            </motion.option>
                            <motion.option
                                value="Times-Roman"
                                selected={
                                    document.information.font === "Times-Roman"
                                }
                            >
                                Times New Roman
                            </motion.option>
                        </motion.select>
                    </motion.section>
                    <motion.section className={styles.sectionContainer}>
                        <motion.p className={styles.description}>
                            Font Size
                        </motion.p>
                        <motion.section className={styles.inputContainer}>
                            <motion.button
                                className={`${styles.button} ${styles.left}`}
                                onClick={() =>
                                    handleFontSizeChange(
                                        (parseInt(fontSize) - 1).toString()
                                    )
                                }
                            >
                                {minusIcon}
                            </motion.button>
                            <motion.input
                                type="number"
                                className={styles.fontSize}
                                value={fontSize}
                                onClick={(e) =>
                                    (e.target as HTMLInputElement).select()
                                }
                                onChange={(e) =>
                                    handleFontSizeChange(e.target.value)
                                }
                            />
                            <motion.button
                                className={`${styles.button} ${styles.right}`}
                                onClick={() =>
                                    handleFontSizeChange(
                                        (parseInt(fontSize) + 1).toString()
                                    )
                                }
                            >
                                {plusIcon}
                            </motion.button>
                        </motion.section>
                    </motion.section>
                </motion.section>
                <motion.div className={styles.sectionTitleContainer}>
                    <motion.div className={styles.horizontalBar}></motion.div>
                    <motion.p className={styles.sectionTitle}>SPACING</motion.p>
                </motion.div>
                <motion.section className={styles.section}>
                    <motion.section className={styles.sectionContainer}>
                        <motion.p className={styles.description}>
                            Margin
                        </motion.p>
                        <motion.section className={styles.inputContainer}>
                            <motion.button
                                className={`${styles.button} ${styles.left}`}
                                onClick={() =>
                                    handleMarginSizeChange(
                                        (parseInt(marginSize) - 1).toString()
                                    )
                                }
                            >
                                {minusIcon}
                            </motion.button>
                            <motion.input
                                type="number"
                                className={styles.marginSize}
                                value={marginSize}
                                onClick={(e) =>
                                    (e.target as HTMLInputElement).select()
                                }
                                onChange={(e) =>
                                    handleMarginSizeChange(e.target.value)
                                }
                            />
                            <motion.button
                                className={`${styles.button} ${styles.right}`}
                                onClick={() =>
                                    handleMarginSizeChange(
                                        (parseInt(marginSize) + 1).toString()
                                    )
                                }
                            >
                                {plusIcon}
                            </motion.button>
                        </motion.section>
                    </motion.section>
                </motion.section>
                <motion.section className={styles.section}>
                    <motion.section className={styles.sectionContainer}>
                        <motion.p className={styles.description}>
                            Section Gap
                        </motion.p>
                        <motion.section className={styles.inputContainer}>
                            <motion.button
                                className={`${styles.button} ${styles.left}`}
                                onClick={() =>
                                    handleSectionGapChange(
                                        (parseInt(sectionGap) - 1).toString()
                                    )
                                }
                            >
                                {minusIcon}
                            </motion.button>
                            <motion.input
                                type="number"
                                className={styles.sectionGap}
                                value={sectionGap}
                                onClick={(e) =>
                                    (e.target as HTMLInputElement).select()
                                }
                                onChange={(e) =>
                                    handleSectionGapChange(e.target.value)
                                }
                            />
                            <motion.button
                                className={`${styles.button} ${styles.right}`}
                                onClick={() =>
                                    handleSectionGapChange(
                                        (parseInt(sectionGap) + 1).toString()
                                    )
                                }
                            >
                                {plusIcon}
                            </motion.button>
                        </motion.section>
                    </motion.section>
                </motion.section>
                <motion.div className={styles.sectionTitleContainer}>
                    <motion.div className={styles.horizontalBar}></motion.div>
                    <motion.p className={styles.sectionTitle}>PALETTE</motion.p>
                </motion.div>
                <motion.section className={styles.section}>
                    <motion.section className={styles.colorPickerContainer}>
                        <motion.p className={styles.description}>
                            Accent Color
                        </motion.p>
                        <motion.section
                            className={styles.colorPickerButtonContainer}
                        >
                            {backgroundColorPresets.map((color, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.colorPickerButtonWrapper}
                                >
                                    <motion.div
                                        className={styles.colorPickerButton}
                                        style={{
                                            backgroundColor: color,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            handleAccentColorChange(color);
                                        }}
                                    ></motion.div>
                                </motion.div>
                            ))}
                            <motion.div
                                className={styles.colorPickerButtonWrapper}
                            >
                                <motion.div
                                    className={styles.colorPickerButton}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setShowPicker(!showPicker);
                                        setShowTextColorPicker(false);
                                    }}
                                ></motion.div>
                            </motion.div>
                        </motion.section>
                    </motion.section>
                    <motion.section className={styles.colorPickerContainer}>
                        <motion.p className={styles.description}>
                            Text Accent Color
                        </motion.p>
                        <motion.section
                            className={styles.colorPickerButtonContainer}
                        >
                            {textAccentColorPresets.map((color, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.colorPickerButtonWrapper}
                                >
                                    <motion.div
                                        className={styles.colorPickerButton}
                                        style={{
                                            backgroundColor: color,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            handleAccentTextColorChange(color);
                                        }}
                                    ></motion.div>
                                </motion.div>
                            ))}
                            <motion.div
                                className={styles.colorPickerButtonWrapper}
                            >
                                <motion.div
                                    className={styles.colorPickerButton}
                                    style={{ backgroundColor: accentTextColor }}
                                    onClick={() => {
                                        setShowTextColorPicker(
                                            !showTextColorPicker
                                        );
                                        setShowPicker(false);
                                    }}
                                ></motion.div>
                            </motion.div>
                        </motion.section>
                    </motion.section>
                </motion.section>
                {showPicker && (
                    <motion.div className={styles.pickerContainer}>
                        <HexColorPicker
                            color={color}
                            onChange={(color) => {
                                setColor(color);
                                handleAccentColorChange(color);
                            }}
                        />
                    </motion.div>
                )}
                {showTextColorPicker && (
                    <motion.div className={styles.pickerContainer}>
                        <HexColorPicker
                            color={accentTextColor}
                            onChange={(color) => {
                                setAccentTextColor(color);
                                handleAccentTextColorChange(color);
                            }}
                        />
                    </motion.div>
                )}
            </motion.section>
        </MenuContainer>
    );
};

export default StyleMenu;
