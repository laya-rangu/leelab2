import express from "express";
import {
  getActivePeople,
  getArchivedPeople,
  addPerson,
  updatePerson,
  archivePerson,
  restorePerson,
  promoteToAlumni,
  deletePerson
} from "../controllers/peopleController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC
router.get("/", getActivePeople);

// ✅ ADMIN
router.get("/archived", protect, adminOnly, getArchivedPeople);
router.post("/", protect, adminOnly, addPerson);
router.put("/:id", protect, adminOnly, updatePerson);
router.put("/archive/:id", protect, adminOnly, archivePerson);
router.put("/restore/:id", protect, adminOnly, restorePerson);
router.put("/promote/:id", protect, adminOnly, promoteToAlumni);
router.delete("/:id", protect, adminOnly, deletePerson);

export default router;
