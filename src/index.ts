// src/index.ts — Application entry point

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env";
import { connectDB } from "./config/database";
import { generalLimiter, errorHandler, notFound } from "./middlewares";
import routes from "./routes";

const app = express();

// ─── Security & parsing middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging (dev only) ───────────────────────────────────────────────────────
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
app.use("/api", generalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1", routes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Portfolio API is running", env: config.nodeEnv });
});

// ─── Error handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
const start = async (): Promise<void> => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
  });
};

start();
