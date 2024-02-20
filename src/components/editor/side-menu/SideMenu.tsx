import styles from "./SideMenu.module.css";
import Menu from "@/components/editor/side-menu/Menu/Menu";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getResume } from "@/lib/resume";

const SideMenu = async () => {
    return (
        <section className={styles.sideMenu}>
            <Menu />
        </section>
    );
};

export default SideMenu;
