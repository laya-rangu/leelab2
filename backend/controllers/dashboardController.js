import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const stats = {};

    stats.users = (await pool.query("SELECT COUNT(*) FROM users")).rows[0].count;
    stats.people = (await pool.query("SELECT COUNT(*) FROM people WHERE is_archived=false")).rows[0].count;
    stats.alumni = (await pool.query("SELECT COUNT(*) FROM people WHERE role='alumni'")).rows[0].count;
    stats.news = (await pool.query("SELECT COUNT(*) FROM news WHERE is_archived=false")).rows[0].count;
    stats.publications = (await pool.query("SELECT COUNT(*) FROM publications WHERE is_archived=false")).rows[0].count;
    stats.research = (await pool.query("SELECT COUNT(*) FROM research WHERE is_archived=false")).rows[0].count;
    stats.teaching = (await pool.query("SELECT COUNT(*) FROM teaching WHERE is_archived=false")).rows[0].count;
    stats.materials = (await pool.query("SELECT COUNT(*) FROM materials WHERE is_archived=false")).rows[0].count;
    stats.contacts = (await pool.query("SELECT COUNT(*) FROM contacts WHERE is_archived=false")).rows[0].count;

    res.json(stats);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Dashboard load error" });
  }
};
