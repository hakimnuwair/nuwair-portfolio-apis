// src/models/index.ts — All Mongoose models

import { Schema, model } from "mongoose";
import {
  ProfileDocument,
  SkillDocument,
  ProjectDocument,
  ExperienceDocument,
  ContactDocument,
} from "../types/index.js";

// ─── Profile ─────────────────────────────────────────────────────────────────

const socialLinkSchema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { _id: false },
);

const profileSchema = new Schema<ProfileDocument>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    email: { type: String, required: true },
    location: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    socials: { type: [socialLinkSchema], default: [] },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Skill ────────────────────────────────────────────────────────────────────

const skillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      required: true,
    },
    iconUrl: { type: String, default: "" },
    order: { type: Number, default: 0 }, // order WITHIN a category
    categoryOrder: { type: Number, default: 0 }, // order OF the category itself  ← NEW
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

skillSchema.index({ categoryOrder: 1, order: 1 });

// ─── Project ─────────────────────────────────────────────────────────────────

const keyDecisionSchema = new Schema(
  {
    title: { type: String, required: true },
    detail: { type: String, default: "" },
    relatedNodeId: { type: String, default: "" },
  },
  { _id: false },
);

const impactMetricSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const diagramNodeSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    kind: { type: String, default: "" },
  },
  { _id: false },
);

const diagramEdgeSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    label: { type: String, default: "" },
  },
  { _id: false },
);

const architectureSectionSchema = new Schema(
  {
    title: { type: String, required: true },
    points: { type: [String], default: [] },
  },
  { _id: false },
);

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    repoUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    // Case-study content — all optional/additive, populated per project via admin.
    // Rendering order on /work/:id follows a product-first, engineering-second
    // structure: highlights (scannable, non-technical) before architecture
    // (technical depth) before decisions (trade-offs).
    highlights: { type: [String], default: [] },
    architectureNotes: { type: String, default: "" },
    architectureSections: { type: [architectureSectionSchema], default: [] },
    keyDecisions: { type: [keyDecisionSchema], default: [] },
    impactMetrics: { type: [impactMetricSchema], default: [] },
    diagramNodes: { type: [diagramNodeSchema], default: [] },
    diagramEdges: { type: [diagramEdgeSchema], default: [] },
  },
  { timestamps: true },
);

projectSchema.index({ isFeatured: 1, order: 1 });

// ─── Experience ───────────────────────────────────────────────────────────────

const experienceSchema = new Schema<ExperienceDocument>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    isCurrent: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    // Structured content — same product-first, progressive-disclosure policy as
    // Project case studies. All optional/additive; falls back to `description`
    // when absent.
    purpose: { type: String, default: "" },
    keyContributions: { type: [String], default: [] },
    impactOutcomes: { type: [impactMetricSchema], default: [] },
    technicalResponsibilities: { type: [String], default: [] },
    engineeringHighlights: { type: [String], default: [] },
  },
  { timestamps: true },
);

// ─── Contact ─────────────────────────────────────────────────────────────────

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  { timestamps: true },
);

// ─── Exports ──────────────────────────────────────────────────────────────────

export const Profile = model<ProfileDocument>("Profile", profileSchema);
export const Skill = model<SkillDocument>("Skill", skillSchema);
export const Project = model<ProjectDocument>("Project", projectSchema);
export const Experience = model<ExperienceDocument>(
  "Experience",
  experienceSchema,
);
export const Contact = model<ContactDocument>("Contact", contactSchema);
