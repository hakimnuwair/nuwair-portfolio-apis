// api/index.ts — Vercel serverless entry point.
//
// An Express app is just a (req, res) => void function under the hood,
// which is exactly what Vercel's Node.js runtime expects — so exporting it
// directly here is enough. All the actual setup (middleware, routes, the
// DB-connect-before-each-request step) lives in src/app.ts, unchanged from
// what runs locally.
import app from "../src/app.js";

export default app;
