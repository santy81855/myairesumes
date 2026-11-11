import type { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
    title: "My Resume Hero — Editor",
    description: "Create and refine your resume and cover letter.",
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
    return <div className={styles.workspace}>{children}</div>;
}
