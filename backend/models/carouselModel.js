import pool from "../config/db.js";


export const getCarouselImagesDB = async () => {
  const { rows } = await pool.query("SELECT * FROM carousel_images ORDER BY id DESC");
  return rows;
};

export const addCarouselImageDB = async (image_url) => {
  const { rows } = await pool.query(
    "INSERT INTO carousel_images (image_url) VALUES ($1) RETURNING *",
    [image_url]
  );
  return rows[0];
};

export const deleteCarouselImageDB = async (id) => {
  await pool.query("DELETE FROM carousel_images WHERE id=$1", [id]);
};
