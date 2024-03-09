"use client";
import styles from "./EditModalWrapper.module.css";
import { useState, useEffect, useCallback } from "react";
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
    brainIcon,
    magicIcon,
} from "@/components/icons/iconSVG";
import { updateDocumentArray, getResume, getPrompt } from "@/features/editor";
import { useAppContext } from "@/app/providers";
import { formatDateMonYear, formatDateMonthYear } from "@/lib/date";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SectionProps = {
    document: any;
    sectionId: string;
    onClick?: (event: any) => void;
    isPosition?: boolean;
    isContact?: boolean;
    isSummary?: boolean;
};

type LoadingProps = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
};

type AIButtonsProps = {
    promptId: string;
    document: any;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    text: string;
    setText?: (
        text: string | ((prev: string) => string) | ((prev: string) => void)
    ) => void;
    length: number;
    positionTitle: string;
    bulletPointList?: string[];
    setBulletPointList?: any;
    array: string[];
    bulletIndex?: number;
};

interface ListSectionProps {
    document: any;
    sectionId: string;
    sectionName: string;
    arrayName: string;
    singularName: string;
    isLoading?: boolean;
    setIsLoading?: (isLoading: boolean) => void;
}

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
        case sectionId.includes("languages"):
            ratio = document.information.sectionEdit.languages.fontRatio;
            break;
        case sectionId.includes("interests"):
            ratio = document.information.sectionEdit.interests.fontRatio;
            break;
        case sectionId.includes("header"):
            ratio = document.information.sectionEdit.header.fontRatio;
            break;
        case sectionId.includes("experience"):
            ratio = document.information.sectionEdit.experience.fontRatio;
            break;
        case sectionId.includes("education"):
            ratio = document.information.sectionEdit.education.fontRatio;
            break;
        case sectionId.includes("projects"):
            ratio = document.information.sectionEdit.projects.fontRatio;
            break;
        case sectionId.includes("salutation"):
            ratio = document.information.sectionEdit.salutation.fontRatio;
            break;
        case sectionId.includes("body"):
            ratio = document.information.sectionEdit.body.fontRatio;
            break;
        case sectionId.includes("closing"):
            ratio = document.information.sectionEdit.closing.fontRatio;
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
            case sectionId.includes("languages"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            languages: {
                                ...document.information.sectionEdit.languages,
                                fontRatio:
                                    document.information.sectionEdit.languages
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
            case sectionId.includes("interests"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            interests: {
                                ...document.information.sectionEdit.interests,
                                fontRatio:
                                    document.information.sectionEdit.interests
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
            case sectionId.includes("experience"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            experience: {
                                ...document.information.sectionEdit.experience,
                                fontRatio:
                                    document.information.sectionEdit.experience
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
            case sectionId.includes("education"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            education: {
                                ...document.information.sectionEdit.education,
                                fontRatio:
                                    document.information.sectionEdit.education
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
            case sectionId.includes("projects"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            projects: {
                                ...document.information.sectionEdit.projects,
                                fontRatio:
                                    document.information.sectionEdit.projects
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
            case sectionId.includes("salutation"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            salutation: {
                                ...document.information.sectionEdit.salutation,
                                fontRatio:
                                    document.information.sectionEdit.salutation
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
            case sectionId.includes("body"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            body: {
                                ...document.information.sectionEdit.body,
                                fontRatio:
                                    document.information.sectionEdit.body
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
            case sectionId.includes("closing"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            closing: {
                                ...document.information.sectionEdit.closing,
                                fontRatio:
                                    document.information.sectionEdit.closing
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
                title="scale text down"
            >
                {fontDecreaseIcon}
            </button>
            <p className={styles.optionLabelPermanent}>{ratio.toFixed(1)}</p>
            <button
                className={`${styles.option} ${styles.increaseOption}`}
                onClick={() => {
                    changeFontRatio(0.1);
                }}
                title="scale text up"
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
        case sectionId.includes("languages"):
            alignment =
                document.information.sectionEdit.languages.textAlignment;
            break;
        case sectionId.includes("interests"):
            alignment =
                document.information.sectionEdit.interests.textAlignment;
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
            case sectionId.includes("languages"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            languages: {
                                ...document.information.sectionEdit.languages,
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
            case sectionId.includes("interests"):
                updatedDocument = {
                    ...document,
                    information: {
                        ...document.information,
                        sectionEdit: {
                            ...document.information.sectionEdit,
                            interests: {
                                ...document.information.sectionEdit.interests,
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
                title="align left"
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
                title="align center"
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
                title="align right"
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

const AIButtons = ({
    promptId,
    document,
    isLoading,
    setIsLoading,
    text,
    setText,
    length,
    positionTitle,
    bulletPointList,
    setBulletPointList,
    bulletIndex,
    array,
}: AIButtonsProps) => {
    const handleGenerate = async (e: any) => {
        e.preventDefault();
        const initialText = text;
        if (!setText) {
            const updatedBulletPoints = [...(bulletPointList as string[])];
            updatedBulletPoints[bulletIndex as number] = "";
            setBulletPointList(updatedBulletPoints);
        } else if (setText) {
            setText("");
        }
        let data = {
            promptId,
            document,
            generate: true,
            enhance: false,
            length: length,
            currentText: initialText,
            positionTitle,
            array,
        };
        const prompt = getPrompt(data);
        console.log(prompt);
        setIsLoading(true);
        try {
            const response = await fetch("/api/completion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            if (!response.ok) {
                toast.error(
                    "An error occurred while generating a response. Please try again."
                );
            }
            setIsLoading(false);
            const reader = response.body?.getReader();
            while (true) {
                const { done, value } =
                    (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;
                if (done) break;
                let stringChunk = new TextDecoder().decode(value);
                if (!setText) {
                    setBulletPointList((prev: string[]) => {
                        const updatedBulletPoints = [...prev];
                        updatedBulletPoints[bulletIndex as number] =
                            updatedBulletPoints[bulletIndex as number] +
                            stringChunk;
                        return updatedBulletPoints;
                    });
                } else if (setText) {
                    setText((prev) => prev + stringChunk);
                }
            }
        } catch (error) {
            setIsLoading(false);
            if (!setText) {
                setBulletPointList((prev: string[]) => {
                    prev[bulletIndex as number] = initialText;
                });
            } else if (setText) {
                setText(initialText);
            }
            toast.error(
                "An error occurred while generating a response. Please try again."
            );
        }
    };

    const handleEnhance = async (e: any) => {
        e.preventDefault();
        const initialText = text;
        if (!setText) {
            setBulletPointList((prev: string[]) => {
                const updatedBulletPoints = [...prev];
                updatedBulletPoints[bulletIndex as number] = "";
                return updatedBulletPoints;
            });
        } else if (setText) {
            setText("");
        }
        let data = {
            promptId,
            document,
            generate: false,
            enhance: true,
            length: length,
            currentText: initialText,
            positionTitle,
            array,
        };
        const prompt = getPrompt(data);
        setIsLoading(true);
        try {
            const response = await fetch("/api/completion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            if (!response.ok) {
                toast.error(
                    "An error occurred while enhancing a response. Please try again."
                );
            }
            setIsLoading(false);
            const reader = response.body?.getReader();
            while (true) {
                const { done, value } =
                    (await reader?.read()) as ReadableStreamReadResult<Uint8Array>;
                if (done) break;
                let stringChunk = new TextDecoder().decode(value);
                if (!setText) {
                    setBulletPointList((prev: string[]) => {
                        const updatedBulletPoints = [...prev];
                        updatedBulletPoints[bulletIndex as number] =
                            updatedBulletPoints[bulletIndex as number] +
                            stringChunk;
                        return updatedBulletPoints;
                    });
                } else if (setText) {
                    setText((prev) => prev + stringChunk);
                }
            }
        } catch (error) {
            setIsLoading(false);
            if (!setText) {
                setBulletPointList((prev: string[]) => {
                    const updatedBulletPoints = [...prev];
                    updatedBulletPoints[bulletIndex as number] = initialText;
                    return updatedBulletPoints;
                });
            } else if (setText) {
                setText(initialText);
            }
            toast.error(
                "An error occurred while generating a response. Please try again."
            );
        }
    };

    return (
        <form className={styles.aiButtonContainer} onSubmit={handleGenerate}>
            <button
                title="Enhance with AI"
                className={`${styles.aiButton} ${styles.enhance}`}
                onClick={handleEnhance}
                disabled={isLoading}
            >
                {magicIcon}
                enhance
            </button>
            <button
                title="Generate with AI"
                className={`${styles.aiButton} ${styles.generate}`}
                type="submit"
                onSubmit={handleGenerate}
                disabled={isLoading}
            >
                {brainIcon}
                generate
            </button>
        </form>
    );
};

const Summary = ({
    sectionId,
    document,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
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
            <section className={styles.inputItemContainer100}>
                <label htmlFor="summary" className={styles.inputLabel}>
                    Summary
                </label>
                <AIButtons
                    promptId="summary"
                    document={document}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    text={summaryText}
                    setText={setSummaryText}
                    length={50}
                    positionTitle=""
                    array={[]}
                />
                <textarea
                    id="summary"
                    className={styles.textArea}
                    style={{
                        textAlign:
                            document.information.sectionEdit.summary
                                .textAlignment,
                    }}
                    value={summaryText}
                    onChange={(event) => setSummaryText(event.target.value)}
                />
            </section>
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

const GenericSection = ({
    document,
    sectionId,
    sectionName,
    arrayName,
    singularName,
    isLoading,
    setIsLoading,
}: ListSectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [inputValue, setInputValue] = useState("");
    const [itemArray, setItemArray] = useState(document.information[arrayName]);
    const [isAddItem, setIsAddItem] = useState(false);
    const [editItemId, setEditItemId] = useState(-1);

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                [arrayName]: itemArray,
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
            {isAddItem ? (
                <section className={styles.inputRowContainer}>
                    <section className={styles.inputItemContainer}>
                        <label
                            htmlFor="itemInput"
                            className={styles.inputLabel}
                        >
                            Add {singularName}
                        </label>
                        <section className={styles.aiInputItem}>
                            {setIsLoading &&
                                isLoading !== null &&
                                isLoading !== undefined && (
                                    <section
                                        className={styles.cardButtonContainer}
                                    >
                                        <AIButtons
                                            promptId={"skills"}
                                            document={document}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            text={inputValue}
                                            setText={setInputValue as any}
                                            length={15}
                                            positionTitle=""
                                            array={itemArray}
                                        />
                                    </section>
                                )}
                            <textarea
                                id="itemInput"
                                placeholder={`E.g. ${sectionName}`}
                                className={styles.closingTextArea}
                                value={inputValue}
                                onChange={(event) =>
                                    setInputValue(event.target.value)
                                }
                            />
                            <section className={styles.cardButtonContainer}>
                                <button
                                    title="Cancel"
                                    className={styles.cancelEditButton}
                                    onClick={() => {
                                        setInputValue("");
                                        setIsAddItem(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    title={`Add ${sectionName}`}
                                    className={styles.saveEditButton}
                                    onClick={() => {
                                        setItemArray([
                                            ...itemArray,
                                            inputValue,
                                        ]);
                                        setInputValue("");
                                    }}
                                >
                                    Add
                                </button>
                            </section>
                        </section>
                    </section>
                </section>
            ) : (
                <section className={styles.rowContainer}>
                    <h3>{sectionName}</h3>
                    <button
                        title={`Add ${sectionName}`}
                        className={styles.addButton}
                        onClick={() => {
                            setIsAddItem(true);
                            setInputValue("");
                            setEditItemId(-1);
                        }}
                    >
                        {plusIcon}
                    </button>
                </section>
            )}
            <section className={styles.skillCategoryCardContainer}>
                {itemArray.map((item: any, index: number) =>
                    editItemId === index ? (
                        <section key={index} className={styles.aiInputItem}>
                            <section className={styles.aiButtonRow}>
                                <label htmlFor="itemInput">
                                    Edit {singularName}
                                </label>
                                {setIsLoading &&
                                    isLoading !== null &&
                                    isLoading !== undefined && (
                                        <AIButtons
                                            promptId={"skills"}
                                            document={document}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            text={inputValue}
                                            setText={setInputValue as any}
                                            length={15}
                                            positionTitle=""
                                            array={itemArray}
                                        />
                                    )}
                            </section>
                            <textarea
                                id="itemInput"
                                placeholder={`E.g. ${sectionName}`}
                                className={styles.closingTextArea}
                                value={inputValue}
                                onChange={(event) =>
                                    setInputValue(event.target.value)
                                }
                            />
                            <section className={styles.cardButtonContainer}>
                                <button
                                    title="Cancel"
                                    className={styles.cancelEditButton}
                                    onClick={() => {
                                        setInputValue("");
                                        setEditItemId(-1);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    title={`Update ${sectionName}`}
                                    className={styles.saveEditButton}
                                    onClick={() => {
                                        let newItemArray = [...itemArray];
                                        newItemArray[index] = inputValue;
                                        setItemArray(newItemArray);
                                        setInputValue("");
                                        setEditItemId(-1);
                                    }}
                                >
                                    Update
                                </button>
                            </section>
                        </section>
                    ) : (
                        <section key={index} className={styles.card}>
                            <section className={styles.cardButtonContainer}>
                                <button
                                    title="delete"
                                    className={styles.cardDeleteButton}
                                    onClick={() => {
                                        setItemArray(
                                            itemArray.filter(
                                                (_: any, i: number) =>
                                                    i !== index
                                            )
                                        );
                                    }}
                                >
                                    {cancelIcon}
                                    <p className={styles.smallText}>Delete</p>
                                </button>
                                <button
                                    title="edit"
                                    className={styles.cardEditButton}
                                    onClick={() => {
                                        setIsAddItem(false);
                                        setInputValue(item);
                                        setEditItemId(index);
                                    }}
                                >
                                    {editIcon}
                                    <p className={styles.smallText}>Edit</p>
                                </button>
                            </section>
                            <section className={styles.skillCategoryCard}>
                                <section
                                    key={index}
                                    className={styles.columnListRowItem}
                                >
                                    <p className={styles.smallText}>{item}</p>
                                </section>
                            </section>
                        </section>
                    )
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

const Skills = ({
    document,
    sectionId,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
    return (
        <GenericSection
            document={document}
            sectionId={sectionId}
            sectionName="Skills"
            arrayName="skillArray"
            singularName="Skill"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
};

const Languages = ({ document, sectionId }: SectionProps) => {
    return (
        <GenericSection
            document={document}
            sectionId={sectionId}
            sectionName="Languages"
            arrayName="languageArray"
            singularName="Language"
        />
    );
};

const Interests = ({ document, sectionId }: SectionProps) => {
    return (
        <GenericSection
            document={document}
            sectionId={sectionId}
            sectionName="Interests"
            arrayName="interestArray"
            singularName="Interest"
        />
    );
};

const SkillsCategory = ({
    document,
    sectionId,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
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
    const [editSectionIndex, setEditSectionIndex] = useState(-1);

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
                        <section className={styles.aiButtonRow}>
                            <label
                                htmlFor="categoryInput"
                                className={styles.inputLabel}
                            >
                                Skill Category
                            </label>
                            <AIButtons
                                promptId={"skillCategory"}
                                document={document}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                text={categoryInput}
                                setText={setCategoryInput as any}
                                length={3}
                                positionTitle=""
                                array={skillArray}
                            />
                        </section>
                        <section className={styles.aiInputItem}>
                            <textarea
                                id="categoryInput"
                                placeholder="E.g. Technical Skills"
                                className={styles.closingTextArea}
                                value={categoryInput}
                                onChange={(event) =>
                                    setCategoryInput(event.target.value)
                                }
                            />
                            <section className={styles.cardButtonContainer}>
                                <button
                                    title="Cancel"
                                    className={styles.cancelEditButton}
                                    onClick={() => {
                                        setCategoryInput("");
                                        setAddCategoryClicked(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    title="Add Category"
                                    className={styles.addButton}
                                    onClick={() => {
                                        const newCategoryArray = [
                                            ...skillArray,
                                        ];
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
                                    Add
                                </button>
                            </section>
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
                            setCategoryInput("");
                            setEditSectionIndex(-1);
                        }}
                    >
                        {plusIcon}
                    </button>
                </section>
            )}
            <section className={styles.columnList}>
                {skillArray.map((item: any, index: number) => (
                    <section
                        key={index}
                        className={styles.skillCategoryCardContainer}
                    >
                        {editSectionIndex === index ? (
                            <section className={styles.card}>
                                <section className={styles.skillCategoryCard}>
                                    <section className={styles.aiInputItem}>
                                        <section className={styles.aiButtonRow}>
                                            <label
                                                htmlFor="itemInput"
                                                className={styles.inputLabel}
                                            >
                                                Edit Category
                                            </label>
                                            {/* This does not work */}
                                            <AIButtons
                                                promptId={"skillCategorySkill"}
                                                document={document}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                text={categoryInput}
                                                setText={
                                                    setCategoryInput as any
                                                }
                                                length={15}
                                                positionTitle=""
                                                array={skillArray}
                                            />
                                        </section>
                                        <input
                                            id="itemInput"
                                            placeholder={`E.g. Technical Skills`}
                                            className={styles.textInput100}
                                            value={skillArray[index].category}
                                            onChange={(event) =>
                                                setSkillArray((prev: any) => {
                                                    const newCategoryArray = [
                                                        ...prev,
                                                    ];
                                                    newCategoryArray[
                                                        index
                                                    ].category =
                                                        event.target.value;
                                                    return newCategoryArray;
                                                })
                                            }
                                        />
                                    </section>
                                    {item.skills.map(
                                        (skill: any, subIndex: number) => (
                                            <section
                                                key={subIndex}
                                                className={styles.aiInputItem}
                                            >
                                                {/* add ai here*/}

                                                <section
                                                    className={
                                                        styles.aiButtonRow
                                                    }
                                                >
                                                    <label
                                                        htmlFor={
                                                            "skill" +
                                                            subIndex.toString()
                                                        }
                                                        className={
                                                            styles.inputLabel
                                                        }
                                                    >
                                                        Edit Skill{" "}
                                                        {subIndex + 1}
                                                    </label>
                                                    <section
                                                        className={
                                                            styles.rightButtonContainer
                                                        }
                                                    >
                                                        {/* This does not work yet */}
                                                        <AIButtons
                                                            promptId={
                                                                "skillCategorySkill"
                                                            }
                                                            document={document}
                                                            isLoading={
                                                                isLoading
                                                            }
                                                            setIsLoading={
                                                                setIsLoading
                                                            }
                                                            text={categoryInput}
                                                            setText={
                                                                setCategoryInput as any
                                                            }
                                                            length={15}
                                                            positionTitle=""
                                                            array={skillArray}
                                                        />
                                                        <button
                                                            title="Delete Skill"
                                                            className={
                                                                styles.cardDeleteButton
                                                            }
                                                            onClick={() => {
                                                                const newCategoryArray =
                                                                    [
                                                                        ...skillArray,
                                                                    ];
                                                                newCategoryArray[
                                                                    index
                                                                ].skills =
                                                                    newCategoryArray[
                                                                        index
                                                                    ].skills.filter(
                                                                        (
                                                                            _: any,
                                                                            i: number
                                                                        ) =>
                                                                            i !==
                                                                            subIndex
                                                                    );
                                                                setSkillArray(
                                                                    newCategoryArray
                                                                );
                                                            }}
                                                        >
                                                            <p
                                                                className={
                                                                    styles.smallText
                                                                }
                                                            >
                                                                Delete
                                                            </p>
                                                            {cancelIcon}
                                                        </button>
                                                    </section>
                                                </section>
                                                <textarea
                                                    id={
                                                        "skill" +
                                                        subIndex.toString()
                                                    }
                                                    placeholder={`E.g. JavaScript`}
                                                    className={
                                                        styles.closingTextArea
                                                    }
                                                    value={
                                                        skillArray[index]
                                                            .skills[subIndex]
                                                    }
                                                    onChange={(event) =>
                                                        setSkillArray(
                                                            (prev: any) => {
                                                                const newCategoryArray =
                                                                    [...prev];
                                                                newCategoryArray[
                                                                    index
                                                                ].skills[
                                                                    subIndex
                                                                ] =
                                                                    event.target.value;
                                                                return newCategoryArray;
                                                            }
                                                        )
                                                    }
                                                />
                                            </section>
                                        )
                                    )}
                                    <section
                                        className={
                                            styles.addSkillButtonContainer
                                        }
                                    >
                                        <button
                                            title="Add New Skill"
                                            className={styles.addButton}
                                            onClick={() => {
                                                const newCategoryArray = [
                                                    ...skillArray,
                                                ];
                                                newCategoryArray[
                                                    index
                                                ].skills.push("");
                                                setSkillArray(newCategoryArray);
                                            }}
                                        >
                                            Add skill
                                        </button>
                                    </section>
                                    <section
                                        className={styles.cardButtonContainer}
                                    >
                                        <button
                                            title="Cancel"
                                            className={styles.cancelEditButton}
                                            onClick={() => {
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            title={`Update Skill`}
                                            className={styles.saveEditButton}
                                            onClick={() => {
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </section>
                                </section>
                            </section>
                        ) : (
                            <section className={styles.card}>
                                <section className={styles.cardButtonContainer}>
                                    <button
                                        title="Delete Category"
                                        className={styles.cardDeleteButton}
                                        onClick={() => {
                                            setSkillArray(
                                                skillArray.filter(
                                                    (_: any, i: number) =>
                                                        i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <p className={styles.smallText}>
                                            Delete
                                        </p>
                                        {cancelIcon}
                                    </button>
                                    <button
                                        title="Edit Category"
                                        className={`${styles.cardEditButton}`}
                                        onClick={() => {
                                            setAddCategoryClicked(false);
                                            setEditSectionIndex(index);
                                        }}
                                    >
                                        <p className={styles.smallText}>Edit</p>
                                        {editIcon}
                                    </button>
                                </section>
                                <section className={styles.skillCategoryCard}>
                                    <section
                                        className={styles.columnListRowItem}
                                    >
                                        {editCategoryIndex === index ? (
                                            <button
                                                title="save"
                                                className={styles.editButton}
                                                onClick={() => {
                                                    const newCategoryArray = [
                                                        ...skillArray,
                                                    ];
                                                    newCategoryArray[
                                                        index
                                                    ].category = categoryInput;
                                                    setCategoryInput("");
                                                    setEditCategoryIndex(-1);
                                                }}
                                            >
                                                {checkIcon}
                                            </button>
                                        ) : (
                                            editSectionIndex === index && (
                                                <button
                                                    title="edit category"
                                                    className={
                                                        styles.editButton
                                                    }
                                                    onClick={() => {
                                                        setCategoryInput(
                                                            item.category
                                                        );
                                                        setEditCategoryIndex(
                                                            index
                                                        );
                                                    }}
                                                >
                                                    {editIcon}
                                                </button>
                                            )
                                        )}
                                        {editCategoryIndex === index ? (
                                            <input
                                                type="text"
                                                placeholder="E.g. Adobe Creative Suite"
                                                className={styles.textInput}
                                                value={categoryInput}
                                                onChange={(event) =>
                                                    setCategoryInput(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <h3>{item.category}</h3>
                                        )}
                                    </section>
                                    <section className={styles.innerColumnList}>
                                        {item.skills.map(
                                            (skill: any, subIndex: number) => (
                                                <section
                                                    key={subIndex}
                                                    className={
                                                        styles.columnListRowItem
                                                    }
                                                >
                                                    {editSectionIndex ===
                                                        index && (
                                                        <button
                                                            title="delete skill"
                                                            className={
                                                                styles.cancelButton
                                                            }
                                                            onClick={() => {
                                                                const newCategoryArray =
                                                                    [
                                                                        ...skillArray,
                                                                    ];
                                                                newCategoryArray[
                                                                    index
                                                                ].skills =
                                                                    newCategoryArray[
                                                                        index
                                                                    ].skills.filter(
                                                                        (
                                                                            _: any,
                                                                            i: number
                                                                        ) =>
                                                                            i !==
                                                                            subIndex
                                                                    );
                                                                setSkillArray(
                                                                    newCategoryArray
                                                                );
                                                            }}
                                                        >
                                                            {cancelIcon}
                                                        </button>
                                                    )}
                                                    {editSkillId ===
                                                    index.toString() +
                                                        subIndex.toString() ? (
                                                        <button
                                                            title="save"
                                                            className={
                                                                styles.editButton
                                                            }
                                                            onClick={() => {
                                                                const newCategoryArray =
                                                                    [
                                                                        ...skillArray,
                                                                    ];
                                                                newCategoryArray[
                                                                    index
                                                                ].skills[
                                                                    subIndex
                                                                ] = skillInput;
                                                                setSkillArray(
                                                                    newCategoryArray
                                                                );
                                                                setSkillInput(
                                                                    ""
                                                                );
                                                                setEditSkillId(
                                                                    ""
                                                                );
                                                            }}
                                                        >
                                                            {checkIcon}
                                                        </button>
                                                    ) : (
                                                        editSectionIndex ===
                                                            index && (
                                                            <button
                                                                title="edit skill"
                                                                className={
                                                                    styles.editButton
                                                                }
                                                                onClick={() => {
                                                                    setEditSkillId(
                                                                        index.toString() +
                                                                            subIndex.toString()
                                                                    );
                                                                    setSkillInput(
                                                                        skill
                                                                    );
                                                                }}
                                                            >
                                                                {editIcon}
                                                            </button>
                                                        )
                                                    )}
                                                    {editSkillId ===
                                                    index.toString() +
                                                        subIndex.toString() ? (
                                                        <input
                                                            type="text"
                                                            className={
                                                                styles.textInput
                                                            }
                                                            value={skillInput}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setSkillInput(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        <p
                                                            className={
                                                                styles.smallText
                                                            }
                                                        >
                                                            {skill}
                                                        </p>
                                                    )}
                                                </section>
                                            )
                                        )}
                                        <section
                                            className={
                                                styles.addSkillButtonContainer
                                            }
                                        >
                                            {addSkillIndex === index ? (
                                                <section
                                                    className={
                                                        styles.inputItemRow
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="E.g. Adobe Creative Suite"
                                                        className={
                                                            styles.textInput
                                                        }
                                                        value={skillInput}
                                                        onChange={(event) =>
                                                            setSkillInput(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        title="Add Skill"
                                                        className={`${styles.addButton} ${styles.addButtonSmall}`}
                                                        onClick={() => {
                                                            const newCategoryArray =
                                                                [...skillArray];
                                                            newCategoryArray[
                                                                index
                                                            ].skills.push(
                                                                skillInput
                                                            );
                                                            setSkillArray(
                                                                newCategoryArray
                                                            );
                                                            setSkillInput("");
                                                            setAddSkillIndex(
                                                                -1
                                                            );
                                                        }}
                                                    >
                                                        {plusIcon}
                                                    </button>
                                                </section>
                                            ) : (
                                                editSectionIndex === index && (
                                                    <>
                                                        <button
                                                            title="Add Skill"
                                                            className={`${styles.addButton} ${styles.addButtonSmall}`}
                                                            onClick={() => {
                                                                setAddSkillIndex(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            {plusIcon}
                                                        </button>
                                                        <section
                                                            className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                                        >
                                                            <button
                                                                title="Cancel"
                                                                className={
                                                                    styles.cancelEditButton
                                                                }
                                                                onClick={() => {
                                                                    setEditSectionIndex(
                                                                        -1
                                                                    );
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                title="Save Category"
                                                                className={
                                                                    styles.saveEditButton
                                                                }
                                                                onClick={() => {
                                                                    setEditSectionIndex(
                                                                        -1
                                                                    );
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                        </section>
                                                    </>
                                                )
                                            )}
                                        </section>
                                    </section>
                                </section>
                            </section>
                        )}
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

const Experience = ({
    document,
    sectionId,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [experienceArray, setExperienceArray] = useState(
        document.information.experienceArray
    );
    const [isCurrent, setIsCurrent] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [position, setPosition] = useState("");
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [endDate, setEndDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [summary, setSummary] = useState("");
    const [bulletPoints, setBulletPoints] = useState([""]);
    const [editSectionIndex, setEditSectionIndex] = useState(-1);
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [showStartDate, setShowStartDate] = useState(
        document.information.sectionEdit.experience.showStartDate
    );
    const [showSummary, setShowSummary] = useState(
        document.information.sectionEdit.experience.showSummary
    );
    const [dateFormat, setDateFormat] = useState(
        document.information.sectionEdit.experience.dateFormat
    );

    const showDate = (date: string) => {
        if (dateFormat === "short") {
            return formatDateMonYear(date);
        } else {
            return formatDateMonthYear(date);
        }
    };

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                experienceArray,
                sectionEdit: {
                    ...document.information.sectionEdit,
                    experience: {
                        ...document.information.sectionEdit.experience,
                        showStartDate,
                        showSummary,
                        dateFormat,
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

    const handleBulletPointChange = (index: number, value: string) => {
        const updatedBulletPoints = [...bulletPoints];
        updatedBulletPoints[index] = value;
        setBulletPoints(updatedBulletPoints);
    };

    const handleAddBulletPoint = () => {
        setBulletPoints([...bulletPoints, ""]);
    };

    const handleRemoveBulletPoint = (index: number) => {
        const updatedBulletPoints = [...bulletPoints];
        updatedBulletPoints.splice(index, 1);
        setBulletPoints(updatedBulletPoints);
    };

    return (
        <>
            <section className={styles.columnList}>
                {addItemClicked ? (
                    <section className={styles.skillCategoryCard}>
                        <section className={styles.columnListRowItem}>
                            <section className={styles.experienceItem}>
                                <p className={styles.editTitle}>Add new job:</p>
                                <section className={styles.inputRowContainer}>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="companyName"
                                            className={styles.inputLabel}
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            id="companyName"
                                            className={styles.textInput}
                                            value={companyName}
                                            onChange={(event) =>
                                                setCompanyName(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="position"
                                            className={styles.inputLabel}
                                        >
                                            Position
                                        </label>
                                        <input
                                            id="position"
                                            className={styles.textInput}
                                            value={position}
                                            onChange={(event) =>
                                                setPosition(event.target.value)
                                            }
                                        />
                                    </section>
                                </section>
                                <section className={styles.checkboxContainer}>
                                    <section className={styles.checkboxItem}>
                                        <input
                                            type="checkbox"
                                            id="isCurrent"
                                            className={styles.toggleInput}
                                            checked={isCurrent}
                                            onChange={(event) =>
                                                setIsCurrent(
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="isCurrent"
                                            className={styles.inputLabel}
                                        >
                                            Current Job
                                        </label>
                                    </section>
                                </section>
                                <section className={styles.inputRowContainer}>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="startDate"
                                            className={styles.inputLabel}
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            className={styles.textInput}
                                            onChange={(event) =>
                                                setStartDate(event.target.value)
                                            }
                                            value={startDate}
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="endDate"
                                            className={`${styles.inputLabel} ${
                                                isCurrent && styles.disabled
                                            }`}
                                        >
                                            End Date
                                        </label>
                                        <input
                                            id="endDate"
                                            type="date"
                                            disabled={isCurrent}
                                            className={styles.textInput}
                                            onChange={(event) => {
                                                console.log(event.target.value);
                                                setEndDate(event.target.value);
                                            }}
                                            value={endDate}
                                        />
                                    </section>
                                </section>
                                <section
                                    className={styles.inputItemContainer100}
                                >
                                    <section className={styles.aiButtonRow}>
                                        <label
                                            htmlFor="summary"
                                            className={`${styles.inputLabel}`}
                                        >
                                            Summary
                                        </label>
                                        {!position ? (
                                            <h4 className={styles.tipText}>
                                                Fill in the position to get AI
                                                help.
                                            </h4>
                                        ) : (
                                            <AIButtons
                                                promptId="experienceSummary"
                                                document={document}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                text={summary}
                                                setText={setSummary as any}
                                                length={30}
                                                positionTitle={position}
                                                array={[]}
                                            />
                                        )}
                                    </section>
                                    <textarea
                                        id="summary"
                                        className={styles.textArea}
                                        value={summary}
                                        onChange={(event) =>
                                            setSummary(event.target.value)
                                        }
                                    />
                                </section>
                                <section
                                    className={styles.inputItemContainer100}
                                >
                                    <label className={styles.inputLabel}>
                                        Bullet Points:
                                    </label>
                                    {bulletPoints.map((bulletPoint, index) => (
                                        <>
                                            <section
                                                className={
                                                    styles.cardButtonContainer
                                                }
                                            >
                                                {!position ? (
                                                    <h4
                                                        className={
                                                            styles.tipText
                                                        }
                                                    >
                                                        Fill in the position to
                                                        get AI help.
                                                    </h4>
                                                ) : (
                                                    <AIButtons
                                                        promptId="experienceBullet"
                                                        document={document}
                                                        isLoading={isLoading}
                                                        setIsLoading={
                                                            setIsLoading
                                                        }
                                                        text={bulletPoint}
                                                        bulletPointList={
                                                            bulletPoints
                                                        }
                                                        setBulletPointList={
                                                            setBulletPoints as any
                                                        }
                                                        bulletIndex={index}
                                                        length={15}
                                                        positionTitle={position}
                                                        array={bulletPoints}
                                                    />
                                                )}
                                                <button
                                                    className={
                                                        styles.cardDeleteButton
                                                    }
                                                    onClick={() =>
                                                        handleRemoveBulletPoint(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {cancelIcon}
                                                    <p
                                                        className={
                                                            styles.smallText
                                                        }
                                                    >
                                                        Remove
                                                    </p>
                                                </button>
                                            </section>
                                            <div
                                                className={
                                                    styles.inputRowContainer
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        styles.bulletPoint
                                                    }
                                                ></div>
                                                <input
                                                    type="text"
                                                    className={styles.textInput}
                                                    value={bulletPoints[index]}
                                                    onChange={(e) =>
                                                        handleBulletPointChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </>
                                    ))}
                                    <button
                                        onClick={handleAddBulletPoint}
                                        className={styles.addBulletButton}
                                    >
                                        Add Bullet Point
                                    </button>
                                </section>
                                <section
                                    className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                >
                                    <button
                                        title="Cancel"
                                        className={styles.cancelEditButton}
                                        onClick={() => {
                                            setCompanyName("");
                                            setPosition("");
                                            setStartDate("");
                                            setEndDate("");
                                            setIsCurrent(false);
                                            setSummary("");
                                            setBulletPoints([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        title="Add Job"
                                        className={styles.saveEditButton}
                                        onClick={() => {
                                            const newExperienceArray = [
                                                ...experienceArray,
                                            ];
                                            newExperienceArray.push({
                                                company: companyName,
                                                position,
                                                startDate,
                                                currentEmployer: isCurrent,
                                                endDate: isCurrent
                                                    ? "Present"
                                                    : endDate,
                                                summary,
                                                bullets: bulletPoints,
                                            });
                                            setExperienceArray(
                                                newExperienceArray
                                            );
                                            setCompanyName("");
                                            setPosition("");
                                            setStartDate("");
                                            setIsCurrent(false);
                                            setEndDate("");
                                            setSummary("");
                                            setBulletPoints([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Save
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                ) : (
                    <section className={styles.experienceTitleContainer}>
                        <section className={styles.rowContainer}>
                            <h3 style={{ textDecoration: "underline" }}>
                                Experience
                            </h3>
                            <button
                                title="Add Job"
                                className={styles.addButton}
                                onClick={() => {
                                    setEditSectionIndex(-1);
                                    setCompanyName("");
                                    setPosition("");
                                    setStartDate(
                                        new Date().toISOString().split("T")[0]
                                    );
                                    setEndDate(
                                        new Date().toISOString().split("T")[0]
                                    );
                                    setIsCurrent(false);
                                    setSummary("");
                                    setBulletPoints([""]);
                                    setAddItemClicked(true);
                                }}
                            >
                                {plusIcon}
                            </button>
                        </section>
                        <section className={styles.checkboxContainer}>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showStartDate"
                                    className={styles.toggleInput}
                                    checked={showStartDate}
                                    onChange={(event) =>
                                        setShowStartDate(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showStartDate"
                                    className={styles.inputLabel}
                                >
                                    Show Start Date
                                </label>
                            </section>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showSummary"
                                    className={styles.toggleInput}
                                    checked={showSummary}
                                    onChange={(event) =>
                                        setShowSummary(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showSummary"
                                    className={styles.inputLabel}
                                >
                                    Show Summary
                                </label>
                            </section>
                            <section className={`${styles.optionContainer}`}>
                                <p className={styles.optionLabel}>Date</p>
                                <section className={styles.dateButtonContainer}>
                                    <button
                                        className={`${styles.option} ${
                                            styles.dateButton
                                        } ${styles.leftButton} ${
                                            dateFormat === "short" &&
                                            styles.selectedDate
                                        }`}
                                        title="Short date - Jan 2024"
                                        onClick={() => {
                                            setDateFormat("short");
                                        }}
                                    >
                                        <p>Short</p>
                                    </button>
                                    <button
                                        className={`${styles.option} ${
                                            styles.dateButton
                                        } ${styles.rightButton} ${
                                            dateFormat === "long" &&
                                            styles.selectedDate
                                        }`}
                                        title="Long date - January 2024"
                                        onClick={() => {
                                            setDateFormat("long");
                                        }}
                                    >
                                        <p>Long</p>
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                )}
                {experienceArray.map((experience: any, index: number) => {
                    return editSectionIndex === index ? (
                        <section className={styles.skillCategoryCard}>
                            <section className={styles.columnListRowItem}>
                                <section className={styles.experienceItem}>
                                    <p className={styles.editTitle}>
                                        Edit job:
                                    </p>
                                    <section
                                        className={styles.inputRowContainer}
                                    >
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="companyName"
                                                className={styles.inputLabel}
                                            >
                                                Company Name
                                            </label>
                                            <input
                                                id="companyName"
                                                className={styles.textInput}
                                                value={companyName}
                                                onChange={(event) =>
                                                    setCompanyName(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="position"
                                                className={styles.inputLabel}
                                            >
                                                Position
                                            </label>
                                            <input
                                                id="position"
                                                className={styles.textInput}
                                                value={position}
                                                onChange={(event) =>
                                                    setPosition(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </section>
                                    </section>
                                    <section
                                        className={styles.checkboxContainer}
                                    >
                                        <section
                                            className={styles.checkboxItem}
                                        >
                                            <input
                                                type="checkbox"
                                                id="isCurrent"
                                                className={styles.toggleInput}
                                                checked={isCurrent}
                                                onChange={(event) =>
                                                    setIsCurrent(
                                                        event.target.checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="isCurrent"
                                                className={styles.inputLabel}
                                            >
                                                Current Job
                                            </label>
                                        </section>
                                    </section>
                                    <section
                                        className={styles.inputRowContainer}
                                    >
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="startDate"
                                                className={styles.inputLabel}
                                            >
                                                Start Date
                                            </label>
                                            <input
                                                id="startDate"
                                                type="date"
                                                className={styles.textInput}
                                                onChange={(event) =>
                                                    setStartDate(
                                                        event.target.value
                                                    )
                                                }
                                                value={startDate}
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="endDate"
                                                className={`${
                                                    styles.inputLabel
                                                } ${
                                                    isCurrent && styles.disabled
                                                }`}
                                            >
                                                End Date
                                            </label>
                                            <input
                                                id="endDate"
                                                type="date"
                                                disabled={isCurrent}
                                                className={styles.textInput}
                                                onChange={(event) => {
                                                    console.log(
                                                        event.target.value
                                                    );
                                                    setEndDate(
                                                        event.target.value
                                                    );
                                                }}
                                                value={endDate}
                                            />
                                        </section>
                                    </section>
                                    <section
                                        className={styles.inputItemContainer100}
                                    >
                                        <section className={styles.aiButtonRow}>
                                            <label
                                                htmlFor="summary"
                                                className={`${styles.inputLabel}`}
                                            >
                                                Summary
                                            </label>
                                            {!position ? (
                                                <h4 className={styles.tipText}>
                                                    Fill in the position to get
                                                    AI help.
                                                </h4>
                                            ) : (
                                                <AIButtons
                                                    promptId="experienceSummary"
                                                    document={document}
                                                    isLoading={isLoading}
                                                    setIsLoading={setIsLoading}
                                                    text={summary}
                                                    setText={setSummary as any}
                                                    length={30}
                                                    positionTitle={position}
                                                    array={[]}
                                                />
                                            )}
                                        </section>
                                        <textarea
                                            id="summary"
                                            className={styles.textArea}
                                            value={summary}
                                            onChange={(event) =>
                                                setSummary(event.target.value)
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer100}
                                    >
                                        <label className={styles.inputLabel}>
                                            Bullet Points:
                                        </label>
                                        <section
                                            className={
                                                styles.bulletContainerSpaced
                                            }
                                        >
                                            {bulletPoints.map(
                                                (bulletPoint, index) => (
                                                    <section
                                                        className={
                                                            styles.columnClose
                                                        }
                                                    >
                                                        {!position ? (
                                                            <h4
                                                                className={
                                                                    styles.tipText
                                                                }
                                                            >
                                                                Fill in the
                                                                position to get
                                                                AI help.
                                                            </h4>
                                                        ) : (
                                                            <AIButtons
                                                                promptId="experienceBullet"
                                                                document={
                                                                    document
                                                                }
                                                                isLoading={
                                                                    isLoading
                                                                }
                                                                setIsLoading={
                                                                    setIsLoading
                                                                }
                                                                text={
                                                                    bulletPoint
                                                                }
                                                                bulletPointList={
                                                                    bulletPoints
                                                                }
                                                                setBulletPointList={
                                                                    setBulletPoints as any
                                                                }
                                                                bulletIndex={
                                                                    index
                                                                }
                                                                length={15}
                                                                positionTitle={
                                                                    position
                                                                }
                                                                array={
                                                                    bulletPoints
                                                                }
                                                            />
                                                        )}

                                                        <div
                                                            className={
                                                                styles.inputRowContainer
                                                            }
                                                            key={index}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.bulletPoint
                                                                }
                                                            ></div>
                                                            <input
                                                                type="text"
                                                                className={
                                                                    styles.textInput
                                                                }
                                                                value={
                                                                    bulletPoints[
                                                                        index
                                                                    ]
                                                                }
                                                                onChange={(e) =>
                                                                    handleBulletPointChange(
                                                                        index,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <button
                                                                className={
                                                                    styles.addButton
                                                                }
                                                                onClick={() =>
                                                                    handleRemoveBulletPoint(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </section>
                                                )
                                            )}
                                        </section>
                                        <button
                                            onClick={handleAddBulletPoint}
                                            className={styles.addBulletButton}
                                        >
                                            Add Bullet Point
                                        </button>
                                    </section>
                                    <section
                                        className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                    >
                                        <button
                                            title="Cancel"
                                            className={styles.cancelEditButton}
                                            onClick={() => {
                                                setCompanyName("");
                                                setPosition("");
                                                setStartDate("");
                                                setIsCurrent(false);
                                                setEndDate("");
                                                setSummary("");
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            title="Add Job"
                                            className={styles.saveEditButton}
                                            onClick={() => {
                                                const newExperienceArray = [
                                                    ...experienceArray,
                                                ];
                                                // replace the job at index editSectionIndex with the new job
                                                newExperienceArray[
                                                    editSectionIndex
                                                ] = {
                                                    company: companyName,
                                                    position,
                                                    startDate,
                                                    currentEmployer: isCurrent,
                                                    endDate: isCurrent
                                                        ? "Present"
                                                        : endDate,
                                                    summary,
                                                    bullets: bulletPoints,
                                                };
                                                setExperienceArray(
                                                    newExperienceArray
                                                );
                                                setCompanyName("");
                                                setPosition("");
                                                setStartDate("");
                                                setEndDate("");
                                                setIsCurrent(false);
                                                setSummary("");
                                                setBulletPoints([""]);
                                                setAddItemClicked(false);
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </section>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section
                            key={index}
                            className={styles.skillCategoryCardContainer}
                        >
                            <section className={styles.card}>
                                <section className={styles.cardButtonContainer}>
                                    <button
                                        title="Delete Job"
                                        className={styles.cardDeleteButton}
                                        onClick={() => {
                                            setExperienceArray(
                                                experienceArray.filter(
                                                    (_: any, i: number) =>
                                                        i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <p className={styles.smallText}>
                                            Delete
                                        </p>
                                        {cancelIcon}
                                    </button>

                                    <button
                                        title="Edit Job"
                                        className={styles.cardEditButton}
                                        onClick={() => {
                                            setAddItemClicked(false);
                                            setCompanyName(experience.company);
                                            setPosition(experience.position);
                                            setStartDate(experience.startDate);
                                            setIsCurrent(
                                                experience.endDate === "Present"
                                            );
                                            setEndDate(
                                                experience.endDate === "Present"
                                                    ? new Date()
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : experience.endDate
                                            );
                                            setSummary(experience.summary);
                                            setBulletPoints(experience.bullets);
                                            setEditSectionIndex(index);
                                        }}
                                    >
                                        <p className={styles.smallText}>Edit</p>
                                        {editIcon}
                                    </button>
                                </section>
                                <section className={styles.skillCategoryCard}>
                                    <section
                                        className={styles.columnListRowItem}
                                    >
                                        <section
                                            className={styles.experienceItem}
                                        >
                                            <section className={styles.topRow}>
                                                <p
                                                    className={
                                                        styles.companyName
                                                    }
                                                >
                                                    {experience.company}
                                                </p>
                                                <section
                                                    className={
                                                        styles.dateContainer
                                                    }
                                                >
                                                    {showStartDate ? (
                                                        <p
                                                            className={
                                                                styles.date
                                                            }
                                                        >
                                                            {showDate(
                                                                experience.startDate
                                                            )}{" "}
                                                            -{" "}
                                                            {showDate(
                                                                experience.endDate
                                                            )}
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className={
                                                                styles.date
                                                            }
                                                        >
                                                            {showDate(
                                                                experience.endDate
                                                            )}
                                                        </p>
                                                    )}
                                                </section>
                                            </section>
                                            <p className={styles.position}>
                                                {experience.position}
                                            </p>
                                            {showSummary && (
                                                <p
                                                    className={
                                                        styles.jobSummary
                                                    }
                                                >
                                                    {experience.summary}
                                                </p>
                                            )}
                                            <ul
                                                className={
                                                    styles.bulletListContainer
                                                }
                                            >
                                                {experience.bullets.map(
                                                    (
                                                        bullet: any,
                                                        index: number
                                                    ) => (
                                                        <li
                                                            key={index}
                                                            className={
                                                                styles.bullet
                                                            }
                                                        >
                                                            {bullet}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>
                    );
                })}
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Education = ({
    document,
    sectionId,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [isCurrent, setIsCurrent] = useState(false);
    const [educationArray, setEducationArray] = useState(
        document.information.educationArray
    );
    const [schoolName, setSchoolName] = useState("");
    const [degreeType, setDegreeType] = useState("");
    const [gpa, setGpa] = useState("");
    const [degreeField, setDegreeField] = useState("");
    const [startDate, setStartDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [endDate, setEndDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [bulletPoints, setBulletPoints] = useState([""]);
    const [editSectionIndex, setEditSectionIndex] = useState(-1);
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [showStartDate, setShowStartDate] = useState(
        document.information.sectionEdit.education.showStartDate
    );
    const [showGpa, setShowGpa] = useState(
        document.information.sectionEdit.education.showGpa
    );
    const [showBullets, setShowBullets] = useState(
        document.information.sectionEdit.education.showBullets
    );
    const [dateFormat, setDateFormat] = useState(
        document.information.sectionEdit.education.dateFormat
    );

    const showDate = (date: string) => {
        if (dateFormat === "short") {
            return formatDateMonYear(date);
        } else {
            return formatDateMonthYear(date);
        }
    };

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                educationArray,
                sectionEdit: {
                    ...document.information.sectionEdit,
                    education: {
                        ...document.information.sectionEdit.education,
                        showStartDate,
                        showGpa,
                        showBullets,
                        dateFormat,
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

    const handleBulletPointChange = (index: number, value: string) => {
        const updatedBulletPoints = [...bulletPoints];
        updatedBulletPoints[index] = value;
        setBulletPoints(updatedBulletPoints);
    };

    const handleAddBulletPoint = () => {
        setBulletPoints([...bulletPoints, ""]);
    };

    const handleRemoveBulletPoint = (index: number) => {
        const updatedBulletPoints = [...bulletPoints];
        updatedBulletPoints.splice(index, 1);
        setBulletPoints(updatedBulletPoints);
    };

    return (
        <>
            <section className={styles.columnList}>
                {addItemClicked ? (
                    <section className={styles.skillCategoryCard}>
                        <section className={styles.columnListRowItem}>
                            <section className={styles.experienceItem}>
                                <p className={styles.editTitle}>
                                    Add new school:
                                </p>
                                <section className={styles.inputRowContainer}>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="schoolName"
                                            className={styles.inputLabel}
                                        >
                                            School Name
                                        </label>
                                        <input
                                            id="schoolName"
                                            className={styles.textInput}
                                            value={schoolName}
                                            onChange={(event) =>
                                                setSchoolName(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="degreeType"
                                            className={styles.inputLabel}
                                        >
                                            Degree Type
                                        </label>
                                        <input
                                            id="degreeType"
                                            placeholder="E.g. Bachelor's Degree"
                                            className={styles.textInput}
                                            value={degreeType}
                                            onChange={(event) =>
                                                setDegreeType(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="degreeField"
                                            className={styles.inputLabel}
                                        >
                                            Degree Field
                                        </label>
                                        <input
                                            id="degreeField"
                                            placeholder="E.g. Computer Science"
                                            className={styles.textInput}
                                            value={degreeField}
                                            onChange={(event) =>
                                                setDegreeField(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="gpa"
                                            className={styles.inputLabel}
                                        >
                                            GPA
                                        </label>
                                        <input
                                            id="gpa"
                                            placeholder="E.g. 3.8"
                                            className={styles.textInput}
                                            value={gpa}
                                            onChange={(event) =>
                                                setGpa(event.target.value)
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.checkboxContainer}
                                    >
                                        <section
                                            className={styles.checkboxItem}
                                        >
                                            <input
                                                type="checkbox"
                                                id="isCurrent"
                                                className={styles.toggleInput}
                                                checked={isCurrent}
                                                onChange={(event) =>
                                                    setIsCurrent(
                                                        event.target.checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="isCurrent"
                                                className={styles.inputLabel}
                                            >
                                                Currently Attending
                                            </label>
                                        </section>
                                    </section>
                                </section>
                                <section className={styles.inputRowContainer}>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="startDate"
                                            className={styles.inputLabel}
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            className={styles.textInput}
                                            onChange={(event) =>
                                                setStartDate(event.target.value)
                                            }
                                            value={startDate}
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="endDate"
                                            className={`${styles.inputLabel} ${
                                                isCurrent && styles.disabled
                                            }`}
                                        >
                                            End Date
                                        </label>
                                        <input
                                            disabled={isCurrent}
                                            id="endDate"
                                            type="date"
                                            className={styles.textInput}
                                            onChange={(event) => {
                                                console.log(event.target.value);
                                                setEndDate(event.target.value);
                                            }}
                                            value={endDate}
                                        />
                                    </section>
                                </section>
                                <section
                                    className={styles.inputItemContainer100}
                                >
                                    <label className={styles.inputLabel}>
                                        Bullet Points:
                                    </label>
                                    {bulletPoints.map((bulletPoint, index) => (
                                        <div
                                            className={styles.inputRowContainer}
                                            key={index}
                                        >
                                            <div
                                                className={styles.bulletPoint}
                                            ></div>
                                            <input
                                                type="text"
                                                className={styles.textInput}
                                                value={bulletPoint}
                                                onChange={(e) =>
                                                    handleBulletPointChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                className={styles.addButton}
                                                onClick={() =>
                                                    handleRemoveBulletPoint(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddBulletPoint}
                                        className={styles.addBulletButton}
                                    >
                                        Add Bullet Point
                                    </button>
                                </section>
                                <section
                                    className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                >
                                    <button
                                        title="Cancel"
                                        className={styles.cancelEditButton}
                                        onClick={() => {
                                            setSchoolName("");
                                            setDegreeType("");
                                            setDegreeField("");
                                            setStartDate("");
                                            setEndDate("");
                                            setGpa("");
                                            setIsCurrent(false);
                                            setBulletPoints([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        title="Add School"
                                        className={styles.saveEditButton}
                                        onClick={() => {
                                            const newExperienceArray = [
                                                ...educationArray,
                                            ];
                                            newExperienceArray.push({
                                                id: educationArray.length + 1,
                                                schoolName,
                                                degreeType,
                                                degreeField,
                                                startDate,
                                                currentEnrollment: isCurrent,
                                                endDate: isCurrent
                                                    ? "Present"
                                                    : endDate,
                                                gpa,
                                                bullets: bulletPoints,
                                            });
                                            setEducationArray(
                                                newExperienceArray
                                            );
                                            setSchoolName("");
                                            setDegreeType("");
                                            setDegreeField("");
                                            setGpa("");
                                            setStartDate("");
                                            setEndDate("");
                                            setIsCurrent(false);
                                            setBulletPoints([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Save
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                ) : (
                    <section className={styles.experienceTitleContainer}>
                        <section className={styles.rowContainer}>
                            <h3 style={{ textDecoration: "underline" }}>
                                Education
                            </h3>
                            <button
                                title="Add School"
                                className={styles.addButton}
                                onClick={() => {
                                    setEditSectionIndex(-1);
                                    setSchoolName("");
                                    setDegreeType("");
                                    setDegreeField("");
                                    setGpa("");
                                    setStartDate(
                                        new Date().toISOString().split("T")[0]
                                    );
                                    setEndDate(
                                        new Date().toISOString().split("T")[0]
                                    );
                                    setBulletPoints([""]);
                                    setAddItemClicked(true);
                                }}
                            >
                                {plusIcon}
                            </button>
                        </section>
                        <section className={styles.checkboxContainer}>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showStartDate"
                                    className={styles.toggleInput}
                                    checked={showStartDate}
                                    onChange={(event) =>
                                        setShowStartDate(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showStartDate"
                                    className={styles.inputLabel}
                                >
                                    Show Start Date
                                </label>
                            </section>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showGPA"
                                    className={styles.toggleInput}
                                    checked={showGpa}
                                    onChange={(event) =>
                                        setShowGpa(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showSummary"
                                    className={styles.inputLabel}
                                >
                                    Show GPA
                                </label>
                            </section>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showBullets"
                                    className={styles.toggleInput}
                                    checked={showBullets}
                                    onChange={(event) =>
                                        setShowBullets(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showBullets"
                                    className={styles.inputLabel}
                                >
                                    Show Bullet Points
                                </label>
                            </section>
                            <section className={`${styles.optionContainer}`}>
                                <p className={styles.optionLabel}>Date</p>
                                <section className={styles.dateButtonContainer}>
                                    <button
                                        className={`${styles.option} ${
                                            styles.dateButton
                                        } ${styles.leftButton} ${
                                            dateFormat === "short" &&
                                            styles.selectedDate
                                        }`}
                                        title="Short date - Jan 2024"
                                        onClick={() => {
                                            setDateFormat("short");
                                        }}
                                    >
                                        <p>Short</p>
                                    </button>
                                    <button
                                        className={`${styles.option} ${
                                            styles.dateButton
                                        } ${styles.rightButton} ${
                                            dateFormat === "long" &&
                                            styles.selectedDate
                                        }`}
                                        title="Long date - January 2024"
                                        onClick={() => {
                                            setDateFormat("long");
                                        }}
                                    >
                                        <p>Long</p>
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                )}
                {educationArray.map((experience: any, index: number) => {
                    return editSectionIndex === index ? (
                        <section className={styles.skillCategoryCard}>
                            <section className={styles.columnListRowItem}>
                                <section className={styles.experienceItem}>
                                    <p className={styles.editTitle}>
                                        Edit school:
                                    </p>
                                    <section
                                        className={styles.inputRowContainer}
                                    >
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="schoolName"
                                                className={styles.inputLabel}
                                            >
                                                School Name
                                            </label>
                                            <input
                                                id="schoolName"
                                                className={styles.textInput}
                                                value={schoolName}
                                                onChange={(event) =>
                                                    setSchoolName(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </section>

                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="degreeType"
                                                className={styles.inputLabel}
                                            >
                                                Degree Type
                                            </label>
                                            <input
                                                id="degreeType"
                                                placeholder="E.g. Bachelor's Degree"
                                                className={styles.textInput}
                                                value={degreeType}
                                                onChange={(event) =>
                                                    setDegreeType(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="degreeField"
                                                className={styles.inputLabel}
                                            >
                                                Degree Field
                                            </label>
                                            <input
                                                id="degreeField"
                                                placeholder="E.g. Computer Science"
                                                className={styles.textInput}
                                                value={degreeField}
                                                onChange={(event) =>
                                                    setDegreeField(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="gpa"
                                                className={styles.inputLabel}
                                            >
                                                GPA
                                            </label>
                                            <input
                                                id="gpa"
                                                placeholder="E.g. 3.8"
                                                className={styles.textInput}
                                                value={gpa}
                                                onChange={(event) =>
                                                    setGpa(event.target.value)
                                                }
                                            />
                                        </section>
                                        <section
                                            className={styles.checkboxContainer}
                                        >
                                            <section
                                                className={styles.checkboxItem}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="isCurrent"
                                                    className={
                                                        styles.toggleInput
                                                    }
                                                    checked={isCurrent}
                                                    onChange={(event) =>
                                                        setIsCurrent(
                                                            event.target.checked
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="isCurrent"
                                                    className={
                                                        styles.inputLabel
                                                    }
                                                >
                                                    Currently Attending
                                                </label>
                                            </section>
                                        </section>
                                    </section>
                                    <section
                                        className={styles.inputRowContainer}
                                    >
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="startDate"
                                                className={styles.inputLabel}
                                            >
                                                Start Date
                                            </label>
                                            <input
                                                id="startDate"
                                                type="date"
                                                className={styles.textInput}
                                                onChange={(event) =>
                                                    setStartDate(
                                                        event.target.value
                                                    )
                                                }
                                                value={startDate}
                                            />
                                        </section>
                                        <section
                                            className={
                                                styles.inputItemContainer
                                            }
                                        >
                                            <label
                                                htmlFor="endDate"
                                                className={`${
                                                    styles.inputLabel
                                                } ${
                                                    isCurrent && styles.disabled
                                                }`}
                                            >
                                                End Date
                                            </label>
                                            <input
                                                id="endDate"
                                                type="date"
                                                disabled={isCurrent}
                                                className={styles.textInput}
                                                onChange={(event) => {
                                                    console.log(
                                                        event.target.value
                                                    );
                                                    setEndDate(
                                                        event.target.value
                                                    );
                                                }}
                                                value={endDate}
                                            />
                                        </section>
                                    </section>
                                    <section
                                        className={styles.inputItemContainer100}
                                    >
                                        <label className={styles.inputLabel}>
                                            Bullet Points:
                                        </label>
                                        {bulletPoints.map(
                                            (bulletPoint, index) => (
                                                <div
                                                    className={
                                                        styles.inputRowContainer
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className={
                                                            styles.bulletPoint
                                                        }
                                                    ></div>
                                                    <input
                                                        type="text"
                                                        className={
                                                            styles.textInput
                                                        }
                                                        value={bulletPoint}
                                                        onChange={(e) =>
                                                            handleBulletPointChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        className={
                                                            styles.addButton
                                                        }
                                                        onClick={() =>
                                                            handleRemoveBulletPoint(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        )}
                                        <button
                                            onClick={handleAddBulletPoint}
                                            className={styles.addBulletButton}
                                        >
                                            Add Bullet Point
                                        </button>
                                    </section>
                                    <section
                                        className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                    >
                                        <button
                                            title="Cancel"
                                            className={styles.cancelEditButton}
                                            onClick={() => {
                                                setSchoolName("");
                                                setDegreeType("");
                                                setDegreeField("");
                                                setGpa("");
                                                setIsCurrent(false);
                                                setStartDate("");
                                                setEndDate("");
                                                setBulletPoints([""]);
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            title="Add School"
                                            className={styles.saveEditButton}
                                            onClick={() => {
                                                const newExperienceArray = [
                                                    ...educationArray,
                                                ];
                                                // replace the job at index editSectionIndex with the new job
                                                newExperienceArray[
                                                    editSectionIndex
                                                ] = {
                                                    schoolName,
                                                    degreeType,
                                                    degreeField,
                                                    gpa,
                                                    startDate,
                                                    currentEnrollment:
                                                        isCurrent,
                                                    endDate: isCurrent
                                                        ? "Present"
                                                        : endDate,
                                                    bullets: bulletPoints,
                                                };
                                                setEducationArray(
                                                    newExperienceArray
                                                );
                                                setSchoolName("");
                                                setDegreeType("");
                                                setDegreeField("");
                                                setGpa("");
                                                setStartDate("");
                                                setEndDate("");
                                                setIsCurrent(false);
                                                setBulletPoints([""]);
                                                setAddItemClicked(false);
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </section>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section
                            key={index}
                            className={styles.skillCategoryCardContainer}
                        >
                            <section className={styles.card}>
                                <section className={styles.cardButtonContainer}>
                                    <button
                                        title="Delete School"
                                        className={styles.cardDeleteButton}
                                        onClick={() => {
                                            setEducationArray(
                                                educationArray.filter(
                                                    (_: any, i: number) =>
                                                        i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <p className={styles.smallText}>
                                            Delete
                                        </p>
                                        {cancelIcon}
                                    </button>

                                    <button
                                        title="Edit School"
                                        className={styles.cardEditButton}
                                        onClick={() => {
                                            setAddItemClicked(false);
                                            setSchoolName(
                                                experience.schoolName
                                            );
                                            setDegreeType(
                                                experience.degreeType
                                            );
                                            setDegreeField(
                                                experience.degreeField
                                            );
                                            setIsCurrent(
                                                experience.currentEnrollment
                                            );
                                            setGpa(experience.gpa);
                                            setStartDate(experience.startDate);
                                            setEndDate(
                                                experience.endDate === "Present"
                                                    ? new Date()
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : experience.endDate
                                            );
                                            setBulletPoints(experience.bullets);
                                            setEditSectionIndex(index);
                                        }}
                                    >
                                        <p className={styles.smallText}>Edit</p>
                                        {editIcon}
                                    </button>
                                </section>
                                <section className={styles.skillCategoryCard}>
                                    <section
                                        className={styles.columnListRowItem}
                                    >
                                        <section
                                            className={styles.experienceItem}
                                        >
                                            <section className={styles.topRow}>
                                                <p
                                                    className={
                                                        styles.schoolName
                                                    }
                                                >
                                                    {experience.schoolName}
                                                </p>
                                                <section
                                                    className={
                                                        styles.dateContainer
                                                    }
                                                >
                                                    {showStartDate ? (
                                                        <p
                                                            className={
                                                                styles.date
                                                            }
                                                        >
                                                            {showDate(
                                                                experience.startDate
                                                            )}{" "}
                                                            -{" "}
                                                            {showDate(
                                                                experience.endDate
                                                            )}
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className={
                                                                styles.date
                                                            }
                                                        >
                                                            {showDate(
                                                                experience.endDate
                                                            )}
                                                        </p>
                                                    )}
                                                </section>
                                            </section>
                                            <p className={styles.degreeType}>
                                                {experience.degreeType} in{" "}
                                                {experience.degreeField}
                                            </p>
                                            {showGpa && (
                                                <p className={styles.gpa}>
                                                    GPA: {experience.gpa}
                                                </p>
                                            )}
                                            {showBullets && (
                                                <ul
                                                    className={
                                                        styles.bulletListContainer
                                                    }
                                                >
                                                    {experience.bullets.map(
                                                        (
                                                            bullet: any,
                                                            index: number
                                                        ) => (
                                                            <li
                                                                key={index}
                                                                className={
                                                                    styles.bullet
                                                                }
                                                            >
                                                                {bullet}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>
                    );
                })}
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Project = ({
    document,
    sectionId,
    isLoading,
    setIsLoading,
}: SectionProps & LoadingProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [projectArray, setProjectArray] = useState(
        document.information.projectArray
    );
    const [projectName, setProjectName] = useState("");
    const [projectSource, setProjectSource] = useState("");
    const [projectSummary, setProjectSummary] = useState("");
    const [projectBullets, setProjectBullets] = useState([""]);
    const [editSectionIndex, setEditSectionIndex] = useState(-1);
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [showSummary, setShowSummary] = useState(
        document.information.sectionEdit.projects.showSummary
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                projectArray,
                sectionEdit: {
                    ...document.information.sectionEdit,
                    projects: {
                        ...document.information.sectionEdit.projects,
                        showSummary,
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

    const handleBulletPointChange = (index: number, value: string) => {
        const updatedBulletPoints = [...projectBullets];
        updatedBulletPoints[index] = value;
        setProjectBullets(updatedBulletPoints);
    };

    const handleAddBulletPoint = () => {
        setProjectBullets([...projectBullets, ""]);
    };

    const handleRemoveBulletPoint = (index: number) => {
        const updatedBulletPoints = [...projectBullets];
        updatedBulletPoints.splice(index, 1);
        setProjectBullets(updatedBulletPoints);
    };

    return (
        <>
            <section className={styles.columnList}>
                {addItemClicked ? (
                    <section className={styles.skillCategoryCard}>
                        <section className={styles.columnListRowItem}>
                            <section className={styles.experienceItem}>
                                <p className={styles.editTitle}>
                                    Add new project:
                                </p>
                                <section className={styles.inputItemContainer}>
                                    <label
                                        htmlFor="projectName"
                                        className={styles.inputLabel}
                                    >
                                        Project Name
                                    </label>
                                    <input
                                        id="projectName"
                                        className={styles.textInput}
                                        value={projectName}
                                        onChange={(event) =>
                                            setProjectName(event.target.value)
                                        }
                                    />
                                </section>
                                <section className={styles.inputItemContainer}>
                                    <label
                                        htmlFor="projectSource"
                                        className={styles.inputLabel}
                                    >
                                        Project Source
                                    </label>
                                    <input
                                        id="projectSource"
                                        className={styles.textInput}
                                        value={projectSource}
                                        onChange={(event) =>
                                            setProjectSource(event.target.value)
                                        }
                                    />
                                </section>
                                <section
                                    className={styles.inputItemContainer100}
                                >
                                    <label
                                        htmlFor="projectSummary"
                                        className={`${styles.inputLabel}`}
                                    >
                                        Project Summary
                                    </label>
                                    <textarea
                                        id="projectSummary"
                                        className={styles.textArea}
                                        value={projectSummary}
                                        onChange={(event) =>
                                            setProjectSummary(
                                                event.target.value
                                            )
                                        }
                                    />
                                </section>
                                <section
                                    className={styles.inputItemContainer100}
                                >
                                    <label className={styles.inputLabel}>
                                        Bullet Points:
                                    </label>
                                    {projectBullets.map(
                                        (bulletPoint, index) => (
                                            <div
                                                className={
                                                    styles.inputRowContainer
                                                }
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        styles.bulletPoint
                                                    }
                                                ></div>
                                                <input
                                                    type="text"
                                                    className={styles.textInput}
                                                    value={bulletPoint}
                                                    onChange={(e) =>
                                                        handleBulletPointChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <button
                                                    className={styles.addButton}
                                                    onClick={() =>
                                                        handleRemoveBulletPoint(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                    )}
                                    <button
                                        onClick={handleAddBulletPoint}
                                        className={styles.addBulletButton}
                                    >
                                        Add Bullet Point
                                    </button>
                                </section>
                                <section
                                    className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                >
                                    <button
                                        title="Cancel"
                                        className={styles.cancelEditButton}
                                        onClick={() => {
                                            setProjectName("");
                                            setProjectSource("");
                                            setProjectSummary("");
                                            setProjectBullets([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        title="Add Project"
                                        className={styles.saveEditButton}
                                        onClick={() => {
                                            const newProjectArray = [
                                                ...projectArray,
                                            ];
                                            newProjectArray.push({
                                                name: projectName,
                                                source: projectSource,
                                                summary: projectSummary,
                                                bullets: projectBullets,
                                            });
                                            setProjectArray(newProjectArray);
                                            setProjectName("");
                                            setProjectSource("");
                                            setProjectSummary("");
                                            setProjectBullets([""]);
                                            setAddItemClicked(false);
                                        }}
                                    >
                                        Save
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                ) : (
                    <section className={styles.experienceTitleContainer}>
                        <section className={styles.rowContainer}>
                            <h3 style={{ textDecoration: "underline" }}>
                                Projects
                            </h3>
                            <button
                                title="Add Project"
                                className={styles.addButton}
                                onClick={() => {
                                    setEditSectionIndex(-1);
                                    setProjectName("");
                                    setProjectSource("");
                                    setProjectSummary("");
                                    setProjectBullets([""]);
                                    setAddItemClicked(true);
                                }}
                            >
                                {plusIcon}
                            </button>
                        </section>
                        <section className={styles.checkboxContainer}>
                            <section className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id="showSummary"
                                    className={styles.toggleInput}
                                    checked={showSummary}
                                    onChange={(event) =>
                                        setShowSummary(event.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="showSummary"
                                    className={styles.inputLabel}
                                >
                                    Show Summary
                                </label>
                            </section>
                        </section>
                    </section>
                )}
                {projectArray.map((project: any, index: number) => {
                    return editSectionIndex === index ? (
                        <section className={styles.skillCategoryCard}>
                            <section className={styles.columnListRowItem}>
                                <section className={styles.experienceItem}>
                                    <p className={styles.editTitle}>
                                        Edit project:
                                    </p>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="projectName"
                                            className={styles.inputLabel}
                                        >
                                            Project Name
                                        </label>
                                        <input
                                            id="projectName"
                                            className={styles.textInput}
                                            value={projectName}
                                            onChange={(event) =>
                                                setProjectName(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer}
                                    >
                                        <label
                                            htmlFor="projectSource"
                                            className={styles.inputLabel}
                                        >
                                            Project Source
                                        </label>
                                        <input
                                            id="projectSource"
                                            className={styles.textInput}
                                            value={projectSource}
                                            onChange={(event) =>
                                                setProjectSource(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer100}
                                    >
                                        <label
                                            htmlFor="projectSummary"
                                            className={`${styles.inputLabel}`}
                                        >
                                            Project Summary
                                        </label>
                                        <textarea
                                            id="projectSummary"
                                            className={styles.textArea}
                                            value={projectSummary}
                                            onChange={(event) =>
                                                setProjectSummary(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </section>
                                    <section
                                        className={styles.inputItemContainer100}
                                    >
                                        <label className={styles.inputLabel}>
                                            Bullet Points:
                                        </label>
                                        {projectBullets.map(
                                            (bulletPoint, index) => (
                                                <div
                                                    className={
                                                        styles.inputRowContainer
                                                    }
                                                    key={index}
                                                >
                                                    <div
                                                        className={
                                                            styles.bulletPoint
                                                        }
                                                    ></div>
                                                    <input
                                                        type="text"
                                                        className={
                                                            styles.textInput
                                                        }
                                                        value={bulletPoint}
                                                        onChange={(e) =>
                                                            handleBulletPointChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        className={
                                                            styles.addButton
                                                        }
                                                        onClick={() =>
                                                            handleRemoveBulletPoint(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        )}
                                        <button
                                            onClick={handleAddBulletPoint}
                                            className={styles.addBulletButton}
                                        >
                                            Add Bullet Point
                                        </button>
                                    </section>
                                    <section
                                        className={`${styles.saveButtonContainer} ${styles.experienceButtonContainer}`}
                                    >
                                        <button
                                            title="Cancel"
                                            className={styles.cancelEditButton}
                                            onClick={() => {
                                                setProjectName("");
                                                setProjectSource("");
                                                setProjectSummary("");
                                                setProjectBullets([""]);
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            title="Update Project"
                                            className={styles.saveEditButton}
                                            onClick={() => {
                                                const newProjectArray = [
                                                    ...projectArray,
                                                ];
                                                newProjectArray[
                                                    editSectionIndex
                                                ] = {
                                                    name: projectName,
                                                    source: projectSource,
                                                    summary: projectSummary,
                                                    bullets: projectBullets,
                                                };
                                                setProjectArray(
                                                    newProjectArray
                                                );
                                                setProjectName("");
                                                setProjectSource("");
                                                setProjectSummary("");
                                                setProjectBullets([""]);
                                                setEditSectionIndex(-1);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </section>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section
                            key={index}
                            className={styles.skillCategoryCardContainer}
                        >
                            <section className={styles.card}>
                                <section className={styles.cardButtonContainer}>
                                    <button
                                        title="Delete Project"
                                        className={styles.cardDeleteButton}
                                        onClick={() => {
                                            setProjectArray(
                                                projectArray.filter(
                                                    (_: any, i: number) =>
                                                        i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <p className={styles.smallText}>
                                            Delete
                                        </p>
                                        {cancelIcon}
                                    </button>
                                    <button
                                        title="Edit Project"
                                        className={styles.cardEditButton}
                                        onClick={() => {
                                            setAddItemClicked(false);
                                            setProjectName(project.name);
                                            setProjectSource(project.source);
                                            setProjectSummary(project.summary);
                                            setProjectBullets(project.bullets);
                                            setEditSectionIndex(index);
                                        }}
                                    >
                                        <p className={styles.smallText}>Edit</p>
                                        {editIcon}
                                    </button>
                                </section>
                                <section className={styles.skillCategoryCard}>
                                    <section
                                        className={styles.columnListRowItem}
                                    >
                                        <section
                                            className={styles.experienceItem}
                                        >
                                            <p className={styles.companyName}>
                                                {project.name}
                                            </p>
                                            <p className={styles.position}>
                                                {project.source}
                                            </p>
                                            {showSummary && (
                                                <p
                                                    className={
                                                        styles.jobSummary
                                                    }
                                                >
                                                    {project.summary}
                                                </p>
                                            )}
                                            <ul
                                                className={
                                                    styles.bulletListContainer
                                                }
                                            >
                                                {project.bullets.map(
                                                    (
                                                        bullet: any,
                                                        index: number
                                                    ) => (
                                                        <li
                                                            key={index}
                                                            className={
                                                                styles.bullet
                                                            }
                                                        >
                                                            {bullet}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>
                    );
                })}
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

// cover letter specific components
const Salutation = ({ document, sectionId }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [date, setDate] = useState(document.information.date);
    const [companyName, setCompanyName] = useState(
        document.information.companyName
    );
    const [address1, setAddress1] = useState(document.information.address1);
    const [address2, setAddress2] = useState(document.information.address2);
    const [address3, setAddress3] = useState(document.information.address3);
    const [showCompanyName, setShowCompanyName] = useState(
        document.information.sectionEdit.salutation.showCompanyName
    );
    const [salutation, setSalutation] = useState(
        document.information.salutation
    );
    const [showAddress1, setShowAddress1] = useState(
        document.information.sectionEdit.salutation.showAddress1
    );
    const [showAddress2, setShowAddress2] = useState(
        document.information.sectionEdit.salutation.showAddress2
    );
    const [showAddress3, setShowAddress3] = useState(
        document.information.sectionEdit.salutation.showAddress3
    );
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
                date,
                companyName,
                address1,
                address2,
                address3,
                salutation,
                sectionEdit: {
                    ...document.information.sectionEdit,
                    salutation: {
                        ...document.information.sectionEdit.salutation,
                        showCompanyName,
                        showAddress1,
                        showAddress2,
                        showAddress3,
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
                        htmlFor="date"
                        className={`${styles.inputLabel} ${
                            !showEmail && styles.disabled
                        }`}
                    >
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        className={styles.textInput}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="companyName"
                            className={`${styles.inputLabel} ${
                                !showCompanyName && styles.disabled
                            }`}
                        >
                            Company Name
                        </label>
                        <input
                            type="checkbox"
                            id="companyNameCheckbox"
                            className={styles.toggleInput}
                            checked={showCompanyName}
                            onChange={(event) =>
                                setShowCompanyName(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="companyName"
                        disabled={!showCompanyName}
                        className={styles.textInput}
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />
                </section>
            </section>
            <section className={styles.inputRowContainer}>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="address1"
                            className={`${styles.inputLabel} ${
                                !showAddress1 && styles.disabled
                            }`}
                        >
                            Address Line 1
                        </label>
                        <input
                            type="checkbox"
                            id="address1Checkbox"
                            className={styles.toggleInput}
                            checked={showAddress1}
                            onChange={(event) =>
                                setShowAddress1(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="address1"
                        disabled={!showAddress1}
                        className={styles.textInput}
                        value={address1}
                        onChange={(event) => setAddress1(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="address2"
                            className={`${styles.inputLabel} ${
                                !showAddress2 && styles.disabled
                            }`}
                        >
                            Address Line 2
                        </label>
                        <input
                            type="checkbox"
                            id="address2Checkbox"
                            className={styles.toggleInput}
                            checked={showAddress2}
                            onChange={(event) =>
                                setShowAddress2(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="address2"
                        disabled={!showAddress2}
                        className={styles.textInput}
                        value={address2}
                        onChange={(event) => setAddress2(event.target.value)}
                    />
                </section>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="address3"
                            className={`${styles.inputLabel} ${
                                !showAddress3 && styles.disabled
                            }`}
                        >
                            Address Line 3
                        </label>
                        <input
                            type="checkbox"
                            id="address3Checkbox"
                            className={styles.toggleInput}
                            checked={showAddress3}
                            onChange={(event) =>
                                setShowAddress3(event.target.checked)
                            }
                        />
                    </section>
                    <input
                        id="address3"
                        disabled={!showAddress3}
                        className={styles.textInput}
                        value={address3}
                        onChange={(event) => setAddress3(event.target.value)}
                    />
                </section>
            </section>
            <section className={styles.inputRowContainer}>
                <section className={styles.inputItemContainer}>
                    <section className={styles.toggleContainer}>
                        <label
                            htmlFor="salutation"
                            className={styles.inputLabel}
                        >
                            Salutation
                        </label>
                    </section>
                    <input
                        id="salutation"
                        className={styles.textInput}
                        value={salutation}
                        onChange={(event) => setSalutation(event.target.value)}
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

const Body = ({ sectionId, document }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [bodyText, setBodyText] = useState(document.information.body);

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                body: bodyText,
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
            <section className={styles.inputItemContainer100}>
                <label
                    htmlFor="body"
                    className={`${styles.inputLabel}
                                    
                                `}
                >
                    Letter Body
                </label>
                <textarea
                    id="body"
                    className={styles.textArea}
                    value={bodyText}
                    onChange={(event) => setBodyText(event.target.value)}
                />
            </section>
            <SaveButton
                sectionId={sectionId}
                document={document}
                onClick={saveClicked}
            />
        </>
    );
};

const Closing = ({ sectionId, document }: SectionProps) => {
    const { documentArray, setDocumentArray } = useAppContext();
    const [closingText, setClosingText] = useState(
        document.information.closing
    );

    const saveClicked = () => {
        const updatedDocument = {
            ...document,
            information: {
                ...document.information,
                closing: closingText,
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
            <section className={styles.inputItemContainer100}>
                <label
                    htmlFor="closing"
                    className={`${styles.inputLabel}
                                    
                                `}
                >
                    Closing
                </label>
                <textarea
                    id="closing"
                    className={styles.closingTextArea}
                    value={closingText}
                    onChange={(event) => setClosingText(event.target.value)}
                />
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
        case sectionId.includes("salutation"):
            title = "Edit Salutation";
            break;
        case sectionId.includes("body"):
            title = "Edit Body";
            break;
        case sectionId.includes("closing"):
            title = "Edit Closing";
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
        case sectionId.includes("experience"):
            options = Object.keys(document.information.sectionEdit.experience);
            break;
        case sectionId.includes("education"):
            options = Object.keys(document.information.sectionEdit.education);
            break;
        case sectionId.includes("projects"):
            options = Object.keys(document.information.sectionEdit.projects);
            break;
        case sectionId.includes("languages"):
            options = Object.keys(document.information.sectionEdit.languages);
            break;
        case sectionId.includes("interests"):
            options = Object.keys(document.information.sectionEdit.interests);
            break;
        case sectionId.includes("header"):
            options = Object.keys(document.information.sectionEdit.header);
            break;
        case sectionId.includes("salutation"):
            options = Object.keys(document.information.sectionEdit.salutation);
            break;
        case sectionId.includes("body"):
            options = Object.keys(document.information.sectionEdit.body);
            break;
        case sectionId.includes("closing"):
            options = Object.keys(document.information.sectionEdit.closing);
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
    const [isLoading, setIsLoading] = useState(false);
    const closeClicked = (event: any) => {
        if (event.target.id !== "modalContainer") return;
        const newUrl = window.location.href.split("?")[0]; // Remove search parameters
        history.replaceState(null, "", newUrl);
    };

    let section = <></>;
    sectionId = sectionId.toLowerCase();
    switch (true) {
        case sectionId.includes("summary"):
            section = (
                <Summary
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
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
            section = (
                <Skills
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
            break;
        case sectionId.includes("skills") && sectionId.includes("category"):
            section = (
                <SkillsCategory
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
            break;
        case sectionId.includes("experience"):
            section = (
                <Experience
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
            break;
        case sectionId.includes("education"):
            section = (
                <Education
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
            break;
        case sectionId.includes("projects"):
            section = (
                <Project
                    document={document}
                    sectionId={sectionId}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            );
            break;
        case sectionId.includes("languages"):
            section = <Languages document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("interests"):
            section = <Interests document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("salutation"):
            section = <Salutation document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("body"):
            section = <Body document={document} sectionId={sectionId} />;
            break;
        case sectionId.includes("closing"):
            section = <Closing document={document} sectionId={sectionId} />;
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
                {isLoading && <LoadingScreen />}
            </section>
        </section>
    );
}
