"use client";
import styles from "./Menu.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    templateIcon,
    styleIcon,
    sectionIcon,
} from "@/components/icons/iconSVG";
import ExpandedMenu from "../expanded-menu/ExpandedMenu";
import TemplateMenu from "../template-menu/TemplateMenu";
import StyleMenu from "../style-menu/StyleMenu";
import SectionMenu from "../section-menu/SectionMenu";

const Menu = () => {
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isStyleOpen, setIsStyleOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    const toggleTemplate = () => {
        setIsTemplateOpen(!isTemplateOpen);
        setIsStyleOpen(false);
        setIsSectionOpen(false);
    };

    const toggleStyle = () => {
        setIsStyleOpen(!isStyleOpen);
        setIsTemplateOpen(false);
        setIsSectionOpen(false);
    };

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
        setIsTemplateOpen(false);
        setIsStyleOpen(false);
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
                    style={isSectionOpen ? { backgroundColor: "#303045" } : {}}
                    onClick={() => toggleSection()}
                >
                    <div className={styles.staticIconContainer}>
                        {sectionIcon}
                    </div>
                    <p className={styles.staticItemName}>Sections</p>
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
            <ExpandedMenu state={isTemplateOpen} setState={setIsTemplateOpen}>
                <TemplateMenu />
            </ExpandedMenu>
            <ExpandedMenu state={isSectionOpen} setState={setIsSectionOpen}>
                <SectionMenu />
            </ExpandedMenu>
            <ExpandedMenu state={isStyleOpen} setState={setIsStyleOpen}>
                <StyleMenu />
            </ExpandedMenu>
        </>
    );
};

export default Menu;
