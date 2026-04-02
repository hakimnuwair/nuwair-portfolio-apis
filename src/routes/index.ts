// src/routes/index.ts — All API routes

import { Router } from "express";
import { protect, validate, authLimiter, contactLimiter } from "../middlewares";
import {
  authController,
  profileController,
  skillController,
  projectController,
  experienceController,
  contactController,
} from "../controllers";
import {
  loginSchema,
  profileUpdateSchema,
  skillSchema,
  skillUpdateSchema,
  projectSchema,
  projectUpdateSchema,
  experienceSchema,
  experienceUpdateSchema,
  contactSchema,
  contactStatusSchema,
} from "../validators";

const router = Router();

// ─── Auth ─────────────────────────────────────────────────────────────────────
router.post(
  "/auth/login",
  authLimiter,
  validate(loginSchema),
  authController.login,
);
router.get("/auth/me", protect, authController.me);

// ─── Profile — public read, protected write ───────────────────────────────────
router.get("/profile", profileController.get);
router.put(
  "/profile",
  protect,
  validate(profileUpdateSchema),
  profileController.upsert,
);

// ─── Skills ───────────────────────────────────────────────────────────────────
router.get("/skills", skillController.getAll); // public
router.get("/skills/admin", protect, skillController.getAllAdmin); // admin
router.post("/skills", protect, validate(skillSchema), skillController.create);
router.put(
  "/skills/:id",
  protect,
  validate(skillUpdateSchema),
  skillController.update,
);
router.delete("/skills/:id", protect, skillController.delete);

// ─── Projects ─────────────────────────────────────────────────────────────────
router.get("/projects", projectController.getAll); // public
router.get("/projects/admin", protect, projectController.getAllAdmin); // admin
router.get("/projects/:id", projectController.getById); // public
router.post(
  "/projects",
  protect,
  validate(projectSchema),
  projectController.create,
);
router.put(
  "/projects/:id",
  protect,
  validate(projectUpdateSchema),
  projectController.update,
);
router.delete("/projects/:id", protect, projectController.delete);

// ─── Experience ───────────────────────────────────────────────────────────────
router.get("/experience", experienceController.getAll); // public
router.get("/experience/admin", protect, experienceController.getAllAdmin); // admin
router.post(
  "/experience",
  protect,
  validate(experienceSchema),
  experienceController.create,
);
router.put(
  "/experience/:id",
  protect,
  validate(experienceUpdateSchema),
  experienceController.update,
);
router.delete("/experience/:id", protect, experienceController.delete);

// ─── Contact ──────────────────────────────────────────────────────────────────
router.post(
  "/contact",
  contactLimiter,
  validate(contactSchema),
  contactController.submit,
); // public
router.get("/contact", protect, contactController.getAll); // admin
router.patch(
  "/contact/:id/status",
  protect,
  validate(contactStatusSchema),
  contactController.updateStatus,
);
router.delete("/contact/:id", protect, contactController.delete);

export default router;
