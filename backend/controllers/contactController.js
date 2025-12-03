
import pool from "../config/db.js";

// ✅ PUBLIC → Submit Contact Form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO contacts(name, email, message)
       VALUES($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Contact submit error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → View Active or Archived Contacts
export const getContactForms = async (req, res) => {
  try {
    const archived = req.query.archived === "true";

    const { rows } = await pool.query(
      "SELECT * FROM contacts WHERE is_archived = $1 ORDER BY id DESC",
      [archived]
    );

    res.json(rows);
  } catch (err) {
    console.error("Get contact forms error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Update Note + Responded
export const updateContactForm = async (req, res) => {
  try {
    const { admin_note, responded } = req.body;

    const { rows } = await pool.query(
      `UPDATE contacts
       SET admin_note = $1,
           responded = $2
       WHERE id = $3
       RETURNING *`,
      [admin_note || "", responded === true, req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update contact error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Archive Contact
export const archiveContactForm = async (req, res) => {
  try {
    await pool.query(
      "UPDATE contacts SET is_archived = true WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Archived successfully" });
  } catch (err) {
    console.error("Archive contact error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → Restore Contact
export const restoreContactForm = async (req, res) => {
  try {
    await pool.query(
      "UPDATE contacts SET is_archived = false WHERE id = $1",
      [req.params.id]
    );

    res.json({ message: "Restored successfully" });
  } catch (err) {
    console.error("Restore contact error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
