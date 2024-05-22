import styles from "./SideMenu.module.css";
import Menu from "./Menu/Menu";

type SideMenuProps = {
    user: any;
};

const SideMenu = async ({ user }: SideMenuProps) => {
    return (
        <section className={styles.sideMenu}>
            <Menu user={user} />
        </section>
    );
};

export default SideMenu;
