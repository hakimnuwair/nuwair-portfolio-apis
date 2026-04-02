// src/services/index.ts — All business logic services

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/env";
import { Profile, Skill, Project, Experience, Contact } from "../models";
import {
  ProfileDocument, SkillDocument, ProjectDocument,
  ExperienceDocument, ContactDocument,
} from "../types";

// ─── Auth service ─────────────────────────────────────────────────────────────

export const authService = {
  login: async (email: string, password: string): Promise<string> => {
    if (
      email !== config.adminEmail ||
      !bcrypt.compareSync(password, bcrypt.hashSync(config.adminPassword, 10))
    ) {
      // Compare directly for simplicity (no user doc needed for single-admin)
      if (email !== config.adminEmail || password !== config.adminPassword) {
        throw new Error("Invalid credentials");
      }
    }
    return jwt.sign(
      { id: "admin", email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn } as jwt.SignOptions,
    );
  },
};

// ─── Profile service ──────────────────────────────────────────────────────────

export const profileService = {
  get: async (): Promise<ProfileDocument | null> =>
    Profile.findOne().lean() as Promise<ProfileDocument | null>,

  upsert: async (data: Partial<ProfileDocument>): Promise<ProfileDocument> => {
    const existing = await Profile.findOne();
    if (existing) {
      return Profile.findByIdAndUpdate(existing._id, data, { new: true, runValidators: true })
        .lean() as Promise<ProfileDocument>;
    }
    return Profile.create(data) as Promise<ProfileDocument>;
  },
};

// ─── Skill service ────────────────────────────────────────────────────────────

export const skillService = {
  getAll: async (): Promise<SkillDocument[]> =>
    Skill.find({ isVisible: true }).sort({ order: 1 }).lean() as Promise<SkillDocument[]>,

  getAllAdmin: async (): Promise<SkillDocument[]> =>
    Skill.find().sort({ order: 1 }).lean() as Promise<SkillDocument[]>,

  create: async (data: Partial<SkillDocument>): Promise<SkillDocument> =>
    Skill.create(data) as Promise<SkillDocument>,

  update: async (id: string, data: Partial<SkillDocument>): Promise<SkillDocument | null> =>
    Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean() as Promise<SkillDocument | null>,

  delete: async (id: string): Promise<boolean> => {
    const result = await Skill.findByIdAndDelete(id);
    return !!result;
  },
};

// ─── Project service ──────────────────────────────────────────────────────────

export const projectService = {
  getAll: async (): Promise<ProjectDocument[]> =>
    Project.find({ isVisible: true }).sort({ order: 1 }).lean() as Promise<ProjectDocument[]>,

  getAllAdmin: async (): Promise<ProjectDocument[]> =>
    Project.find().sort({ order: 1 }).lean() as Promise<ProjectDocument[]>,

  getById: async (id: string): Promise<ProjectDocument | null> =>
    Project.findById(id).lean() as Promise<ProjectDocument | null>,

  create: async (data: Partial<ProjectDocument>): Promise<ProjectDocument> =>
    Project.create(data) as Promise<ProjectDocument>,

  update: async (id: string, data: Partial<ProjectDocument>): Promise<ProjectDocument | null> =>
    Project.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean() as Promise<ProjectDocument | null>,

  delete: async (id: string): Promise<boolean> => {
    const result = await Project.findByIdAndDelete(id);
    return !!result;
  },
};

// ─── Experience service ───────────────────────────────────────────────────────

export const experienceService = {
  getAll: async (): Promise<ExperienceDocument[]> =>
    Experience.find({ isVisible: true }).sort({ order: 1 }).lean() as Promise<ExperienceDocument[]>,

  getAllAdmin: async (): Promise<ExperienceDocument[]> =>
    Experience.find().sort({ order: 1 }).lean() as Promise<ExperienceDocument[]>,

  create: async (data: Partial<ExperienceDocument>): Promise<ExperienceDocument> =>
    Experience.create(data) as Promise<ExperienceDocument>,

  update: async (id: string, data: Partial<ExperienceDocument>): Promise<ExperienceDocument | null> =>
    Experience.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean() as Promise<ExperienceDocument | null>,

  delete: async (id: string): Promise<boolean> => {
    const result = await Experience.findByIdAndDelete(id);
    return !!result;
  },
};

// ─── Contact service ──────────────────────────────────────────────────────────

export const contactService = {
  submit: async (data: Partial<ContactDocument>): Promise<ContactDocument> =>
    Contact.create(data) as Promise<ContactDocument>,

  getAll: async (): Promise<ContactDocument[]> =>
    Contact.find().sort({ createdAt: -1 }).lean() as Promise<ContactDocument[]>,

  updateStatus: async (id: string, status: ContactDocument["status"]): Promise<ContactDocument | null> =>
    Contact.findByIdAndUpdate(id, { status }, { new: true })
      .lean() as Promise<ContactDocument | null>,

  delete: async (id: string): Promise<boolean> => {
    const result = await Contact.findByIdAndDelete(id);
    return !!result;
  },
};
