"use client";
import styles from "./Menu.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    templateIcon,
    styleIcon,
    sectionIcon,
    backIcon,
} from "@/components/icons/iconSVG";
import ExpandedMenu from "../expanded-menu/ExpandedMenu";
import TemplateMenu from "../template-menu/TemplateMenu";
import StyleMenu from "../style-menu/StyleMenu";
import SectionMenu from "../section-menu/SectionMenu";
import { useAppContext } from "@/app/providers";
import { useParams, useRouter } from "next/navigation";

const Menu = () => {
    const { documentArray, setDocumentArray } = useAppContext();
    const params = useParams();
    const router = useRouter();
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
        // get the search bar to focus if we are opening teh template
        // const searchBar = window.document.getElementById("templateSeachBar");
        // if (searchBar && !isTemplateOpen) {
        //     searchBar.focus();
        // }
    };

    const backPressed = () => {
        router.push("/dashboard?menu=jobs&documentPage=1");
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
                    title="sections"
                    style={
                        isSectionOpen
                            ? {
                                  backgroundColor:
                                      "rgb(var(--editor-side-menu-background-rgb))",
                              }
                            : {}
                    }
                    onClick={() => toggleSection()}
                >
                    <div className={styles.staticIconContainer}>
                        {sectionIcon}
                    </div>
                    <p className={styles.staticItemName}>Sections</p>
                </section>
                <section
                    className={styles.staticMenuItem}
                    title="templates"
                    style={
                        isTemplateOpen
                            ? {
                                  backgroundColor:
                                      "rgb(var(--editor-side-menu-background-rgb))",
                              }
                            : {}
                    }
                    onClick={() => toggleTemplate()}
                >
                    <div className={styles.staticIconContainer}>
                        {templateIcon}
                    </div>
                    <p className={styles.staticItemName}>Templates</p>
                </section>
                <section
                    className={styles.staticMenuItem}
                    title="styles"
                    style={
                        isStyleOpen
                            ? {
                                  backgroundColor:
                                      "rgb(var(--editor-side-menu-background-rgb))",
                              }
                            : {}
                    }
                    onClick={() => toggleStyle()}
                >
                    <div className={styles.staticIconContainer}>
                        {styleIcon}
                    </div>
                    <p className={styles.staticItemName}>Styles</p>
                </section>
                <section
                    className={`${styles.staticMenuItem} ${styles.backButton}`}
                    title="Back to dashboard"
                    onClick={() => backPressed()}
                >
                    <div className={styles.staticIconContainer}>{backIcon}</div>
                    <p className={styles.staticItemName}>Back</p>
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
