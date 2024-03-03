import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const coverLetterId = searchParams.get("coverLetterId");
    if (!userId) {
        return new Response(JSON.stringify({ error: "No userId provided" }), {
            status: 400,
        });
    }
    if (!coverLetterId) {
        return new Response(JSON.stringify({ error: "No resumeId provided" }), {
            status: 400,
        });
    }
    try {
        const coverLetter = await prisma.coverLetter.findFirst({
            where: {
                id: coverLetterId,
            },
        });
        if (!coverLetter) {
            return new Response(
                JSON.stringify({
                    error: "No cover letter found.",
                }),
                { status: 404 }
            );
        }
        if (coverLetter.userId !== userId) {
            return new Response(
                JSON.stringify({
                    error: "Unauthorized",
                }),
                { status: 401 }
            );
        }
        return new Response(JSON.stringify(coverLetter), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
