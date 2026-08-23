import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { validateRequest } from "@/features/authentication/lib/auth";
import {
    aiPromptIds,
    createAICompletionRequest,
    type AIPromptId,
} from "@/features/editor/lib/ai";
import { buildAIMessages } from "@/features/editor/lib/aiPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const errorResponse = (message: string, status: number) =>
    Response.json({ error: message }, { status });

export async function POST(request: Request) {
    try {
        const { user } = await validateRequest();
        if (!user) return errorResponse("Unauthorized", 401);
        if (!process.env.OPEN_AI_API_KEY) {
            console.error("OPEN_AI_API_KEY is not set");
            return errorResponse("AI service is not configured", 503);
        }

        const body = await request.json();
        if (!body || !aiPromptIds.includes(body.promptId as AIPromptId)) {
            return errorResponse("Invalid AI request", 400);
        }

        const completionRequest = createAICompletionRequest({
            documentId: body.documentId,
            promptId: body.promptId,
            operation: body.operation === "enhance" ? "enhance" : "generate",
            desiredWords: Number(body.desiredWords),
            currentText: body.currentText,
            positionTitle: body.positionTitle,
            existingItems: body.existingItems,
        });

        if (!completionRequest.documentId) {
            return errorResponse("A document is required", 400);
        }
        if (
            completionRequest.operation === "enhance" &&
            !completionRequest.currentText
        ) {
            return errorResponse("Add some text before using Enhance", 400);
        }

        const [resume, coverLetter, currentUser] = await Promise.all([
            prisma.resume.findFirst({
                where: { id: completionRequest.documentId, userId: user.id },
                include: { job: true },
            }),
            prisma.coverLetter.findFirst({
                where: { id: completionRequest.documentId, userId: user.id },
                include: { job: true },
            }),
            prisma.user.findUnique({ where: { id: user.id } }),
        ]);

        const document = resume ?? coverLetter;
        if (!document || !currentUser) {
            return errorResponse("Document not found", 404);
        }

        const messages = buildAIMessages(completionRequest, {
            documentType: resume ? "resume" : "coverLetter",
            information: document.information as Record<string, any>,
            basicInfo: (currentUser.basicInfo ?? {}) as Record<string, any>,
            job: document.job as Record<string, any> | null,
        });

        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages,
            stream: true,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        const content = chunk.choices[0]?.delta?.content;
                        if (content) controller.enqueue(encoder.encode(content));
                    }
                    controller.close();
                } catch (error) {
                    console.error("Error streaming AI completion:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Error in /api/completion POST handler:", error);
        return errorResponse("An error occurred while processing the request", 500);
    }
}
