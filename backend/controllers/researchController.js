import pool from "../config/db.js";

// ✅ ADMIN → CREATE RESEARCH
export const createResearch = async (req, res) => {
  try {
    const { title, name, description, people_involved, links } = req.body;
    const finalTitle = title ?? name;

    if (!finalTitle) {
      return res.status(400).json({ message: "Title is required" });
    }

    const { rows } = await pool.query(
      `INSERT INTO research (title description, people_involved, links)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [finalTitle, description, people_involved, links]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Create research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUBLIC → GET ACTIVE (ONGOING)
export const getActiveResearch = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM research WHERE is_archived = false ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get active research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → GET ARCHIVED (PAST)
export const getArchivedResearch = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM research WHERE is_archived = true ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get archived research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → UPDATE RESEARCH
export const updateResearch = async (req, res) => {
  try {
    const { title, name, description, people_involved, links } = req.body;
    const finalTitle = title ?? name;

    if (!finalTitle) {
      return res.status(400).json({ message: "Title is required" });
    }

    const { rows } = await pool.query(
      `UPDATE research SET
        title=$1,
        description=$2,
        people_involved=$3,
        links=$4
       WHERE id=$5
       RETURNING *`,
      [finalTitle, description, people_involved, links, req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → DELETE
export const deleteResearch = async (req, res) => {
  try {
    await pool.query("DELETE FROM research WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → ARCHIVE
export const archiveResearch = async (req, res) => {
  try {
    await pool.query("UPDATE research SET is_archived = true WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ message: "Archived" });
  } catch (err) {
    console.error("Archive research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → RESTORE
export const restoreResearch = async (req, res) => {
  try {
    await pool.query("UPDATE research SET is_archived = false WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ message: "Restored" });
  } catch (err) {
    console.error("Restore research error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
