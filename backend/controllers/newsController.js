import pool from "../config/db.js";
import { addNewsDB } from "../models/newsModel.js";
import { fetchMyTweets } from "../utils/twitterAPI.js";
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
    await pool.query("UPDATE news SET is_archived = true WHERE id = $1", [
      req.params.id,
    ]);

    res.json({ message: "Archived" });
  } catch (err) {
    console.error("Archive news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Restore News
export const restoreNews = async (req, res) => {
  try {
    await pool.query("UPDATE news SET is_archived = false WHERE id = $1", [
      req.params.id,
    ]);

    res.json({ message: "Restored" });
  } catch (err) {
    console.error("Restore news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const importTwitterNews = async (req, res) => {
  try {
    const tweets = await fetchTweets();

    if (!tweets.length) {
      return res.status(404).json({ message: "No tweets found" });
    }

    // ✅ Return only the latest tweet for editing
    const latestTweet = tweets[0];

    res.json({
      title: "Twitter Update",
      description: latestTweet.text,
      image: null,
      source: "twitter",
    });
  } catch (err) {
    console.error("Import failed:", err);
    res.status(500).json({ message: "Twitter import failed" });
  }
};
export const importFromMyTwitter = async (req, res) => {
  try {
    const tweets = await fetchMyTweets();

    if (!tweets.length) {
      return res.status(404).json({ message: "No tweets found" });
    }

    const latestTweet = tweets[0];

    // ✅ IMPORTANT: RETURN to form, DO NOT SAVE
    res.json({
      title: "X Update",
      description: latestTweet.text,
      image: "",
      source: "x",
    });
  } catch (err) {
    console.error("Import from my Twitter failed:", err);
    res.status(500).json({ message: "Twitter import failed" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await pool.query("DELETE FROM news WHERE id = $1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete news error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
