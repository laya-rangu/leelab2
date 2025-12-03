import express from "express";
import {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser
} from "../controllers/authController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/authController.js";

const router = express.Router();

// ✅ AUTH
router.post("/register", register);
router.post("/login", login);

// ✅ ADMIN USER MANAGEMENT
router.get("/users", protect, adminOnly, getUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/:id", protect, adminOnly, updateUser);
router.put("/change-password", protect, changePassword);

export default router;
