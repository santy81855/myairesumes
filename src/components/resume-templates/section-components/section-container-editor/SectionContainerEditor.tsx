"use client";
import styles from "./SectionContainerEditor.module.css";
import { useAppContext } from "@/app/providers";
import { useState } from "react";
import { updateDocumentArray } from "@/features/editor";

const SectionContainerEditor = ({
    children,
    document,
}: {
    children: React.ReactNode;
    document: any;
}) => {
    const { documentArray, setDocumentArray, isReordering } = useAppContext();
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = (e: React.MouseEvent) => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                style: {
                    ...document.information.style,
                    baseFontSize: document.information.style.baseFontSize + 1,
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
        <div
            className={styles.container}
            style={!isReordering ? { cursor: "auto" } : {}}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export default SectionContainerEditor;
