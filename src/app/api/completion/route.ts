if (!process.env.OPEN_AI_API_KEY) {
    throw new Error("OPEN_AI_API_KEY is not set");
}
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { sectionId, document, generate, enhance } = await request.json();
        const data = { sectionId, document, generate, enhance };

        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert resume writer and career coach, and you are writing sections of a resume for a client.",
                },
                {
                    role: "user",
                    content:
                        "write a summary section for a generic resume. 30 words.",
                },
            ],
            model: "gpt-3.5-turbo",
            stream: true,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error("Error in /api/completion POST handler:", error);
        return new Response(
            JSON.stringify({
                error: "An error occurred while processing the request",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
