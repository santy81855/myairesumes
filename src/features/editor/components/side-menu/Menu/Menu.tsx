"use client";
import styles from "./Menu.module.css";
import { useState, useEffect } from "react";
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
import { useAppContext } from "@/app/providers";
import { useParams } from "next/navigation";

const Menu = () => {
    const { documentArray, setDocumentArray } = useAppContext();
    const params = useParams();
    const id = params.slug[1];
    const [document, setDocument] = useState<any>(null);
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isStyleOpen, setIsStyleOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    useEffect(() => {
        setDocument(documentArray.find((document) => document.id === id));
    }, [documentArray]);

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
            {document && (
                <>
                    <ExpandedMenu
                        state={isTemplateOpen}
                        setState={setIsTemplateOpen}
                    >
                        <TemplateMenu document={document} />
                    </ExpandedMenu>
                    <ExpandedMenu
                        state={isSectionOpen}
                        setState={setIsSectionOpen}
                    >
                        <SectionMenu document={document} />
                    </ExpandedMenu>
                    <ExpandedMenu state={isStyleOpen} setState={setIsStyleOpen}>
                        <StyleMenu document={document} />
                    </ExpandedMenu>
                </>
            )}
        </>
    );
};

export default Menu;
