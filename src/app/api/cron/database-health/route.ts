import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    const headers = { "Cache-Control": "no-store" };

    if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
        return Response.json({ error: "Unauthorized" }, { status: 401, headers });
    }

    try {
        // Separate queries generate daily database activity without reading user data.
        for (let query = 0; query < 3; query++) {
            await prisma.$queryRaw`SELECT 1`;
        }

        console.info("Database health check succeeded");
        return Response.json({ success: true }, { headers });
    } catch {
        console.error("Database health check failed");
        return Response.json(
            { error: "Database health check failed" },
            { status: 503, headers }
        );
    }
}
