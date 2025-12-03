import express from "express";
import {
  getCarouselImages,
  addCarouselImage,
  deleteCarouselImage,
} from "../controllers/carouselController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCarouselImages);                // Public
router.post("/", protect, adminOnly, addCarouselImage);
router.delete("/:id", protect, adminOnly, deleteCarouselImage);

export default router;
