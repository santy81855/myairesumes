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

export const allSections = [
    "namePositionVertical",
    "name",
    "position",
    "contact",
    "contactEmailPhoneWebsite",
    "contactEmailPhone",
    "contactEmailWebsite",
    "contactPhoneWebsite",
    "summary",
    "experience",
    "education",
    "skills",
    "shortSkills",
    "languages",
    "interests",
    "projects",
];

export const getReadableSectionName = (section: string) => {
    switch (section) {
        case "namePositionVertical":
            return "Name & Position";
        case "name":
            return "Name";
        case "position":
            return "Position";
        case "contact":
            return "Contact";
        case "contactEmailPhoneWebsite":
            return "Contact: Email, Phone, Website";
        case "contactEmailPhone":
            return "Contact: Email, Phone";
        case "contactEmailWebsite":
            return "Contact: Email, Website";
        case "contactPhoneWebsite":
            return "Contact: Phone, Website";
        case "summary":
            return "Summary";
        case "experience":
            return "Experience";
        case "education":
            return "Education";
        case "skills":
            return "Skills";
        case "shortSkills":
            return "Short Skills";
        case "languages":
            return "Languages";
        case "interests":
            return "Interests";
        case "projects":
            return "Projects";
        default:
            return "";
    }
};

/**
 * sectionInformationArray is an array of objects that contain the section name, section id, section description, and an array of the key words that are associated with the section.
 */

export const sectionInformationArray = [
    {
        id: "name",
        name: "Bold Name",
        description: "Your full name",
        keyWords: ["name", "first", "last"],
    },
    {
        id: "position",
        name: "Position",
        description: "Your job title",
        keyWords: ["position", "job", "title"],
    },
    {
        id: "contact",
        name: "Contact",
        description: "Your contact information",
        keyWords: ["contact", "email", "phone", "website", "information"],
    },
    {
        id: "contactEmailPhoneWebsite",
        name: "Contact: Email, Phone, Website",
        description: "Your email, phone number, and website",
        keyWords: ["contact", "email", "phone", "website"],
    },
    {
        id: "contactEmailPhone",
        name: "Contact: Email, Phone",
        description: "Your email and phone number",
        keyWords: ["contact", "email", "phone"],
    },
    {
        id: "contactEmailWebsite",
        name: "Contact: Email, Website",
        description: "Your email and website",
        keyWords: ["contact", "email", "website"],
    },
    {
        id: "contactPhoneWebsite",
        name: "Contact: Phone, Website",
        description: "Your phone number and website",
        keyWords: ["contact", "phone", "website"],
    },
    {
        id: "summary",
        name: "Summary",
        description:
            "A brief summary of yourself, like a bio or objective statement.",
        keyWords: ["summary", "description", "about", "objective", "bio", "me"],
    },
    {
        id: "experience",
        name: "Experience",
        description: "Your previous employment history.",
        keyWords: [
            "experience",
            "work",
            "job",
            "career",
            "professional",
            "employment",
            "history",
        ],
    },
    {
        id: "education",
        name: "Education",
        description: "Your academic history.",
        keyWords: ["education", "school", "degree", "academic", "history"],
    },
    {
        id: "skills",
        name: "Skills",
        description: "Your skills in a bullet point list.",
        keyWords: ["skills", "skill"],
    },
    {
        id: "shortSkills",
        name: "Short Skills",
        description: "Your skills in a comma separated list.",
        keyWords: ["skills", "skill", "short"],
    },
    {
        id: "languages",
        name: "Languages",
        description: "Your languages in a comma separated list.",
        keyWords: ["languages", "language"],
    },
    {
        id: "interests",
        name: "Interests",
        description: "Your interests in a comma separated list.",
        keyWords: ["interests", "interest", "hobbies", "hobby"],
    },
    {
        id: "projects",
        name: "Projects",
        description: "Your projects",
        keyWords: ["projects", "project", "portfolio", "work", "assignments"],
    },
    {
        id: "namePositionVertical",
        name: "Name & Position",
        description: "Your full name and job title together.",
        keyWords: ["name", "position", "job", "title", "first", "last"],
    },
];
