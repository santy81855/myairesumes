"use client";
import styles from "./DraggableContainer.module.css";
import type { Identifier, XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppContext } from "@/app/providers";

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const ItemTypes = {
    CARD: "card",
};

type DraggableContainerProps = {
    children: React.ReactNode;
    id: string;
    moveSection: (dragIndex: number, hoverIndex: number) => void;
    orderArray: string[];
};

const DraggableContainer = ({
    children,
    id,
    moveSection,
    orderArray,
}: DraggableContainerProps) => {
    const { isReordering } = useAppContext();
    const containerRef = useRef<HTMLDivElement>(null);
    // for adding a draggable element rather than using the whole section
    const itemRef = useRef<HTMLDivElement>(null);
    // the id is structured like this: "section-0" so we need to get the number from it and convert it to a number
    const index = parseInt(id.split("-")[1]);

    //let index = orderArray.indexOf(id);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!containerRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect =
                containerRef.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveSection(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // drag(drop(containerRef));
    // the below line makes it so that you drab by the draggableSection and not the whole container but can still drop on the whole container
    // drag(itemRef);
    drag(isReordering ? containerRef : null);
    drop(isReordering ? containerRef : null);
    return (
        <div
            className={`${styles.sectionContainer} ${
                isReordering && styles.reorderStyle
            }`}
            style={{
                opacity: isDragging ? 0.2 : 1,
                backgroundColor: isDragging
                    ? "rgba(39, 43, 128, 0.4)"
                    : "transparent",
            }}
            ref={containerRef}
            id={id}
            data-handler-id={handlerId}
        >
            {children}
        </div>
    );
};

export default DraggableContainer;
