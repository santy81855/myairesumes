export const getPropmt = (data: {
    sectionId: string;
    document: any;
    generate: boolean;
    enhance: boolean;
}) => {
    const { sectionId, document, generate, enhance } = data;
    let lowerCaseSectionId = sectionId.toLowerCase();
    let jobTitle = document?.information.jobTitle;
    switch (true) {
        case lowerCaseSectionId.includes("summary"):
            return `Write a summary section for a ${jobTitle} resume. Ensure that it is targeted to the job's industry and role and that it does not sound obviously generated by an AI. Ensure it is about 50 words long.`;
        case lowerCaseSectionId.includes("experience"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("education"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("skills"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("languages"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("interests"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("projects"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("contact"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("header"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("name"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("position"):
            return `Write a short general resume summary.`;
        case lowerCaseSectionId.includes("cover"):
            return `Write a short general resume summary.`;
        default:
            return `Write a short general resume summary.`;
    }
};
