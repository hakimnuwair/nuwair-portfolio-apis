// src/app.ts — Express application setup.
// Just builds and exports `app` — no .listen(), no top-level connectDB().
// src/index.ts (local dev) and api/index.ts (Vercel) each decide how to run it.

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { generalLimiter, errorHandler, notFound } from "./middlewares/index.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", 1);

// ─── Security & parsing middleware ────────────────────────────────────────────
app.use(helmet());
// app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

console.log("corsorgin: ", config.corsOrigin);

// ─── Logging (dev only) ───────────────────────────────────────────────────────
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ─── Ensure the DB is connected before any route runs. Cheap no-op once the
// connection is already cached (see config/database.ts). ─────────────────────
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(503).json({ success: false, message: "Database unavailable" });
  }
});

// ─── Rate limiting ────────────────────────────────────────────────────────────
app.use("/api", generalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1", routes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
    env: config.nodeEnv,
  });
});

// ─── Error handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
