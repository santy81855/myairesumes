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
    "name",
    "position",
    "contact",
    "summary",
    "experience",
    "education",
    "skills",
    "languages",
    "interests",
    "projects",
    "namePositionVertical",
];

export const getReadableSectionName = (section: string) => {
    switch (section) {
        case "name":
            return "Name";
        case "position":
            return "Position";
        case "contact":
            return "Contact";
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
