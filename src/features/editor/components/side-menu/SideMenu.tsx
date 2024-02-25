import styles from "./SideMenu.module.css";
import Menu from "./Menu/Menu";

const SideMenu = async () => {
    return (
        <section className={styles.sideMenu}>
            <Menu />
        </section>
    );
};

export default SideMenu;
