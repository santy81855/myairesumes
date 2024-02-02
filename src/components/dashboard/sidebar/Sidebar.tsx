import styles from "./Sidebar.module.css";
import Menu from "@/components/dashboard/sidebar/menu/Menu";

const Sidebar = () => {
    return (
        <section className={styles.container}>
            <Menu />
        </section>
    );
};

export default Sidebar;
