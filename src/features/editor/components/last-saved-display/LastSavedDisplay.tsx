"use client";
import styles from "./LastSavedDisplay.module.css";

type LastSavedDisplayProps = {
    document: any;
};

export const LastSavedDisplay = ({ document }: LastSavedDisplayProps) => {
    const timeAgo = (timestamp: string) => {
        const currentDate = new Date();
        const targetDate = new Date(timestamp);
        const elapsedMs = currentDate.getTime() - targetDate.getTime();

        // Calculate elapsed time in minutes
        const elapsedMinutes = Math.round(elapsedMs / (1000 * 60));

        if (elapsedMinutes < 1) {
            return "just now";
        } else if (elapsedMinutes === 1) {
            return "1 minute ago";
        } else if (elapsedMinutes < 60) {
            return `${elapsedMinutes} minutes ago`;
        } else if (elapsedMinutes < 1440) {
            const hours = Math.floor(elapsedMinutes / 60);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        } else {
            const days = Math.floor(elapsedMinutes / 1440);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Last Saved: {!document ? "..." : timeAgo(document.updatedAt)}
            </div>
        </div>
    );
};

export default LastSavedDisplay;
