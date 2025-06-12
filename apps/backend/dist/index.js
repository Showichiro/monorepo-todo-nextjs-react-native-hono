import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { generateArray } from "@monorepo-todo/utils/array";
const app = new Hono();
const route = app.get("/", (c) => {
    const array = generateArray(function* () {
        yield 1;
        yield* [2, 3];
    });
    return c.json(array);
});
serve({
    fetch: app.fetch,
    port: 3100,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
