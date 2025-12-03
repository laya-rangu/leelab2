import express from "express";
import {
  createMaterialRequest,
  getMaterialRequests,
  updateMaterialRequest,
  archiveMaterialRequest,
  restoreMaterialRequest
} from "../controllers/materialController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Student submits request
router.post("/", protect, createMaterialRequest);

// ✅ Admin gets ONLY ACTIVE requests
router.get("/", protect, adminOnly, getMaterialRequests);

// ✅ Admin updates notes & responded
router.put("/:id", protect, adminOnly, updateMaterialRequest);

// ✅ Admin archives request
router.put("/archive/:id", protect, adminOnly, archiveMaterialRequest);

// ✅ Admin restores archived request
router.put("/restore/:id", protect, adminOnly, restoreMaterialRequest);

export default router;
