// src/config/database.ts
import mongoose from "mongoose";
import { config } from "./env.js";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cached across invocations on the same serverless instance (and across
// hot-reloads in local dev) — reuses one connection instead of opening a
// fresh one per request. A traditional always-running server only needs to
// connect once at startup; a serverless function has no "once at startup",
// so this cache is what makes repeated invocations cheap.
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(config.mongoUri).then((m) => {
      console.log("✅ MongoDB connected");
      return m;
    });
  }
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    // Let the caller decide what to do — process.exit() here would be
    // fine for a traditional server but would be dangerous in serverless,
    // where a shared runtime instance could be handling other requests.
    cache.promise = null;
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
  return cache.conn;
};
