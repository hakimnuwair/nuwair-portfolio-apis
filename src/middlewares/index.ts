// src/middlewares/index.ts — All Express middlewares

import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";
import { AuthRequest, JwtPayload } from "../types/index.js";
import { sendError } from "../utils/response.js";

// ─── Auth middleware ──────────────────────────────────────────────────────────

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    sendError(res, "Not authenticated", 401);
    return;
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.admin = decoded;
    next();
  } catch {
    sendError(res, "Invalid or expired token", 401);
  }
};

// ─── Zod validation middleware ────────────────────────────────────────────────

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      // Zod exposes validation problems as .issues (not .errors)
      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        errors[key] = issue.message;
      });
      sendError(res, "Validation failed", 422, errors);
      return;
    }
    req.body = result.data;
    next();
  };

// ─── Global error handler ─────────────────────────────────────────────────────

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("[Error]", err.message);
  sendError(res, err.message || "Internal server error", 500);
};

// ─── Not found handler ────────────────────────────────────────────────────────

export const notFound = (_req: Request, res: Response): void => {
  sendError(res, "Route not found", 404);
};

// ─── Rate limiters ────────────────────────────────────────────────────────────

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: "Too many requests, try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many contact submissions, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many auth attempts, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
