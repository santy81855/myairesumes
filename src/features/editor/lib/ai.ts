export const aiPromptIds = [
    "summary",
    "experienceSummary",
    "experienceBullet",
    "skills",
    "skillCategory",
    "skillCategorySkill",
    "projectSummary",
    "body",
] as const;

export type AIPromptId = (typeof aiPromptIds)[number];
export type AIOperation = "generate" | "enhance";

export type AICompletionRequest = {
    documentId: string;
    promptId: AIPromptId;
    operation: AIOperation;
    desiredWords: number;
    currentText: string;
    positionTitle: string;
    existingItems: string[];
};

const cleanText = (value: unknown, maxLength: number) =>
    typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const createAICompletionRequest = (data: {
    documentId: unknown;
    promptId: string;
    operation: AIOperation;
    desiredWords: number;
    currentText?: unknown;
    positionTitle?: unknown;
    existingItems?: unknown[];
}): AICompletionRequest => {
    if (!aiPromptIds.includes(data.promptId as AIPromptId)) {
        throw new Error("Unsupported AI prompt type");
    }

    return {
        documentId: cleanText(data.documentId, 128),
        promptId: data.promptId as AIPromptId,
        operation: data.operation,
        desiredWords: Math.min(Math.max(Math.round(data.desiredWords), 1), 600),
        currentText: cleanText(data.currentText, 8000),
        positionTitle: cleanText(data.positionTitle, 200),
        existingItems: Array.isArray(data.existingItems)
            ? data.existingItems
                  .map((item) => cleanText(item, 500))
                  .filter(Boolean)
                  .slice(0, 30)
            : [],
    };
};
