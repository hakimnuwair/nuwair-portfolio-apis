// src/controllers/index.ts — All route controllers

import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/index.js";
import {
  authService,
  profileService,
  skillService,
  projectService,
  experienceService,
  contactService,
} from "../services/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

// ─── Auth controller ──────────────────────────────────────────────────────────

export const authController = {
  login: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const token = await authService.login(email, password);
      sendSuccess(res, { token }, "Login successful");
    } catch (err) {
      next(err);
    }
  },

  me: (req: AuthRequest, res: Response): void => {
    sendSuccess(res, { admin: req.admin }, "Authenticated");
  },
};

// ─── Profile controller ───────────────────────────────────────────────────────

export const profileController = {
  get: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const profile = await profileService.get();
      if (!profile) {
        sendError(res, "Profile not found", 404);
        return;
      }
      sendSuccess(res, profile, "Profile retrieved");
    } catch (err) {
      next(err);
    }
  },

  upsert: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const profile = await profileService.upsert(req.body);
      sendSuccess(res, profile, "Profile saved");
    } catch (err) {
      next(err);
    }
  },
};

// ─── Skill controller ─────────────────────────────────────────────────────────

export const skillController = {
  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skills = await skillService.getAll();
      sendSuccess(res, skills, "Skills retrieved");
    } catch (err) {
      next(err);
    }
  },

  getAllAdmin: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skills = await skillService.getAllAdmin();
      sendSuccess(res, skills, "All skills retrieved");
    } catch (err) {
      next(err);
    }
  },

  create: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skill = await skillService.create(req.body);
      sendSuccess(res, skill, "Skill created", 201);
    } catch (err) {
      next(err);
    }
  },
  update: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const skill = await skillService.update(
        req.params.id as string,
        req.body,
      );
      if (!skill) {
        sendError(res, "Skill not found", 404);
        return;
      }
      sendSuccess(res, skill, "Skill updated");
    } catch (err) {
      next(err);
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await skillService.delete(req.params.id as string);
      if (!deleted) {
        sendError(res, "Skill not found", 404);
        return;
      }
      sendSuccess(res, null, "Skill deleted");
    } catch (err) {
      next(err);
    }
  },
};

// ─── Project controller ───────────────────────────────────────────────────────

export const projectController = {
  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const projects = await projectService.getAll();
      sendSuccess(res, projects, "Projects retrieved");
    } catch (err) {
      next(err);
    }
  },

  getAllAdmin: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const projects = await projectService.getAllAdmin();
      sendSuccess(res, projects, "All projects retrieved");
    } catch (err) {
      next(err);
    }
  },

  getById: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await projectService.getById(req.params.id as string);
      if (!project) {
        sendError(res, "Project not found", 404);
        return;
      }
      sendSuccess(res, project, "Project retrieved");
    } catch (err) {
      next(err);
    }
  },

  create: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await projectService.create(req.body);
      sendSuccess(res, project, "Project created", 201);
    } catch (err) {
      next(err);
    }
  },

  update: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await projectService.update(
        req.params.id as string,
        req.body,
      );
      if (!project) {
        sendError(res, "Project not found", 404);
        return;
      }
      sendSuccess(res, project, "Project updated");
    } catch (err) {
      next(err);
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await projectService.delete(req.params.id as string);
      if (!deleted) {
        sendError(res, "Project not found", 404);
        return;
      }
      sendSuccess(res, null, "Project deleted");
    } catch (err) {
      next(err);
    }
  },
};

// ─── Experience controller ────────────────────────────────────────────────────

export const experienceController = {
  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const experiences = await experienceService.getAll();
      sendSuccess(res, experiences, "Experience retrieved");
    } catch (err) {
      next(err);
    }
  },

  getAllAdmin: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const experiences = await experienceService.getAllAdmin();
      sendSuccess(res, experiences, "All experience retrieved");
    } catch (err) {
      next(err);
    }
  },

  create: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const exp = await experienceService.create(req.body);
      sendSuccess(res, exp, "Experience created", 201);
    } catch (err) {
      next(err);
    }
  },

  update: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const exp = await experienceService.update(
        req.params.id as string,
        req.body,
      );
      if (!exp) {
        sendError(res, "Experience not found", 404);
        return;
      }
      sendSuccess(res, exp, "Experience updated");
    } catch (err) {
      next(err);
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await experienceService.delete(req.params.id as string);
      if (!deleted) {
        sendError(res, "Experience not found", 404);
        return;
      }
      sendSuccess(res, null, "Experience deleted");
    } catch (err) {
      next(err);
    }
  },
};

// ─── Contact controller ───────────────────────────────────────────────────────

export const contactController = {
  submit: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const contact = await contactService.submit(req.body);
      sendSuccess(res, contact, "Message sent successfully", 201);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const contacts = await contactService.getAll();
      sendSuccess(res, contacts, "Messages retrieved");
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const contact = await contactService.updateStatus(
        req.params.id as string,
        req.body.status,
      );
      if (!contact) {
        sendError(res, "Message not found", 404);
        return;
      }
      sendSuccess(res, contact, "Status updated");
    } catch (err) {
      next(err);
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await contactService.delete(req.params.id as string);
      if (!deleted) {
        sendError(res, "Message not found", 404);
        return;
      }
      sendSuccess(res, null, "Message deleted");
    } catch (err) {
      next(err);
    }
  },
};
