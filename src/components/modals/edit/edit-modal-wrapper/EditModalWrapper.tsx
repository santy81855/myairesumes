"use client";
import styles from "./EditModalWrapper.module.css";
import { useState, useEffect } from "react";
import {
    circledXFilledIcon,
    alignLeftIcon,
    alignCenterIcon,
    alignRightIcon,
    fontIncreaseIcon,
    fontDecreaseIcon,
} from "@/components/icons/iconSVG";
import { updateDocumentArray } from "@/features/editor";
import { useAppContext } from "@/app/providers";

type SectionProps = {
    document: any;
    sectionId: string;
    onClick?: (event: any) => void;
};

const FontRatioOption = ({ document, sectionId }: SectionProps) => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();

    sectionId = sectionId.toLowerCase();
    let ratio = 1;

    switch (true) {
        case sectionId.includes("summary"):
            ratio = document.information.sectionEdit.summary.fontRatio;
            break;
        case sectionId.includes("name"):
            ratio = document.information.sectionEdit.name.fontRatio;
            break;
        case sectionId.includes("position"):
            ratio = document.information.sectionEdit.position.fontRatio;
            break;
        case sectionId.includes("contact"):
            ratio = document.information.sectionEdit.contact.fontRatio;
            break;
        default:
            break;
    }

    const changeFontRatio = (change: number) => {
        if (!document) return;
        let updatedDocument = {} as any;
        let newDocumentArray = [] as any;
        sectionId = sectionId.toLowerCase();
        switch (true) {
            case sectionId.includes("summary"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            summary: {
                                ...document.information.sectionEdit.summary,
                                fontRatio:
                                    document.information.sectionEdit.summary
                                        .fontRatio + change,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("name"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            name: {
                                ...document.information.sectionEdit.name,
                                fontRatio:
                                    document.information.sectionEdit.name
                                        .fontRatio + change,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("position"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            position: {
                                ...document.information.sectionEdit.position,
                                fontRatio:
                                    document.information.sectionEdit.position
                                        .fontRatio + change,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("contact"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            contact: {
                                ...document.information.sectionEdit.contact,
                                fontRatio:
                                    document.information.sectionEdit.contact
                                        .fontRatio + change,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            default:
                break;
        }
        setDocumentArray(newDocumentArray);
    };

    return (
        <section className={styles.optionContainer}>
            <p className={styles.optionLabel}>Scale Text</p>
            <button
                className={`${styles.option} ${styles.decreaseOption}`}
                onClick={() => {
                    changeFontRatio(-0.1);
                }}
            >
                {fontDecreaseIcon}
            </button>
            <p className={styles.optionLabel}>{ratio.toFixed(1)}</p>
            <button
                className={`${styles.option} ${styles.increaseOption}`}
                onClick={() => {
                    changeFontRatio(0.1);
                }}
            >
                {fontIncreaseIcon}
            </button>
        </section>
    );
};

const TextAlignmentOption = ({ document, sectionId }: SectionProps) => {
    const {
        documentArray,
        setDocumentArray,
        showComponentModal,
        setShowComponentModal,
    } = useAppContext();

    sectionId = sectionId.toLowerCase();
    let alignment = "";

    switch (true) {
        case sectionId.includes("summary"):
            alignment = document.information.sectionEdit.summary.textAlignment;
            break;
        case sectionId.includes("name"):
            alignment = document.information.sectionEdit.name.textAlignment;
            break;
        case sectionId.includes("position"):
            alignment = document.information.sectionEdit.position.textAlignment;
            break;
        case sectionId.includes("contact"):
            alignment = document.information.sectionEdit.contact.textAlignment;
            break;
        default:
            break;
    }

    const changeTextAlign = (alignment: string) => {
        if (!document) return;
        let updatedDocument = {} as any;
        let newDocumentArray = [] as any;
        switch (true) {
            case sectionId.includes("summary"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            summary: {
                                ...document.information.sectionEdit.summary,
                                textAlignment: alignment,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("name"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            name: {
                                ...document.information.sectionEdit.name,
                                textAlignment: alignment,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("position"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            position: {
                                ...document.information.sectionEdit.position,
                                textAlignment: alignment,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            case sectionId.includes("contact"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            contact: {
                                ...document.information.sectionEdit.contact,
                                textAlignment: alignment,
                            },
                        },
                    },
                };
                newDocumentArray = updateDocumentArray(
                    updatedDocument,
                    documentArray
                );
                break;
            default:
                break;
        }
        setDocumentArray(newDocumentArray);
    };

    return (
        <section className={styles.optionContainer}>
            <p className={styles.optionLabel}>Text Align</p>
            <button
                className={`${styles.option} ${
                    alignment === "left" && styles.selected
                }`}
                onClick={() => {
                    changeTextAlign("left");
                }}
            >
                {alignLeftIcon}
            </button>
            <button
                className={`${styles.option} ${
                    alignment === "center" && styles.selected
                }`}
                onClick={() => {
                    changeTextAlign("center");
                }}
            >
                {alignCenterIcon}
            </button>
            <button
                className={`${styles.option} ${
                    alignment === "right" && styles.selected
                }`}
                onClick={() => {
                    changeTextAlign("right");
                }}
            >
                {alignRightIcon}
            </button>
        </section>
    );
};

const Position = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [position, setPosition] = useState(document.information.position);

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                position,
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    return (
        <>
            <section className={styles.inputRowContainer}>
                <section className={styles.inputItemContainer}>
                    <label htmlFor="position" className={styles.inputLabel}>
                        Position
                    </label>
                    <input
                        id="position"
                        className={styles.textInput}
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                    />
                </section>
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Name = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [firstName, setFirstName] = useState(document.information.firstName);
    const [lastName, setLastName] = useState(document.information.lastName);

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                firstName,
                lastName,
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    return (
        <>
            <section className={styles.inputRowContainer}>
                <section className={styles.inputItemContainer}>
                    <label htmlFor="firstName" className={styles.inputLabel}>
                        First Name
                    </label>
                    <input
                        id="firstName"
                        className={styles.textInput}
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <label htmlFor="lastName" className={styles.inputLabel}>
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        className={styles.textInput}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </section>
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Summary = ({ sectionId, document }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [summaryText, setSummaryText] = useState(
        document.information.summary
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                summary: summaryText,
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    return (
        <>
            <textarea
                className={styles.textArea}
                style={{
                    textAlign:
                        document.information.sectionEdit.summary.textAlignment,
                }}
                value={summaryText}
                onChange={(event) => setSummaryText(event.target.value)}
            />
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Contact = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [email, setEmail] = useState(document.information.contactInfo.email);
    const [phone, setPhone] = useState(document.information.contactInfo.phone);
    const [website, setWebsite] = useState(
        document.information.contactInfo.website
    );
    const [showEmail, setShowEmail] = useState(
        document.information.sectionEdit.contact.showEmail
    );
    const [showPhone, setShowPhone] = useState(
        document.information.sectionEdit.contact.showPhone
    );
    const [showWebsite, setShowWebsite] = useState(
        document.information.sectionEdit.contact.showWebsite
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                contactInfo: {
                    email:
                        showEmail === true
                            ? email
                            : document.information.contactInfo.email,
                    phone:
                        showPhone === true
                            ? phone
                            : document.information.contactInfo.phone,
                    website:
                        showWebsite === true
                            ? website
                            : document.information.contactInfo.website,
                    sectionEdit: {
                        ...document.information.sectionEdit,
                        contact: {
                            ...document.information.sectionEdit.contact,
                            showEmail,
                            showPhone,
                            showWebsite,
                        },
                    },
                },
                sectionEdit: {
                    ...document.information.sectionEdit,
                    contact: {
                        ...document.information.sectionEdit.contact,
                        showEmail,
                        showPhone,
                        showWebsite,
                    },
                },
            },
        };
        const newDocumentArray = updateDocumentArray(
            updatedDocument,
            documentArray
        );
        setDocumentArray(newDocumentArray);
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    return (
        <>
            <section className={styles.inputRowContainer}>
                <section className={styles.inputItemContainer}>
                    <label
                        htmlFor="email"
                        className={`${styles.inputLabel} ${
                            !showEmail && styles.disabled
                        }`}
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        disabled={!showEmail}
                        className={styles.textInput}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="phone"
                            className={`${styles.inputLabel} ${
                                !showPhone && styles.disabled
                            }`}
                        >
                            Phone
                        </label>
                        <input
                            type="checkbox"
                            id="phone"
                            className={styles.toggleInput}
                            checked={showPhone}
                            onChange={(event) =>
                                setShowPhone(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="phone"
                        disabled={!showPhone}
                        className={styles.textInput}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="website"
                            className={`${styles.inputLabel} ${
                                !showWebsite && styles.disabled
                            }`}
                        >
                            Website
                        </label>
                        <input
                            type="checkbox"
                            id="website"
                            className={styles.toggleInput}
                            checked={showWebsite}
                            onChange={(event) =>
                                setShowWebsite(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="website"
                        disabled={!showWebsite}
                        className={styles.textInput}
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                    />
                </section>
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const TitleBar = ({ sectionId }: { sectionId: string }) => {
    let title = "";
    sectionId = sectionId.toLowerCase();
    switch (true) {
        case sectionId.includes("header"):
            title = "Edit Header";
            break;
        case sectionId.includes("summary"):
            title = "Edit Summary";
            break;
        case sectionId.includes("name"):
            title = "Edit Name";
            break;
        case sectionId.includes("position"):
            title = "Edit Position";
            break;
        case sectionId.includes("experience"):
            title = "Edit Experience";
            break;
        case sectionId.includes("education"): // && sectionId.includes("detailed"):
            title = "Edit Education";
            break;
        case sectionId.includes("skills"): // && sectionId.includes("category");
            title = "Edit Skills";
            break;
        case sectionId.includes("languages"):
            title = "Edit Languages";
            break;
        case sectionId.includes("interests"):
            title = "Edit Interests";
            break;
        case sectionId.includes("projects"):
            title = "Edit Projects";
            break;
        case sectionId.includes("contact"):
            title = "Edit Contact";
            break;
        default:
            break;
    }

    const closeClicked = (event: any) => {
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    return (
        <section className={styles.titleContainer}>
            <h1 className={styles.sectionTitle}>{title}</h1>
            <button className={styles.closeButton} onClick={closeClicked}>
                {circledXFilledIcon}
            </button>
        </section>
    );
};

const OptionsBar = ({ sectionId, document }: SectionProps) => {
    let options = [] as any[];
    sectionId = sectionId.toLowerCase();

    switch (true) {
        case sectionId.includes("summary"):
            options = Object.keys(document.information.sectionEdit.summary);
            break;
        case sectionId.includes("name"):
            options = Object.keys(document.information.sectionEdit.name);
            break;
        case sectionId.includes("position"):
            options = Object.keys(document.information.sectionEdit.position);
            break;
        case sectionId.includes("contact"):
            options = Object.keys(document.information.sectionEdit.contact);
            break;
        default:
            break;
    }

    return (
        <section className={styles.optionsBar}>
            {options.map((option, index) => {
                switch (option) {
                    case "textAlignment":
                        return (
                            <TextAlignmentOption
                                key={index}
                                document={document}
                                sectionId={sectionId}
                            />
                        );
                    case "fontRatio":
                        return (
                            <FontRatioOption
                                key={index}
                                document={document}
                                sectionId={sectionId}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </section>
    );
};

const SaveButton = ({ sectionId, document, onClick }: SectionProps) => {
    return (
        <section className={styles.saveButtonContainer}>
            <button className={styles.saveButton} onClick={onClick}>
                Save
            </button>
        </section>
    );
};

export default function EditModalWrapper({
    document,
    sectionId,
}: {
    document: any;
    sectionId: string;
}) {
    const closeClicked = (event: any) => {
        if (event.target.id !== "modalContainer") return;
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    let section = <></>;
    sectionId = sectionId.toLowerCase();
    switch (true) {
        case sectionId.includes("summary"):
            section = <Summary document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("name"):
            section = <Name document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("position"):
            section = <Position document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("contact"):
            section = <Contact document={document} sectionId={sectionId} />;
            break;
        default:
            break;
    }

    return (
        <section
            id="modalContainer"
            className={styles.container}
            onClick={closeClicked}
        >
            <section id="modalContent" className={styles.modal}>
                <TitleBar sectionId={sectionId} />
                <OptionsBar sectionId={sectionId} document={document} />
                <section className={styles.sectionContainer}>{section}</section>
            </section>
        </section>
    );
}
