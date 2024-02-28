import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const resumeId = searchParams.get("resumeId");
    if (!userId) {
        return new Response(JSON.stringify({ error: "No userId provided" }), {
            status: 400,
        });
    }
    if (!resumeId) {
        return new Response(JSON.stringify({ error: "No resumeId provided" }), {
            status: 400,
        });
    }
    try {
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
            },
        });
        if (!resume) {
            return new Response(
                JSON.stringify({
                    error: "No resume found.",
                }),
                { status: 404 }
            );
        }
        if (resume.userId !== userId) {
            return new Response(
                JSON.stringify({
                    error: "Unauthorized",
                }),
                { status: 401 }
            );
        }
        return new Response(JSON.stringify(resume), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
