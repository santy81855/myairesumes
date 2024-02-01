import styles from "./StaticModal.module.css";

export default function StaticModal({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className={styles.container}>
            <section className={styles.modal}>{children}</section>
        </section>
    );
}
