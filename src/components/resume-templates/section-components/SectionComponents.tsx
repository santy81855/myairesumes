"use client";
import { useAppContext } from "@/app/providers";
import {
    DraggableContainer,
    updateDocumentArray,
    SectionConfig,
} from "@/features/editor";
import SectionContainerEditor from "./section-container-editor/SectionContainerEditor";
import { useMemo } from "react";

const SectionComponents = ({
    document,
    font,
    fontSize,
    orderArray,
    margin,
    isDownload,
}: {
    document: any;
    font: string;
    fontSize: number;
    orderArray: string[];
    margin?: number;
    isDownload?: boolean;
}) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const sectionConfig = SectionConfig(
        document,
        fontSize,
        font,
        document.information.template
    );

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        if (!orderArray) return;
        if (isDownload) return;
        // Create a copy of the orderArray
        const newOrderArray = [...orderArray];

        // Get the dragged item
        const draggedItem = newOrderArray[dragIndex];

        // Remove the dragged item from its original position
        newOrderArray.splice(dragIndex, 1);

        // Insert the dragged item at the new position
        newOrderArray.splice(hoverIndex, 0, draggedItem);
        // update the orderArray in the document
        const updatedDocument = { ...document };
        updatedDocument.information.sectionOrder[
            updatedDocument.currentPage - 1
        ] = newOrderArray;
        // update the documentArray
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
    };

    const getSectionEditor = (id: string) => {
        return sectionConfig.hasOwnProperty(id) ? (
            <SectionContainerEditor key={id} document={document}>
                {sectionConfig[id as keyof typeof sectionConfig]?.component ??
                    null}
            </SectionContainerEditor>
        ) : null;
    };

    const memoizedGetSectionEditor = useMemo(
        () => getSectionEditor,
        [sectionConfig]
    );

    const getSectionDownload = (id: string) => {
        return (
            sectionConfig[id as keyof typeof sectionConfig]?.component ?? null
        );
    };

    return orderArray.map((section: string, index: number) => {
        return !isDownload ? (
            <DraggableContainer
                id={`${section}-${index}`}
                key={section + index.toString()}
                orderArray={orderArray}
                document={document}
            >
                {memoizedGetSectionEditor(section)}
            </DraggableContainer>
        ) : (
            getSectionDownload(section)
        );
    });
};

export default SectionComponents;
