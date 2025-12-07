import express from "express";
import {
  createNews,
  getActiveNews,
  getArchivedNews,
  archiveNews,
  restoreNews
} from "../controllers/newsController.js";
import { importTwitterNews } from "../controllers/newsController.js";
import { importFromMyTwitter } from "../controllers/newsController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ PUBLIC → Active news
router.get("/", getActiveNews);

// ✅ ADMIN → Add news
router.post("/", protect, adminOnly, createNews);

// ✅ ADMIN → Archived news
router.get("/archived", protect, adminOnly, getArchivedNews);

// ✅ ADMIN → Archive
router.put("/archive/:id", protect, adminOnly, archiveNews);

// ✅ ADMIN → Restore
router.put("/restore/:id", protect, adminOnly, restoreNews);
router.post("/import/twitter", protect, adminOnly, importTwitterNews);
router.post(
  "/import/my-twitter",
  protect,
  adminOnly,
  importFromMyTwitter
);

export default router;
