// src/models/index.ts — All Mongoose models

import { Schema, model } from "mongoose";
import {
  ProfileDocument, SkillDocument, ProjectDocument,
  ExperienceDocument, ContactDocument,
} from "../types";

// ─── Profile ─────────────────────────────────────────────────────────────────

const socialLinkSchema = new Schema({
  platform: { type: String, required: true },
  url:      { type: String, required: true },
  icon:     { type: String, default: "" },
}, { _id: false });

const profileSchema = new Schema<ProfileDocument>({
  name:        { type: String, required: true },
  title:       { type: String, required: true },
  tagline:     { type: String, default: "" },
  bio:         { type: String, default: "" },
  email:       { type: String, required: true },
  location:    { type: String, default: "" },
  avatarUrl:   { type: String, default: "" },
  resumeUrl:   { type: String, default: "" },
  socials:     { type: [socialLinkSchema], default: [] },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

// ─── Skill ────────────────────────────────────────────────────────────────────

const skillSchema = new Schema<SkillDocument>({
  name:      { type: String, required: true },
  category:  { type: String, required: true },
  level:     { type: String, enum: ["beginner", "intermediate", "advanced", "expert"], required: true },
  iconUrl:   { type: String, default: "" },
  order:     { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

skillSchema.index({ category: 1, order: 1 });

// ─── Project ─────────────────────────────────────────────────────────────────

const projectSchema = new Schema<ProjectDocument>({
  title:           { type: String, required: true },
  description:     { type: String, required: true },
  longDescription: { type: String, default: "" },
  techStack:       { type: [String], default: [] },
  imageUrl:        { type: String, default: "" },
  liveUrl:         { type: String, default: "" },
  repoUrl:         { type: String, default: "" },
  isFeatured:      { type: Boolean, default: false },
  order:           { type: Number, default: 0 },
  isVisible:       { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.index({ isFeatured: 1, order: 1 });

// ─── Experience ───────────────────────────────────────────────────────────────

const experienceSchema = new Schema<ExperienceDocument>({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  duration:    { type: String, required: true },
  description: { type: String, required: true },
  techStack:   { type: [String], default: [] },
  isCurrent:   { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  isVisible:   { type: Boolean, default: true },
}, { timestamps: true });

// ─── Contact ─────────────────────────────────────────────────────────────────

const contactSchema = new Schema<ContactDocument>({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status:  { type: String, enum: ["unread", "read", "replied"], default: "unread" },
}, { timestamps: true });

// ─── Exports ──────────────────────────────────────────────────────────────────

export const Profile    = model<ProfileDocument>("Profile", profileSchema);
export const Skill      = model<SkillDocument>("Skill", skillSchema);
export const Project    = model<ProjectDocument>("Project", projectSchema);
export const Experience = model<ExperienceDocument>("Experience", experienceSchema);
export const Contact    = model<ContactDocument>("Contact", contactSchema);
