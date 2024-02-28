import styles from "./DashboardWrapper.module.css";

type DashboardWrapperProps = {
    children: React.ReactNode;
};

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    return <main className={styles.container}>{children}</main>;
};

export default DashboardWrapper;
