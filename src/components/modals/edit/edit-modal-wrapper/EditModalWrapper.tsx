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
    plusIcon,
    editIcon,
    cancelIcon,
    checkIcon,
} from "@/components/icons/iconSVG";
import { updateDocumentArray } from "@/features/editor";
import { useAppContext } from "@/app/providers";

type SectionProps = {
    document: any;
    sectionId: string;
    onClick?: (event: any) => void;
    isPosition?: boolean;
    isContact?: boolean;
    isSummary?: boolean;
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
        case sectionId.includes("skills"):
            ratio = document.information.sectionEdit.skills.fontRatio;
            break;
        case sectionId.includes("header"):
            ratio = document.information.sectionEdit.header.fontRatio;
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
            case sectionId.includes("skills"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            skills: {
                                ...document.information.sectionEdit.skills,
                                fontRatio:
                                    document.information.sectionEdit.skills
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
            case sectionId.includes("header"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            header: {
                                ...document.information.sectionEdit.header,
                                fontRatio:
                                    document.information.sectionEdit.header
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
        case sectionId.includes("skills"):
            alignment = document.information.sectionEdit.skills.textAlignment;
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
            case sectionId.includes("skills"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            skills: {
                                ...document.information.sectionEdit.skills,
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

const Skills = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [skillInput, setSkillInput] = useState("");
    const [skillArray, setSkillArray] = useState(
        document.information.skillArray
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                skillArray,
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
                    <label htmlFor="skillInput" className={styles.inputLabel}>
                        Skill
                    </label>
                    <section className={styles.inputItemRow}>
                        <input
                            id="skillInput"
                            placeholder="E.g. Adobe Creative Suite"
                            className={styles.textInput}
                            value={skillInput}
                            onChange={(event) =>
                                setSkillInput(event.target.value)
                            }
                        />
                        <button
                            title="Add Skill"
                            className={styles.addButton}
                            onClick={() => {
                                setSkillArray([...skillArray, skillInput]);
                                setSkillInput("");
                            }}
                        >
                            {plusIcon}
                        </button>
                    </section>
                </section>
            </section>
            <section className={styles.columnList}>
                {skillArray.map((skill: any, index: number) => (
                    <section key={index} className={styles.columnListRowItem}>
                        <button
                            title="delete"
                            className={styles.cancelButton}
                            onClick={() => {
                                setSkillArray(
                                    skillArray.filter(
                                        (_: any, i: number) => i !== index
                                    )
                                );
                            }}
                        >
                            {cancelIcon}
                        </button>
                        <button
                            title="edit"
                            className={styles.editButton}
                            onClick={() => {
                                setSkillInput(skill);
                                setSkillArray(
                                    skillArray.filter(
                                        (_: any, i: number) => i !== index
                                    )
                                );
                            }}
                        >
                            {editIcon}
                        </button>
                        <p>{skill}</p>
                    </section>
                ))}
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const SkillsCategory = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [categoryInput, setCategoryInput] = useState("");
    const [skillInput, setSkillInput] = useState("");
    const [skillArray, setSkillArray] = useState(
        document.information.skillCategoryArray
    );
    const [editCategoryIndex, setEditCategoryIndex] = useState(-1);
    const [editSkillId, setEditSkillId] = useState("");
    const [addCategoryClicked, setAddCategoryClicked] = useState(false);
    const [addSkillIndex, setAddSkillIndex] = useState(-1);

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                skillCategoryArray: skillArray,
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
            {addCategoryClicked ? (
                <section className={styles.inputRowContainer}>
                    <section className={styles.inputItemContainer}>
                        <label
                            htmlFor="categoryInput"
                            className={styles.inputLabel}
                        >
                            Skill Category
                        </label>
                        <section className={styles.inputItemRow}>
                            <input
                                id="categoryInput"
                                placeholder="E.g. Technical Skills"
                                className={styles.textInput}
                                value={categoryInput}
                                onChange={(event) =>
                                    setCategoryInput(event.target.value)
                                }
                            />
                            <button
                                title="Add Category"
                                className={styles.addButton}
                                onClick={() => {
                                    const newCategoryArray = [...skillArray];
                                    // add it to the array but at the first index
                                    newCategoryArray.unshift({
                                        category: categoryInput,
                                        skills: [],
                                    });
                                    setSkillArray(newCategoryArray);
                                    setCategoryInput("");
                                    setAddCategoryClicked(false);
                                }}
                            >
                                {plusIcon}
                            </button>
                        </section>
                    </section>
                </section>
            ) : (
                <section className={styles.rowContainer}>
                    <h3 style={{ textDecoration: "underline" }}>
                        Skill Categories
                    </h3>
                    <button
                        title="Add Category"
                        className={styles.addButton}
                        onClick={() => {
                            setAddCategoryClicked(true);
                        }}
                    >
                        {plusIcon}
                    </button>
                </section>
            )}
            <section className={styles.columnList}>
                {skillArray.map((item: any, index: number) => (
                    <>
                        <section
                            key={index}
                            className={styles.columnListRowItem}
                        >
                            <button
                                title="delete category"
                                className={styles.cancelButton}
                                onClick={() => {
                                    setSkillArray(
                                        skillArray.filter(
                                            (_: any, i: number) => i !== index
                                        )
                                    );
                                }}
                            >
                                {cancelIcon}
                            </button>
                            {editCategoryIndex === index ? (
                                <button
                                    title="save"
                                    className={styles.editButton}
                                    onClick={() => {
                                        const newCategoryArray = [
                                            ...skillArray,
                                        ];
                                        newCategoryArray[index].category =
                                            categoryInput;
                                        setCategoryInput("");
                                        setEditCategoryIndex(-1);
                                    }}
                                >
                                    {checkIcon}
                                </button>
                            ) : (
                                <button
                                    title="edit category"
                                    className={styles.editButton}
                                    onClick={() => {
                                        setCategoryInput(item.category);
                                        setEditCategoryIndex(index);
                                    }}
                                >
                                    {editIcon}
                                </button>
                            )}
                            {editCategoryIndex === index ? (
                                <input
                                    type="text"
                                    placeholder="E.g. Adobe Creative Suite"
                                    className={styles.textInput}
                                    value={categoryInput}
                                    onChange={(event) =>
                                        setCategoryInput(event.target.value)
                                    }
                                />
                            ) : (
                                <h3>{item.category}</h3>
                            )}
                        </section>
                        <section className={styles.innerColumnList}>
                            {item.skills.map((skill: any, subIndex: number) => (
                                <section
                                    key={subIndex}
                                    className={styles.columnListRowItem}
                                >
                                    <button
                                        title="delete skill"
                                        className={styles.cancelButton}
                                        onClick={() => {
                                            const newCategoryArray = [
                                                ...skillArray,
                                            ];
                                            newCategoryArray[index].skills =
                                                newCategoryArray[
                                                    index
                                                ].skills.filter(
                                                    (_: any, i: number) =>
                                                        i !== subIndex
                                                );
                                            setSkillArray(newCategoryArray);
                                        }}
                                    >
                                        {cancelIcon}
                                    </button>
                                    {editSkillId ===
                                    index.toString() + subIndex.toString() ? (
                                        <button
                                            title="save"
                                            className={styles.editButton}
                                            onClick={() => {
                                                const newCategoryArray = [
                                                    ...skillArray,
                                                ];
                                                newCategoryArray[index].skills[
                                                    subIndex
                                                ] = skillInput;
                                                setSkillArray(newCategoryArray);
                                                setSkillInput("");
                                                setEditSkillId("");
                                            }}
                                        >
                                            {checkIcon}
                                        </button>
                                    ) : (
                                        <button
                                            title="edit skill"
                                            className={styles.editButton}
                                            onClick={() => {
                                                setEditSkillId(
                                                    index.toString() +
                                                        subIndex.toString()
                                                );
                                                setSkillInput(skill);
                                            }}
                                        >
                                            {editIcon}
                                        </button>
                                    )}
                                    {editSkillId ===
                                    index.toString() + subIndex.toString() ? (
                                        <input
                                            type="text"
                                            className={styles.textInput}
                                            value={skillInput}
                                            onChange={(event) => {
                                                setSkillInput(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    ) : (
                                        <p>{skill}</p>
                                    )}
                                </section>
                            ))}
                            <section className={styles.addSkillButtonContainer}>
                                {addSkillIndex === index ? (
                                    <section className={styles.inputItemRow}>
                                        <input
                                            type="text"
                                            placeholder="E.g. Adobe Creative Suite"
                                            className={styles.textInput}
                                            value={skillInput}
                                            onChange={(event) =>
                                                setSkillInput(
                                                    event.target.value
                                                )
                                            }
                                        />
                                        <button
                                            title="Add Skill"
                                            className={`${styles.addButton} ${styles.addButtonSmall}`}
                                            onClick={() => {
                                                const newCategoryArray = [
                                                    ...skillArray,
                                                ];
                                                newCategoryArray[
                                                    index
                                                ].skills.push(skillInput);
                                                setSkillArray(newCategoryArray);
                                                setSkillInput("");
                                                setAddSkillIndex(-1);
                                            }}
                                        >
                                            {plusIcon}
                                        </button>
                                    </section>
                                ) : (
                                    <button
                                        title="Add Skill"
                                        className={`${styles.addButton} ${styles.addButtonSmall}`}
                                        onClick={() => {
                                            setAddSkillIndex(index);
                                        }}
                                    >
                                        {plusIcon}
                                    </button>
                                )}
                            </section>
                        </section>
                    </>
                ))}
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Header = ({
    document,
    sectionId,
    isPosition,
    isContact,
    isSummary,
}: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [email, setEmail] = useState(document.information.contactInfo.email);
    const [phone, setPhone] = useState(document.information.contactInfo.phone);
    const [website, setWebsite] = useState(
        document.information.contactInfo.website
    );
    const [firstName, setFirstName] = useState(document.information.firstName);
    const [lastName, setLastName] = useState(document.information.lastName);
    const [position, setPosition] = useState(document.information.position);
    const [summary, setSummary] = useState(document.information.summary);
    const [showEmail, setShowEmail] = useState(
        document.information.sectionEdit.contact.showEmail
    );
    const [showPhone, setShowPhone] = useState(
        document.information.sectionEdit.contact.showPhone
    );
    const [showWebsite, setShowWebsite] = useState(
        document.information.sectionEdit.contact.showWebsite
    );
    const [showPosition, setShowPosition] = useState(
        document.information.sectionEdit.header.showPosition
    );
    const [showSummary, setShowSummary] = useState(
        document.information.sectionEdit.header.showSummary
    );
    const [showSocials, setShowSocials] = useState(
        document.information.sectionEdit.header.showSocials
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                contactInfo:
                    isContact === true
                        ? {
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
                                      : document.information.contactInfo
                                            .website,
                          }
                        : document.information.contactInfo,
                sectionEdit: {
                    ...document.information.sectionEdit,
                    contact: {
                        ...document.information.sectionEdit.contact,
                        showEmail,
                        showPhone,
                        showWebsite,
                    },
                    header: {
                        ...document.information.sectionEdit.header,
                        showPosition,
                        showSummary,
                        showSocials,
                    },
                },
                firstName,
                lastName,
                position:
                    isPosition === true
                        ? position
                        : document.information.position,
                summary:
                    isSummary === true ? summary : document.information.summary,
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
                        htmlFor="firstName"
                        className={`${styles.inputLabel}`}
                    >
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
                    <label
                        htmlFor="lastName"
                        className={`${styles.inputLabel}`}
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        className={styles.textInput}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </section>
                {isPosition && (
                    <section className={styles.inputItemContainer}>
                        <section className={styles.toggleContainer}>
                            <label
                                htmlFor="position"
                                className={`${styles.inputLabel} ${
                                    !showPosition && styles.disabled
                                }`}
                            >
                                Position
                            </label>
                            <input
                                type="checkbox"
                                id="positionCheck"
                                className={styles.toggleInput}
                                checked={showPosition}
                                onChange={(event) =>
                                    setShowPosition(event.target.checked)
                                }
                            />
                        </section>
                        <input
                            id="position"
                            className={styles.textInput}
                            value={position}
                            onChange={(event) =>
                                setPosition(event.target.value)
                            }
                        />
                    </section>
                )}
                {isContact && (
                    <>
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
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
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
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
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
                                onChange={(event) =>
                                    setWebsite(event.target.value)
                                }
                            />
                        </section>
                    </>
                )}
                {isSummary && (
                    <section className={styles.inputItemContainer100}>
                        <section className={styles.toggleContainer}>
                            <label
                                htmlFor="summary"
                                className={`${styles.inputLabel} ${
                                    !showSummary && styles.disabled
                                }`}
                            >
                                Summary
                            </label>
                            <input
                                type="checkbox"
                                id="summaryCheck"
                                className={styles.toggleInput}
                                checked={showSummary}
                                onChange={(event) =>
                                    setShowSummary(event.target.checked)
                                }
                            />
                        </section>
                        <textarea
                            id="summary"
                            className={styles.textArea}
                            style={{
                                textAlign: "left",
                            }}
                            value={summary}
                            onChange={(event) => setSummary(event.target.value)}
                        />
                    </section>
                )}
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
        case sectionId.includes("skills"):
            options = Object.keys(document.information.sectionEdit.skills);
            break;
        case sectionId.includes("header"):
            options = Object.keys(document.information.sectionEdit.header);
            break;
        default:
            break;
    }

    return (
        <section className={styles.optionsBar}>
            {options.map((option, index) => {
                switch (option) {
                    case "textAlignment":
                        return (sectionId.includes("bullet") ||
                            sectionId.includes("category")) &&
                            !sectionId.includes("row") ? null : (
                            <section className={styles.optionItem}>
                                <TextAlignmentOption
                                    key={index}
                                    document={document}
                                    sectionId={sectionId}
                                />
                            </section>
                        );
                    case "fontRatio":
                        return (
                            <section className={styles.optionItem}>
                                <FontRatioOption
                                    key={index}
                                    document={document}
                                    sectionId={sectionId}
                                />
                            </section>
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
        case sectionId.includes("skills") && !sectionId.includes("category"):
            section = <Skills document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("skills") && sectionId.includes("category"):
            section = (
                <SkillsCategory document={document} sectionId={sectionId} />
            );
            break;
        case (sectionId.includes("header") &&
            (sectionId.includes("basic") ||
                sectionId.includes("velocity") ||
                sectionId.includes("triumph"))) ||
            sectionId.includes("nexus") ||
            sectionId.includes("impact") ||
            sectionId.includes("fresh") ||
            sectionId.includes("sharp"):
            section = (
                <Header
                    document={document}
                    sectionId={sectionId}
                    isPosition={true}
                    isContact={true}
                />
            );
            break;
        case sectionId.includes("header") &&
            (sectionId.includes("nova") || sectionId.includes("luminary")):
            section = (
                <Header
                    document={document}
                    sectionId={sectionId}
                    isPosition={true}
                />
            );
            break;
        case sectionId.includes("header") && sectionId.includes("vivid"):
            section = (
                <Header
                    document={document}
                    sectionId={sectionId}
                    isSummary={true}
                    isPosition={true}
                />
            );
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
