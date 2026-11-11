import styles from "./DashboardWrapper.module.css";

type DashboardWrapperProps = {
    children: React.ReactNode;
};

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    return <div className={styles.container}>{children}</div>;
};

export default DashboardWrapper;
