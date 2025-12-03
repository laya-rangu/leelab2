import express from "express";
import {
  createResearch,
  getActiveResearch,
  getArchivedResearch,
  updateResearch,
  deleteResearch,
  archiveResearch,
  restoreResearch
} from "../controllers/researchController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC
router.get("/", getActiveResearch);

// ✅ ADMIN
router.get("/archived", protect, adminOnly, getArchivedResearch);
router.post("/", protect, adminOnly, createResearch);
router.put("/:id", protect, adminOnly, updateResearch);
router.delete("/:id", protect, adminOnly, deleteResearch);
router.put("/archive/:id", protect, adminOnly, archiveResearch);
router.put("/restore/:id", protect, adminOnly, restoreResearch);

export default router;
