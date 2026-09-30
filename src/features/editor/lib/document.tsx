import { formatDateMonthYear, sortObjectArrayByDateEnd } from "@/lib/date";
import {
    Basic,
    Velocity,
    Triumph,
    Fresh,
    Impact,
    Nexus,
    Nova,
    Sharp,
    Vivid,
    Luminary,
} from "@/features/resume";

import { BasicL, FreshL } from "@/features/cover-letter";
import { text } from "stream/consumers";
import BulletList from "@/features/dashboard/components/bullet-input/BulletInput";

export const updateDocument = (
    document: any,
    template: string,
    changedTemplate: boolean
) => {
    // change the template field to the new template
    // search for any items in the document.information.sectionOrder that have the substring 'header', and replace the item with headerTemplate depending on the passed template
    let newSectionOrder = [] as any;
    if (template === "nova") {
        // if the template is nova, then the sectionOrder array for the first array should be: ['headerNova', 'summary', 'experience', 'colBreak' 'contactVertical', 'skills', 'education', 'languages']
        const newArr = [
            "headerNova",
            "summary",
            "experience",
            "colBreak",
            "contactVertical",
            "skillsBullet",
            "educationShort",
            "languagesBullet",
        ];
        // make the first array in sectionOrder equal to newArr
        // add the newArr to the newSectionOrder
        // check if the first array in sectionOrder contains 'colBreak' or an element that includes 'nova'
        if (!changedTemplate) {
            // make the newSectionOrder the same as the current array
            newSectionOrder = document.information.sectionOrder;
        } else {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any, index: number) => {
                    return index === 0 ? newArr : array;
                }
            );
        }
    } else if (template === "vivid") {
        // if the template is nova, then the sectionOrder array for the first array should be: ['headerNova', 'summary', 'experience', 'colBreak' 'contactVertical', 'skills', 'education', 'languages']
        const newArr = [
            "headerVivid",
            "summary",
            "experience",
            "colBreak",
            "contactVertical",
            "skillsVivid",
            "educationShort",
            "languagesBullet",
        ];
        // make the first array in sectionOrder equal to newArr
        // add the newArr to the newSectionOrder
        // check if the first array in sectionOrder contains 'colBreak' or an element that includes 'nova'
        if (!changedTemplate) {
            // make the newSectionOrder the same as the current array
            newSectionOrder = document.information.sectionOrder;
        } else {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any, index: number) => {
                    return index === 0 ? newArr : array;
                }
            );
        }
    } else if (template === "luminary") {
        // if the template is nova, then the sectionOrder array for the first array should be: ['headerNova', 'summary', 'experience', 'colBreak' 'contactVertical', 'skills', 'education', 'languages']
        const newArr = [
            "headerLuminary",
            "summary",
            "experience",
            "colBreak",
            "contactVerticalIcons",
            "skillsBullet",
            "educationShort",
            "languagesBullet",
        ];
        // make the first array in sectionOrder equal to newArr
        // add the newArr to the newSectionOrder
        // check if the first array in sectionOrder contains 'colBreak' or an element that includes 'nova'
        if (!changedTemplate) {
            // make the newSectionOrder the same as the current array
            newSectionOrder = document.information.sectionOrder;
        } else {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any, index: number) => {
                    return index === 0 ? newArr : array;
                }
            );
        }
    } else {
        if (changedTemplate) {
            newSectionOrder = document.information.sectionOrder.map(
                (array: any) =>
                    array.map((item: string) => {
                        if (item === "colBreak") {
                            return null;
                        }
                        if (item.includes("header")) {
                            // return 'header' + template but make the first letter of template capitalized
                            return `header${template
                                .charAt(0)
                                .toUpperCase()}${template.slice(1)}`;
                        }
                        if (item.includes("skills")) {
                            return "skillsBullet";
                        }
                        return item;
                    })
            );
            // remove any null values from the first array in newSectionOrder
            newSectionOrder[0] = newSectionOrder[0].filter(
                (item: string | null) => item !== null
            );
        } else {
            newSectionOrder = document.information.sectionOrder;
        }
    }
    const updatedDocument = {
        ...document,
        information: {
            ...document.information,
            template,
            sectionOrder: newSectionOrder,
        },
    };
    return updatedDocument;
};

export const getAllResumeTemplates = (
    document: any,
    changedTemplate: boolean
) => {
    return {
        basic: {
            name: "Basic",
            description: "A simple and clean resume template.",
            keywords: [
                "basic",
                "simple",
                "clean",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Basic
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Basic
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Basic
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
        },
        velocity: {
            name: "Velocity",
            description:
                "A simple and clean resume template that prioritizes readability.",
            keywords: [
                "velocity",
                "simple",
                "clean",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Velocity
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Velocity
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Velocity
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
        },
        triumph: {
            name: "Triumph",
            description:
                "A modern and sleek resume template that focuses on readability while maintaining a modern aesthetic.",
            keywords: [
                "triumph",
                "modern",
                "sleek",
                "professional",
                "smart",
                "ats",
                "design",
            ],
            editorComponent: (
                <Triumph
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Triumph
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Triumph
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
        },
        nexus: {
            name: "Nexus",
            description: "A modern and sleek resume template.",
            keywords: [
                "nexus",
                "modern",
                "sleek",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Nexus
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Nexus
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Nexus
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
        },
        impact: {
            name: "Impact",
            description: "A bold and impactful resume template.",
            keywords: ["impact", "bold", "professional", "smart", "ats"],
            editorComponent: (
                <Impact
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Impact
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Impact
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
        },
        nova: {
            name: "Nova",
            description: "A modern and creative resume template.",
            keywords: ["nova", "unique", "creative", "modern", "art"],
            editorComponent: (
                <Nova
                    isEditor={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
            downloadComponent: (
                <Nova
                    isDownload={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
            previewComponent: (
                <Nova
                    isPreview={true}
                    document={updateDocument(document, "nova", changedTemplate)}
                />
            ),
        },
        fresh: {
            name: "Fresh",
            description: "A clean resume template with a touch of color.",
            keywords: [
                "fresh",
                "clean",
                "modern",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <Fresh
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Fresh
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Fresh
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
        },
        vivid: {
            name: "Vivid",
            description:
                "A unique resume template with two columns, and a touch of flair with your initials.",
            keywords: ["vivid", "colorful", "modern", "unique", "art"],
            editorComponent: (
                <Vivid
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Vivid
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Vivid
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
        },
        sharp: {
            name: "Sharp",
            description:
                "A professional resume template with some color to stand out.",
            keywords: ["sharp", "professional", "modern", "ats"],
            editorComponent: (
                <Sharp
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Sharp
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Sharp
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
        },
        luminary: {
            name: "Luminary",
            description:
                "A professional resume template with a modern design and a touch of flair.",
            keywords: [
                "luminary",
                "professional",
                "modern",
                "pretty",
                "cute",
                "art",
                "color",
            ],
            editorComponent: (
                <Luminary
                    isEditor={true}
                    document={updateDocument(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <Luminary
                    isDownload={true}
                    document={updateDocument(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <Luminary
                    isPreview={true}
                    document={updateDocument(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
        },
    };
};

export const updateCoverLetter = (
    document: any,
    template: string,
    changedTemplate: boolean
) => {
    // change the template field to the new template
    // search for any items in the document.information.sectionOrder that have the substring 'header', and replace the item with headerTemplate depending on the passed template
    let newSectionOrder = [] as any;
    if (changedTemplate) {
        newSectionOrder = document.information.sectionOrder.map((array: any) =>
            array.map((item: string) => {
                if (item.includes("header")) {
                    // return 'header' + template but make the first letter of template capitalized
                    return `header${template
                        .charAt(0)
                        .toUpperCase()}${template.slice(1)}`;
                }
                return item;
            })
        );
        // remove any null values from the first array in newSectionOrder
        newSectionOrder[0] = newSectionOrder[0].filter(
            (item: string | null) => item !== null
        );
    } else {
        newSectionOrder = document.information.sectionOrder;
    }
    const updatedDocument = {
        ...document,
        information: {
            ...document.information,
            template,
            sectionOrder: newSectionOrder,
        },
    };
    return updatedDocument;
};

export const getAllCoverLetterTemplates = (
    document: any,
    changedTemplate: boolean
) => {
    return {
        basic: {
            name: "Basic",
            description: "A simple and clean cover letter template.",
            keywords: [
                "basic",
                "simple",
                "clean",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "basic",
                        changedTemplate
                    )}
                />
            ),
        },
        velocity: {
            name: "Velocity",
            description:
                "A simple and clean cover letter template that prioritizes readability.",
            keywords: [
                "velocity",
                "simple",
                "clean",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "velocity",
                        changedTemplate
                    )}
                />
            ),
        },
        triumph: {
            name: "Triumph",
            description:
                "A modern and sleek cover letter template that focuses on readability while maintaining a modern aesthetic.",
            keywords: [
                "triumph",
                "modern",
                "sleek",
                "professional",
                "smart",
                "ats",
                "design",
            ],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "triumph",
                        changedTemplate
                    )}
                />
            ),
        },
        nexus: {
            name: "Nexus",
            description: "A modern and sleek cover letter template.",
            keywords: [
                "nexus",
                "modern",
                "sleek",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "nexus",
                        changedTemplate
                    )}
                />
            ),
        },
        impact: {
            name: "Impact",
            description: "A bold and impactful cover letter template.",
            keywords: ["impact", "bold", "professional", "smart", "ats"],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "impact",
                        changedTemplate
                    )}
                />
            ),
        },
        nova: {
            name: "Nova",
            description: "A modern and creative cover letter template.",
            keywords: ["nova", "unique", "creative", "modern", "art"],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "nova",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "nova",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "nova",
                        changedTemplate
                    )}
                />
            ),
        },
        fresh: {
            name: "Fresh",
            description: "A clean cover letter template with a touch of color.",
            keywords: [
                "fresh",
                "clean",
                "modern",
                "professional",
                "smart",
                "ats",
            ],
            editorComponent: (
                <FreshL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <FreshL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <FreshL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "fresh",
                        changedTemplate
                    )}
                />
            ),
        },
        vivid: {
            name: "Vivid",
            description:
                "A unique cover letter template with two columns, and a touch of flair with your initials.",
            keywords: ["vivid", "colorful", "modern", "unique", "art"],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "vivid",
                        changedTemplate
                    )}
                />
            ),
        },
        sharp: {
            name: "Sharp",
            description:
                "A professional cover letter template with some color to stand out.",
            keywords: ["sharp", "professional", "modern", "ats"],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "sharp",
                        changedTemplate
                    )}
                />
            ),
        },
        luminary: {
            name: "Luminary",
            description:
                "A professional cover letter template with a modern design and a touch of flair.",
            keywords: [
                "luminary",
                "professional",
                "modern",
                "pretty",
                "cute",
                "art",
                "color",
            ],
            editorComponent: (
                <BasicL
                    isEditor={true}
                    document={updateCoverLetter(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
            downloadComponent: (
                <BasicL
                    isDownload={true}
                    document={updateCoverLetter(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
            previewComponent: (
                <BasicL
                    isPreview={true}
                    document={updateCoverLetter(
                        document,
                        "luminary",
                        changedTemplate
                    )}
                />
            ),
        },
    };
};

export const updateDocumentArray = (updatedDocument: any, array: any) => {
    const { id } = updatedDocument;
    // update the documentArray with the new information
    const newDocumentArray = array.map((document: any) => {
        if (document.id === id) {
            return updatedDocument;
        }
        return document;
    });
    return newDocumentArray;
};

export const getAllUserJobs = async (userId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/jobs?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: [userId] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const getAllUserResumes = async (userId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/resumes?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: [userId] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const getAllUserCoverLetters = async (userId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/cover-letters?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: [userId] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const getResume = async (userId: string, resumeId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/resume?resumeId=${resumeId}&userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: [userId] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const getCoverLetter = async (userId: string, coverLetterId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/cover-letter?coverLetterId=${coverLetterId}&userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: [userId] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};

export const initializeNewCoverLetter = (
    user: any,
    name: string,
    job: string,
    description: string
) => {
    const { basicInfo } = user;
    const first = basicInfo ? basicInfo.firstName : user.firstName;
    const last = basicInfo ? basicInfo.lastName : user.lastName;
    const email = basicInfo && basicInfo.email ? basicInfo.email : user.email;
    const phone =
        basicInfo && basicInfo.phone ? basicInfo.phone : "(123) 456-7890";
    const website =
        basicInfo && basicInfo.website
            ? basicInfo.website
            : "https://example-website.com";
    // Get the current date
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const data = {
        currentPage: 1,
        style: {
            baseFontSize: 12,
            baseMarginSize: 22,
            baseSectionGap: 11,
            backgroundColor: "#ffffff",
            textColor: "#000000",
            accentBackgroundColor: "#b5b357",
            accentTextColor: "white",
        },
        sectionEdit: {
            header: {
                fontRatio: 1,
                showPosition: true,
                showSummary: true,
                showSocial: true,
            },
            body: {
                fontRatio: 1,
            },
            salutation: {
                fontRatio: 1,
                showCompanyName: true,
                showAddress1: true,
                showAddress2: false,
                showAddress3: true,
            },
            contact: {
                fontRatio: 1,
                showEmail: true,
                showPhone: true,
                showWebsite: true,
                textAlignment: "left",
            },
            closing: {
                fontRatio: 1,
            },
        },
        documentName: name,
        jobTitle: job,
        description,
        template: "nova",
        font: "Times-Roman",
        firstName: first,
        lastName: last,
        sectionOrder: [["headerNova", "salutation", "body", "closing"]],
        numPages: 1,
        position: "Example Position",
        date: formattedDate,
        companyName: "Example Company",
        address1: "123 Example St.",
        address2: "Suite 123",
        address3: "Example City, EX 12345",
        salutation: "Dear Hiring Manager,",
        closing: "Sincerely,\nYour Name",
        body: "I am writing to express my enthusiastic interest in the [Job Title] position at [Company Name], as advertised on [Where You Found the Job Listing]. With a robust background in [Your Field of Expertise] and a deep-seated passion for [Related Skill/Industry], I am eager to contribute to your team and help [Company Name] achieve its ambitious goals. My extensive experience in [Specific Sector or Function], coupled with a track record of success in [Relevant Skill/Experience], positions me as an ideal candidate for this role.\n\nThroughout my career, I have developed a diverse skill set that aligns perfectly with the requirements of the [Job Title] position. For instance, my expertise in [Key Skill 1] has enabled me to [Explain Achievement or Experience], which I believe is directly relevant to [Specific Aspect of the Role]. Additionally, my proficiency in [Key Skill 2] has been instrumental in [Describe Project or Task], demonstrating my ability to [Key Competence or Task Related to Job]. My experience in [Key Skill 3] has further equipped me with the ability to [Explain Relevance to Job], ensuring that I can contribute effectively to [Company Name] from day one.\n\nOne aspect of [Company Name] that particularly resonates with me is your commitment to [Company Value/Initiative], such as [Specific Company Project or Value]. I am impressed by your innovative approach to [Related Industry/Field] and your dedication to [Describe Specific Initiative or Mission]. This aligns with my own professional values and aspirations. I am eager to leverage my skills in [Related Field/Skill] to support your ongoing projects and contribute to [Company Name]'s future successes.\n\nI am particularly excited about the opportunity to work with a forward-thinking company like [Company Name], where I can bring my unique perspective and drive for excellence. I am confident that my background in [Your Field of Expertise] and my passion for [Related Skill/Industry] make me a valuable asset to your team. My goal is to help [Company Name] not only meet but exceed its objectives, ensuring sustained growth and innovation.\n\nThank you for considering my application for the [Job Title] position. I am eager to discuss how my skills and experiences align with the needs of your team and how I can contribute to [Company Name]'s continued success. I look forward to the possibility of speaking with you soon.",
        contactInfo: {
            email,
            phone,
            website,
        },
        customSectionArray: [],
    };
    return data;
};

export const initializeNewResume = (
    user: any,
    name: string,
    job: string,
    description: string
) => {
    const { basicInfo } = user;

    const imageUrl =
        basicInfo && basicInfo.imageUrl
            ? basicInfo.imageUrl
            : "/images/icons/default-profile-picture.svg";
    const experienceArray = basicInfo
        ? sortObjectArrayByDateEnd(basicInfo.work, basicInfo.workOrder)
        : [];
    const newExperienceArray =
        experienceArray.length === 0
            ? [
                  {
                      id: 1,
                      company: "Example Company",
                      position: "Example Position",
                      startDate: "2020-01-01",
                      endDate: "2023-01-01",
                      summary:
                          "Experienced professional with a strong background in example industry. Proven track record of delivering high-quality results and exceeding expectations. Skilled in problem-solving, communication, and teamwork.",
                      currentEmployment: false,
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
                  {
                      id: 2,
                      company: "Example Company 2",
                      position: "Example Position 2",
                      startDate: "2023-01-01",
                      endDate: "Present",
                      summary:
                          "Experienced professional with a strong background in example industry. Proven track record of delivering high-quality results and exceeding expectations. Skilled in problem-solving, communication, and teamwork.",
                      currentEmployment: true,
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
              ]
            : experienceArray.map((item) => {
                  return {
                      ...item,
                  };
              });
    const skillArray = basicInfo && basicInfo.skills ? basicInfo.skills : [];
    const newSkillArray =
        skillArray.length === 0
            ? ["Example Skill 1.", "Example Skill 2.", "Example Skill 3."]
            : skillArray.map((item: any) => {
                  return item.skill;
              });
    const projectArray =
        basicInfo && basicInfo.projects ? basicInfo.projects : [];
    const newProjectArray =
        projectArray.length === 0
            ? [
                  {
                      name: "Example Project Name",
                      demo: "https://example-demo-link.com",
                      source: "https://example-source-link.com",
                      summary: "Example summary.",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
                  {
                      name: "Example Project Name 2",
                      demo: "https://example-demo-link.com",
                      source: "https://example-source-link.com",
                      summary: "Example summary.",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
              ]
            : projectArray.map((item: any) => {
                  return {
                      name: item.title,
                      source: item.link,
                      demo: item.link,
                      summary: item.summary,
                      bullets: item.bullets,
                  };
              });

    const educationArray = basicInfo
        ? sortObjectArrayByDateEnd(
              basicInfo.education,
              basicInfo.educationOrder
          )
        : [];
    const newEducationArray =
        educationArray.length === 0
            ? [
                  {
                      id: 1,
                      currentEnrollment: false,
                      schoolName: "Example University",
                      degreeType: "Bachelor's Degree",
                      degreeField: "Business Administration",
                      startDate: "2016-01-01",
                      endDate: "2020-01-01",
                      gpa: "3.7",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  },
              ]
            : educationArray.map((item) => {
                  return {
                      ...item,
                      gpa: "3.7",
                      bullets: [
                          "Example bullet 1.",
                          "Example bullet 2.",
                          "Example bullet 3.",
                      ],
                  };
              });

    const first = basicInfo ? basicInfo.firstName : user.firstName;
    const last = basicInfo ? basicInfo.lastName : user.lastName;
    const email = basicInfo && basicInfo.email ? basicInfo.email : user.email;
    const phone =
        basicInfo && basicInfo.phone ? basicInfo.phone : "(123) 456-7890";
    const website =
        basicInfo && basicInfo.website
            ? basicInfo.website
            : "https://example-website.com";
    const data = {
        currentPage: 1,
        style: {
            baseFontSize: 12,
            baseMarginSize: 18,
            baseSectionGap: 16,
            backgroundColor: "#ffffff",
            textColor: "#000000",
            accentBackgroundColor: "#b5b357",
            accentTextColor: "white",
        },
        sectionEdit: {
            header: {
                fontRatio: 1,
                showPosition: true,
                showSummary: true,
                showSocial: true,
            },
            name: {
                fontRatio: 1,
                textAlignment: "center",
            },
            position: {
                fontRatio: 1,
                textAlignment: "center",
            },
            summary: {
                fontRatio: 1,
                textAlignment: "left",
            },
            contact: {
                fontRatio: 1,
                showEmail: true,
                showPhone: true,
                showWebsite: true,
                textAlignment: "left",
            },
            experience: {
                fontRatio: 1,
                dateFormat: "long",
                showStartDate: true,
                showSummary: true,
            },
            education: {
                fontRatio: 1,
                dateFormat: "long",
                showStartDate: true,
                showGpa: false,
                showBullets: true,
            },
            skills: {
                fontRatio: 1,
                textAlignment: "left",
            },
            languages: {
                fontRatio: 1,
                textAlignment: "left",
            },
            interests: {
                fontRatio: 1,
                textAlignment: "left",
            },
            projects: {
                fontRatio: 1,
                showSummary: true,
            },
        },
        documentName: name,
        jobTitle: job,
        description,
        template: "sharp",
        font: "Times-Roman",
        firstName: first,
        lastName: last,
        sectionOrder: [
            [
                "headerSharp",
                "summary",
                "experience",
                "educationDetailed",
                "skillsBullet",
                "languagesComma",
            ],
        ],
        numPages: 1,
        position: "Example Position",
        imageUrl,
        summary:
            "At Example Company, excelled in the role of Example Position, leveraging innovative strategies to drive impactful results. Demonstrated strong leadership and collaboration skills, contributing to the achievement of organizational objectives and fostering team success",
        summaryConfig: {
            fontSizeRatio: 1,
            isBold: false,
            isItalic: false,
            isUnderline: false,
            textColor: "#000000",
            sectionTitle: "Summary",
        },
        skillArray: newSkillArray,
        skillCategoryArray: [
            {
                category: "Example Category 1",
                skills: [
                    "Example Skill 1",
                    "Example Skill 2",
                    "Example Skill 3",
                ],
            },
            {
                category: "Example Category 2",
                skills: [
                    "Example Skill 1",
                    "Example Skill 2",
                    "Example Skill 3",
                ],
            },
        ],
        experienceArray: newExperienceArray,
        educationArray: newEducationArray,
        languageArray: ["langauge 1", "language 2", "language 3"],
        interestArray: ["interest 1", "interest 2", "interest 3"],
        contactInfo: {
            email,
            phone,
            website,
        },
        projectArray: newProjectArray,
        customSectionArray: [],
    };
    return data;
};
