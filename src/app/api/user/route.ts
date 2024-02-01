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
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return new Response(
                JSON.stringify({
                    error: "No user found.",
                }),
                { status: 404 }
            );
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
