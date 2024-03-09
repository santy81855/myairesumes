const getGeneratePrompt = (
    document: any,
    promptId: string,
    jobTitle: string,
    length: number,
    positionTitle: string,
    array: any[]
) => {
    /*
You are applying for the position of [Job Title] at [Company Name]. Write a summary that highlights your qualifications, skills, and experiences relevant to this role. Be concise and focus on showcasing your ability to contribute effectively to the company's objectives.

*/
    console.log(array);
    const promptStart = `You are applying for the position of ${jobTitle}.`;
    const promptEnd = `Ensure that it is ${length} words long and targeted to this job's industry and role and that it is professional but does not sound obviously generated by an AI. Don't add any symbols or quotation marks.`;
    const promptEndCategory = `Ensure that it is at most ${length} words long and targeted to this job's industry and role and that it is professional but does not sound obviously generated by an AI. Don't add any symbols or quotation marks.`;
    switch (promptId) {
        case "summary":
            return `${promptStart} Write a summary section for a ${jobTitle} resume. ${promptEnd}`;
        case "experienceSummary":
            return `${promptStart} Write a highlight summary for the role of ${positionTitle}. Incorporate good key responsibilities as well as quantifiable achievements. ${promptEnd}`;
        case "experienceBullet":
            return `${promptStart} Write a bullet point for the experience section of the role of ${positionTitle}. The current bullet points are ${array.join(
                ", "
            )}Incorporate good key responsibilities as well as quantifiable achievements. ${promptEnd}`;
        case "skills":
            return `${promptStart} Write a professional skill for a ${jobTitle} resume. The current skills are ${array.join(
                ", "
            )}, so don't repeat any. ${promptEnd}`;
        case "skillCategory":
            return `${promptStart} Write only a skill category for a ${jobTitle} resume. This should be a category that can have a subset of skills that fall into it. The current categories are ${array
                .map((obj) => obj.category)
                .join(", ")}, so don't repeat any. ${promptEndCategory}`;
        case "projects":
            return `Write a short general resume summary.`;
        default:
            return "";
    }
};

const getEnhancePrompt = (
    document: any,
    promptId: string,
    jobTitle: string,
    length: number,
    currentText: string,
    positionTitle: string,
    array: any[]
) => {
    const promptStart = `You are applying for the position of ${jobTitle}.`;
    const promptEnd = `Ensure that it is ${length} words long and targeted to this job's industry and role and that it is professional but does not sound obviously generated by an AI. Don't add any symbols or quotation marks.`;
    switch (promptId) {
        case "summary":
            return `${promptStart} Enhance the following resume summary: ${currentText} ${promptEnd}`;
        case "experienceSummary":
            return `${promptStart} Enhance the following highlight summary for the role of ${positionTitle}: ${currentText}. Incorporate good key responsibilities as well as quantifiable achievements. ${promptEnd}`;
        case "experienceBullet":
            return `${promptStart} Enhance the following bullet point for the experience section of the role of ${positionTitle}: ${currentText}. Incorporate good key responsibilities as well as quantifiable achievements. ${promptEnd}`;
        case "skills":
            return `${promptStart} Enhance the following skill for a ${jobTitle} resume: ${currentText}. The current skills are ${array.join(
                ", "
            )}, so don't repeat any. ${promptEnd}`;
        case "projects":
            return `Enhance the projects section for a ${jobTitle} resume. Ensure that it is ${length} words long and targeted to this job's industry and role and that it does not sound obviously generated by an AI.`;
        default:
            return "";
    }
};

export const getPrompt = (data: {
    promptId: string;
    document: any;
    generate: boolean;
    enhance: boolean;
    length: number;
    positionTitle: string;
    array: any[];
    currentText?: string;
}) => {
    const {
        promptId,
        document,
        generate,
        enhance,
        length,
        positionTitle,
        array,
    } = data;
    let jobTitle = document?.information.jobTitle;
    if (generate) {
        return getGeneratePrompt(
            document,
            promptId,
            jobTitle,
            length,
            positionTitle,
            array
        );
    } else if (enhance && data.currentText) {
        return getEnhancePrompt(
            document,
            promptId,
            jobTitle,
            length,
            data.currentText,
            positionTitle,
            array
        );
    }
};
