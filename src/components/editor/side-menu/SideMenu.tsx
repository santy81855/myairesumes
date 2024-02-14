import styles from "./SideMenu.module.css";
import Menu from "@/components/editor/side-menu/Menu/Menu";

const SideMenu = () => {
    return (
        <section className={styles.sideMenu}>
            <Menu />
        </section>
    );
};

export default SideMenu;