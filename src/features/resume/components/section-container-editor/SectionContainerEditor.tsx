"use client";
import styles from "./SectionContainerEditor.module.css";
import { useAppContext } from "@/app/providers";
import { useState } from "react";
import { updateDocumentArray } from "@/features/editor";
import { useRouter } from "next/navigation";

const SectionContainerEditor = ({
    children,
    document,
    sectionId,
}: {
    children: React.ReactNode;
    document: any;
    sectionId: string;
}) => {
    const router = useRouter();
    const { documentArray, setDocumentArray, isReordering } = useAppContext();

    const sectionClicked = () => {
        // Get the current URL
        let url = new URL(window.location.href);

        // Add query parameter
        url.searchParams.set("edit", sectionId);

        // Replace the current URL without rerouting
        window.history.replaceState(null, "", url.toString());
    };

    return (
        <div
            className={styles.container}
            style={!isReordering ? { cursor: "auto" } : {}}
            title={sectionId}
            onClick={sectionClicked}
        >
            {children}
        </div>
    );
};

export default SectionContainerEditor;
