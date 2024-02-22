"use client";
import styles from "./ReorderButton.module.css";
import { useAppContext } from "@/app/providers";
import { orderIcon } from "@/components/icons/iconSVG";

const ReorderButton = () => {
    const { isReordering, setIsReordering } = useAppContext();
    return (
        <button
            title="reorder"
            className={styles.container}
            onClick={() => setIsReordering(!isReordering)}
        >
            {orderIcon}
            <p>order</p>
        </button>
    );
};

export default ReorderButton;