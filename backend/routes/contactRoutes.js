import express from "express";
import {
  submitContactForm,
  getContactForms,
  updateContactForm,
  archiveContactForm,
  restoreContactForm
} from "../controllers/contactController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC → Submit contact
router.post("/", submitContactForm);

// ✅ ADMIN → View active / archived
router.get("/", protect, adminOnly, getContactForms);

// ✅ ADMIN → Update responded + note
router.put("/:id", protect, adminOnly, updateContactForm);

// ✅ ADMIN → Archive
router.put("/archive/:id", protect, adminOnly, archiveContactForm);

// ✅ ADMIN → Restore
router.put("/restore/:id", protect, adminOnly, restoreContactForm);

export default router;
