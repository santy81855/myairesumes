import styles from "./Sidebar.module.css";
import Menu from "@/components/dashboard/sidebar/menu/Menu";
import MobileMenu from "./mobile/MobileMenu";

const Sidebar = () => {
    return (
        <>
            <section className={styles.bigSidebar}>
                <Menu />
            </section>
            <section className={styles.mobileMenuContainer}>
                <MobileMenu />
            </section>
        </>
    );
};

export default Sidebar;
