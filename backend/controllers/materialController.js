import pool from "../config/db.js";

export const createMaterialRequest = async (req, res) => {
  try {
    const {
      student_name,
      student_email,
      project,
      equipment
    } = req.body;

    // ✅ Basic validation
    if (!student_name || !student_email || !project || !equipment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(equipment) || equipment.length === 0) {
      return res.status(400).json({ message: "At least one equipment is required" });
    }

    // ✅ Insert into DB (equipment stored as JSONB)
    const { rows } = await pool.query(
      `INSERT INTO materials
        (student_name, student_email, project, equipment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        student_name,
        student_email,
        project,
        JSON.stringify(equipment)
      ]
    );

    res.status(201).json(rows[0]);

  } catch (err) {
    console.error("Create material request error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN: VIEW ALL REQUESTS
export const getMaterialRequests = async (req, res) => {
  try {
    const archived = req.query.archived === "true";

    const { rows } = await pool.query(
      "SELECT * FROM materials WHERE is_archived = $1 ORDER BY id DESC",
      [archived]
    );

    res.json(rows);
  } catch (err) {
    console.error("Get materials error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateMaterialRequest = async (req, res) => {
  try {
    const { admin_note, responded } = req.body;
    const { id } = req.params;

    // ✅ Safety checks
    if (typeof responded !== "boolean") {
      return res.status(400).json({ message: "responded must be true/false" });
    }

    const { rows } = await pool.query(
      `UPDATE materials
       SET admin_note = $1,
           responded  = $2
       WHERE id = $3
       RETURNING *`,
      [admin_note || "", responded, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Update material error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
    
// ✅ ADMIN: DELETE REQUEST (optional)
export const deleteMaterialRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM materials WHERE id=$1", [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete material request error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ ARCHIVE REQUEST (ADMIN)
export const archiveMaterialRequest = async (req, res) => {
  try {
    await pool.query(
      "UPDATE materials SET is_archived = true WHERE id = $1",
      [req.params.id]
    );
    res.json({ message: "Archived successfully" });
  } catch (err) {
    console.error("Archive error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ RESTORE REQUEST FROM ARCHIVE (ADMIN)
export const restoreMaterialRequest = async (req, res) => {
  try {
    await pool.query(
      "UPDATE materials SET is_archived = false WHERE id = $1",
      [req.params.id]
    );
    res.json({ message: "Restored successfully" });
  } catch (err) {
    console.error("Restore error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

