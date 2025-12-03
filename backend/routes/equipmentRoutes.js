import express from "express";
import {
  getEquipmentController,
  addEquipment,
  deleteEquipment
} from "../controllers/equipmentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ STUDENTS + ADMIN → Get equipment list
router.get("/", protect, getEquipmentController);

// ✅ ADMIN ONLY → Add equipment
router.post("/", protect, adminOnly, addEquipment);

// ✅ ADMIN ONLY → Delete equipment
router.delete("/:id", protect, adminOnly, deleteEquipment);

export default router;
