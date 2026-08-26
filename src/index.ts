// src/index.ts — Local server entry point.
// Only used for `npm run dev` / `npm start` on your own machine. Vercel
// deploys use api/index.ts instead, which imports the same app from
// ./app.ts but never calls .listen() — see that file for why.

import { config } from "./config/env.js";
import { connectDB } from "./config/database.js";
import app from "./app.js";

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
  });
};

start();
