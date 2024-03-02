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
