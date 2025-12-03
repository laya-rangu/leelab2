import express from "express";
import {
  createPublication,
  getActivePublications,
  getArchivedPublications,
  updatePublication,
  deletePublication,
  archivePublication,
  restorePublication
} from "../controllers/publicationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC → ACTIVE ONLY
router.get("/", getActivePublications);

// ✅ ADMIN ROUTES
router.get("/archived", protect, adminOnly, getArchivedPublications);
router.post("/", protect, adminOnly, createPublication);
router.put("/:id", protect, adminOnly, updatePublication);
router.delete("/:id", protect, adminOnly, deletePublication);
router.put("/archive/:id", protect, adminOnly, archivePublication);
router.put("/restore/:id", protect, adminOnly, restorePublication);

export default router;
