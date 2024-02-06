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
        const subscription = await prisma.subscription.findFirst({
            where: {
                userId,
            },
        });
        if (!subscription) {
            return new Response(
                JSON.stringify({
                    error: "No subscription found for this user",
                }),
                { status: 404 }
            );
        }
        return new Response(JSON.stringify(subscription), { status: 200 });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
