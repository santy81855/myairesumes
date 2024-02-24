"use client";
import { useAppContext } from "@/app/providers";
import { updateDocumentArray } from "@/lib/document";
import DraggableContainer from "@/components/editor/draggable-section-container/DraggableContainer";
import SectionContainerEditor from "./section-container-editor/SectionContainerEditor";
import { SectionConfig } from "@/lib/sectionConfig";
import { useMemo } from "react";

const SectionComponents = ({
    document,
    font,
    fontSize,
    orderArray,
    margin,
    setOrderArray,
}: {
    document: any;
    font: string;
    fontSize: number;
    orderArray: string[];
    margin?: number;
    setOrderArray?:
        | React.Dispatch<React.SetStateAction<string[]>>
        | React.Dispatch<React.SetStateAction<never[]>>;
}) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const sectionConfig = SectionConfig(document, fontSize, font, margin);

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        if (!setOrderArray) return;
        if (!orderArray) return;
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
        // Update the state with the new orderArray
        setOrderArray(newOrderArray);
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
        return setOrderArray ? (
            <DraggableContainer
                id={`${section}-${index}`}
                key={section + index.toString()}
                orderArray={orderArray}
                moveSection={moveSection}
            >
                {memoizedGetSectionEditor(section)}
            </DraggableContainer>
        ) : (
            getSectionDownload(section)
        );
    });
};

export default SectionComponents;
