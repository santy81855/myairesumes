"use client";
import styles from "./SectionContainerEditor.module.css";
import { useAppContext } from "@/app/providers";
import { useState } from "react";
import { updateDocumentArray } from "@/features/editor";

const SectionContainerEditor = ({
    children,
    document,
    sectionId,
}: {
    children: React.ReactNode;
    document: any;
    sectionId: string;
}) => {
    const { documentArray, setDocumentArray, isReordering } = useAppContext();
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div
            className={styles.container}
            style={!isReordering ? { cursor: "auto" } : {}}
            title={sectionId}
        >
            {children}
        </div>
    );
};

export default SectionContainerEditor;
