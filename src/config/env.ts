// src/config/env.ts
import "dotenv/config";
import { AppConfig } from "../types/index.js";

const required = (key: string): string => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
};

export const config: AppConfig = {
  port: parseInt(process.env.PORT ?? "5000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  adminEmail: required("ADMIN_EMAIL"),
  adminPassword: required("ADMIN_PASSWORD"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
