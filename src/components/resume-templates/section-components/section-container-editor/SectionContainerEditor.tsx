"use client";
import styles from "./SectionContainerEditor.module.css";
import { useAppContext } from "@/app/providers";
import { trashIcon, editIcon, cancelIcon } from "@/components/icons/iconSVG";
import { useState } from "react";

const SectionContainerEditor = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { documentArray, setDocumentArray, isReordering } = useAppContext();
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div
            className={styles.container}
            style={!isReordering ? { cursor: "auto" } : {}}
        >
            {children}
        </div>
    );
};

export default SectionContainerEditor;
