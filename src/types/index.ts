// src/types/index.ts — Centralized backend types

import { Request } from "express";
import { Document, Types } from "mongoose";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  admin?: JwtPayload;
}

export interface LoginBody {
  email: string;
  password: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ProfileDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: SocialLink[];
  isAvailable: boolean;
  updatedAt: Date;
  createdAt: Date;
}

// ─── Skill ────────────────────────────────────────────────────────────────────

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  category: string;
  level: SkillLevel;
  iconUrl?: string;
  order: number;
  isVisible: boolean;
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface ProjectDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  isFeatured: boolean;
  order: number;
  isVisible: boolean;
  createdAt: Date;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceDocument extends Document {
  _id: Types.ObjectId;
  company: string;
  role: string;
  duration: string;
  description: string;
  techStack: string[];
  isCurrent: boolean;
  order: number;
  isVisible: boolean;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export type ContactStatus = "unread" | "read" | "replied";

export interface ContactDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiSuccess<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

// ─── Config ───────────────────────────────────────────────────────────────────

export interface AppConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  adminEmail: string;
  adminPassword: string;
  corsOrigin: string;
}
