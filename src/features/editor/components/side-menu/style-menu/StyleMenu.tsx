"use client";
import styles from "./StyleMenu.module.css";
import { textIcon } from "@/components/icons/iconSVG";
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
    const [showTextColorPicker, setShowTextColorPicker] =
        useState<boolean>(false);

    const handleFontSizeChange = (size: string) => {
        if (!document) return;
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
        if (!document) return;
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
        console.log(color);
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

    return (
        <MenuContainer>
            <motion.section className={styles.stylesContainer}>
                <motion.section className={styles.titleContainer}>
                    {textIcon}
                    <motion.p className={styles.title}>Text style</motion.p>
                </motion.section>
                <motion.section className={styles.dropdownContainer}>
                    <motion.section className={styles.topRow}>
                        <motion.section className={styles.sectionContainer}>
                            <motion.p className={styles.description}>
                                Font Size
                            </motion.p>
                            <motion.select
                                className={styles.fontSize}
                                onChange={(e) =>
                                    handleFontSizeChange(e.target.value)
                                }
                            >
                                <motion.option disabled selected>
                                    Size
                                </motion.option>
                                {Array.from({ length: 60 }).map((_, index) => (
                                    <motion.option
                                        key={index}
                                        value={(index + 1).toString()}
                                        selected={
                                            document.information.style
                                                .baseFontSize ===
                                            index + 1
                                        }
                                    >
                                        {index + 1}
                                    </motion.option>
                                ))}
                            </motion.select>
                        </motion.section>
                        <motion.section className={styles.sectionContainer}>
                            <motion.p className={styles.description}>
                                Margin
                            </motion.p>
                            <motion.select
                                className={styles.marginSize}
                                onChange={(e) =>
                                    handleMarginSizeChange(e.target.value)
                                }
                            >
                                {Array.from({ length: 60 }).map((_, index) => (
                                    <motion.option
                                        key={index}
                                        value={(index + 1).toString()}
                                        selected={
                                            document.information.style
                                                .baseMarginSize ===
                                            index + 1
                                        }
                                    >
                                        {index + 1}
                                    </motion.option>
                                ))}
                            </motion.select>
                        </motion.section>
                    </motion.section>
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
                            Section Gap
                        </motion.p>
                        <motion.select
                            className={styles.marginSize}
                            onChange={(e) =>
                                handleSectionGapChange(e.target.value)
                            }
                        >
                            {Array.from({ length: 60 }).map((_, index) => (
                                <motion.option
                                    key={index}
                                    value={(index + 1).toString()}
                                    selected={
                                        document.information.style
                                            .baseSectionGap ===
                                        index + 1
                                    }
                                >
                                    {index + 1}
                                </motion.option>
                            ))}
                        </motion.select>
                    </motion.section>
                    <motion.section
                        className={styles.colorPickerOptionsContainer}
                    >
                        <motion.section
                            className={styles.colorPickerButtonContainer}
                        >
                            <motion.p className={styles.description}>
                                Accent Color
                            </motion.p>
                            <motion.div
                                className={styles.colorPickerButton}
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    setShowPicker(!showPicker);
                                    setShowTextColorPicker(false);
                                }}
                            ></motion.div>
                        </motion.section>

                        <motion.section
                            className={styles.colorPickerButtonContainer}
                        >
                            <motion.p className={styles.description}>
                                Text Accent Color
                            </motion.p>
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
            </motion.section>
        </MenuContainer>
    );
};

export default StyleMenu;
