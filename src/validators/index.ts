// src/validators/index.ts — All Zod schemas for request validation

import { z } from "zod";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email:    z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});

// ─── Profile ─────────────────────────────────────────────────────────────────

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url:      z.string().url("Must be a valid URL"),
  icon:     z.string().optional(),
});

export const profileSchema = z.object({
  name:        z.string().min(1, "Name required").max(100),
  title:       z.string().min(1, "Title required").max(150),
  tagline:     z.string().max(200).optional().default(""),
  bio:         z.string().max(2000),
  email:       z.string().email("Valid email required"),
  location:    z.string().max(100).optional().default(""),
  avatarUrl:   z.string().url().optional().or(z.literal("")),
  resumeUrl:   z.string().url().optional().or(z.literal("")),
  socials:     z.array(socialLinkSchema).optional().default([]),
  isAvailable: z.boolean().optional().default(true),
});

export const profileUpdateSchema = profileSchema.partial();

// ─── Skill ────────────────────────────────────────────────────────────────────

export const skillSchema = z.object({
  name:      z.string().min(1, "Skill name required").max(50),
  category:  z.string().min(1, "Category required").max(50),
  level:     z.enum(["beginner", "intermediate", "advanced", "expert"]),
  iconUrl:   z.string().url().optional().or(z.literal("")),
  order:     z.number().int().min(0).optional().default(0),
  isVisible: z.boolean().optional().default(true),
});

export const skillUpdateSchema = skillSchema.partial();

// ─── Project ─────────────────────────────────────────────────────────────────

export const projectSchema = z.object({
  title:           z.string().min(1, "Title required").max(150),
  description:     z.string().min(1, "Description required").max(300),
  longDescription: z.string().max(2000).optional().default(""),
  techStack:       z.array(z.string().min(1)).min(1, "At least one tech required"),
  imageUrl:        z.string().url().optional().or(z.literal("")),
  liveUrl:         z.string().url().optional().or(z.literal("")),
  repoUrl:         z.string().url().optional().or(z.literal("")),
  isFeatured:      z.boolean().optional().default(false),
  order:           z.number().int().min(0).optional().default(0),
  isVisible:       z.boolean().optional().default(true),
});

export const projectUpdateSchema = projectSchema.partial();

// ─── Experience ───────────────────────────────────────────────────────────────

export const experienceSchema = z.object({
  company:     z.string().min(1, "Company required").max(100),
  role:        z.string().min(1, "Role required").max(150),
  duration:    z.string().min(1, "Duration required").max(50),
  description: z.string().min(1, "Description required").max(1000),
  techStack:   z.array(z.string()).optional().default([]),
  isCurrent:   z.boolean().optional().default(false),
  order:       z.number().int().min(0).optional().default(0),
  isVisible:   z.boolean().optional().default(true),
});

export const experienceUpdateSchema = experienceSchema.partial();

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name:    z.string().min(1, "Name required").max(100),
  email:   z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject required").max(200),
  message: z.string().min(10, "Message too short").max(2000),
});

export const contactStatusSchema = z.object({
  status: z.enum(["unread", "read", "replied"]),
});
