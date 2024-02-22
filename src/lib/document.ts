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

/*
    const getSectionDownload = (id: string) => {
        switch (id) {
            case "namePositionVertical":
                return namePositionSectionVertical;
            case "name":
                return nameSection;
            case "position":
                return positionSection;
            case "contact":
                return contactSection;
            case "contactEmailPhoneWebsite":
                return contactEmailPhoneWebsiteSection;
            case "contactEmailPhone":
                return contactEmailPhoneSection;
            case "contactEmailWebsite":
                return contactEmailWebsiteSection;
            case "contactPhoneWebsite":
                return contactPhoneWebsiteSection;
            case "summary":
                return summarySection;
            case "skills":
                return skillSection;
            case "experience":
                return experienceSection;
            case "education":
                return educationSection;
            case "languages":
                return languageSection;
            case "interests":
                return interestSection;
            case "projects":
                return projectSection;
            default:
                return null;
        }
    };
*/

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
    "languages",
    "interests",
    "projects",
];

export const getReadableSectionName = (section: string) => {
    switch (section) {
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
        case "languages":
            return "Languages";
        case "interests":
            return "Interests";
        case "projects":
            return "Projects";
        case "namePositionVertical":
            return "Name & Position";
        default:
            return "";
    }
};

export const sectionKeywords = {
    name: ["name", "first", "last"],
    position: ["position", "job", "title"],
    contact: ["contact", "email", "phone", "website", "information"],
    contactEmailPhoneWebsite: ["contact", "email", "phone", "website"],
    contactEmailPhone: ["contact", "email", "phone"],
    contactEmailWebsite: ["contact", "email", "website"],
    contactPhoneWebsite: ["contact", "phone", "website"],
    summary: ["summary", "description", "about", "objective", "bio", "me"],
    experience: [
        "experience",
        "work",
        "job",
        "career",
        "professional",
        "employment",
        "history",
    ],
    education: ["education", "school", "degree", "academic", "history"],
    skills: ["skills", "skill"],
    languages: ["languages", "language"],
    interests: ["interests", "interest", "hobbies", "hobby"],
    projects: ["projects", "project", "portfolio", "work", "assignments"],
    namePositionVertical: ["name", "position", "job", "title", "first", "last"],
};
