"use client";
import styles from "./SectionContainerEditor.module.css";
import { useAppContext } from "@/app/providers";
import { trashIcon, editIcon, cancelIcon } from "@/components/icons/iconSVG";
import { useState } from "react";
import { updateDocumentArray } from "@/lib/document";

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
        console.log("clicked");
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
        console.log(updatedDocument);
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
