import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
        return new Response(JSON.stringify({ error: "No userId provided" }), {
            status: 400,
        });
    }
    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: userId,
            },
            include: {
                resume: true,
                coverLetter: true,
            },
        });
        return new Response(JSON.stringify(jobs), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
