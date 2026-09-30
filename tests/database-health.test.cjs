const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(
    readFileSync("src/app/api/cron/database-health/route.ts", "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
).outputText;

function loadRoute(secret, queryRaw = async () => [{ "?column?": 1 }]) {
    const queries = [];
    const logs = [];
    const context = {
        exports: {},
        Response,
        process: { env: { CRON_SECRET: secret } },
        console: {
            info: (message) => logs.push(message),
            error: (message) => logs.push(message),
        },
        require: (name) => {
            assert.equal(name, "@/lib/prisma");
            return {
                prisma: {
                    $queryRaw: async (...args) => {
                        queries.push(args);
                        return queryRaw(...args);
                    },
                },
            };
        },
    };
    vm.runInNewContext(source, context);
    return { ...context.exports, queries, logs };
}

function request(authorization) {
    return new Request("https://example.com/api/cron/database-health", {
        headers: authorization ? { authorization } : {},
    });
}

test("missing configuration and invalid credentials never query the database", async () => {
    for (const [secret, authorization] of [
        [undefined, "Bearer undefined"],
        ["", "Bearer "],
        ["test-secret", undefined],
        ["test-secret", "Bearer wrong"],
    ]) {
        const route = loadRoute(secret);
        const response = await route.GET(request(authorization));
        assert.equal(response.status, 401);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(route.queries.length, 0);
    }
});

test("authorized checks execute three read-only queries and log success", async () => {
    const route = loadRoute("test-secret");
    const response = await route.GET(request("Bearer test-secret"));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(route.queries.length, 3);
    for (const [sql, ...parameters] of route.queries) {
        assert.equal(sql.join(""), "SELECT 1");
        assert.equal(parameters.length, 0);
    }
    assert.deepEqual(route.logs, ["Database health check succeeded"]);
    assert.equal(route.dynamic, "force-dynamic");
});

test("database failures return 503 without disclosing connection details", async () => {
    const route = loadRoute("test-secret", async () => {
        throw new Error("postgresql://private-credentials");
    });
    const response = await route.GET(request("Bearer test-secret"));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: "Database health check failed" });
    assert.equal(route.queries.length, 1);
    assert.deepEqual(route.logs, ["Database health check failed"]);
});

test("Vercel schedules the endpoint once daily", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8"));
    assert.deepEqual(config.crons, [
        { path: "/api/cron/database-health", schedule: "0 12 * * *" },
    ]);
});
