/*import express from "express";
import {
  getTeaching,
  createTeaching,
  updateTeaching,
  deleteTeaching
} from "../controllers/teachingController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC
router.get("/", getTeaching);

// ✅ ADMIN
router.post("/", protect, adminOnly, createTeaching);
router.put("/:id", protect, adminOnly, updateTeaching);
router.delete("/:id", protect, adminOnly, deleteTeaching);

export default router;
*/
import express from "express";
import {
  createTeaching,
  getActiveTeaching,
  getArchivedTeaching,
  updateTeaching,
  deleteTeaching,
  archiveTeaching,
  restoreTeaching
} from "../controllers/teachingController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC
router.get("/", getActiveTeaching);

// ✅ ADMIN
router.get("/archived", protect, adminOnly, getArchivedTeaching);
router.post("/", protect, adminOnly, createTeaching);
router.put("/:id", protect, adminOnly, updateTeaching);
router.delete("/:id", protect, adminOnly, deleteTeaching);
router.put("/archive/:id", protect, adminOnly, archiveTeaching);
router.put("/restore/:id", protect, adminOnly, restoreTeaching);

export default router;
