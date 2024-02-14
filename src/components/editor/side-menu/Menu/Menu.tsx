"use client";
import styles from "./Menu.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { signout } from "@/actions/authentication";
import {
    profileIcon,
    accountIcon,
    jobIcon,
    resumeIcon,
    coverLetterIcon,
    logoutIcon,
    magicResumeLogo,
    arrowRightIcon,
    templateIcon,
    styleIcon,
} from "@/components/icons/iconSVG";
import TemplateMenu from "../template-menu/TemplateMenu";

const Menu = () => {
    const [state, setState] = useState(false);
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isStyleOpen, setIsStyleOpen] = useState(false);

    const toggleTemplate = () => {
        setIsTemplateOpen(!isTemplateOpen);
        setIsStyleOpen(false);
    };

    const toggleStyle = () => {
        setIsStyleOpen(!isStyleOpen);
        setIsTemplateOpen(false);
    };

    return (
        <>
            <section className={styles.staticMenu}>
                <section
                    className={styles.staticMenuItem}
                    style={isTemplateOpen ? { backgroundColor: "#303045" } : {}}
                    onClick={() => toggleTemplate()}
                >
                    <div className={styles.staticIconContainer}>
                        {templateIcon}
                    </div>
                    <p className={styles.staticItemName}>Templates</p>
                </section>
                <section
                    className={styles.staticMenuItem}
                    style={isStyleOpen ? { backgroundColor: "#303045" } : {}}
                    onClick={() => toggleStyle()}
                >
                    <div className={styles.staticIconContainer}>
                        {styleIcon}
                    </div>
                    <p className={styles.staticItemName}>Styles</p>
                </section>
            </section>
            <TemplateMenu state={isTemplateOpen} setState={setIsTemplateOpen} />
        </>
    );
};

export default Menu;
