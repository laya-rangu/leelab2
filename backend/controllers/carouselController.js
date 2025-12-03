import {
  getCarouselImagesDB,
  addCarouselImageDB,
  deleteCarouselImageDB,
} from "../models/carouselModel.js";

export const getCarouselImages = async (req, res) => {
  try {
    const images = await getCarouselImagesDB();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error loading images" });
  }
};

export const addCarouselImage = async (req, res) => {
  try {
    const { image_url } = req.body;

    if (!image_url) return res.status(400).json({ message: "Image URL required" });

    const img = await addCarouselImageDB(image_url);
    res.json(img);
  } catch (err) {
    res.status(500).json({ message: "Error adding image" });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    await deleteCarouselImageDB(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image" });
  }
};
