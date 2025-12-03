import pool from "../config/db.js";

// ✅ ADMIN → Add News
export const createNews = async (req, res) => {
  try {
    const { title, description, image, source } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO news(title, description, image, source)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [title, description, image, source]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Create news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUBLIC → View Active News
export const getActiveNews = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM news WHERE is_archived = false ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get active news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → View Archived News
export const getArchivedNews = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM news WHERE is_archived = true ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get archived news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Archive News
export const archiveNews = async (req, res) => {
  try {
    await pool.query(
      "UPDATE news SET is_archived = true WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Archived" });
  } catch (err) {
    console.error("Archive news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Restore News
export const restoreNews = async (req, res) => {
  try {
    await pool.query(
      "UPDATE news SET is_archived = false WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Restored" });
  } catch (err) {
    console.error("Restore news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
