/*import pool from "../config/db.js";

// ✅ PUBLIC: GET TEACHING
export const getTeaching = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM teaching ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN: ADD TEACHING
export const createTeaching = async (req, res) => {
  try {
    const { course_name, section, time, location, description } = req.body;

    if (!course_name) {
      return res.status(400).json({ message: "course_name is required" });
    }

    await pool.query(
      `INSERT INTO teaching (course_name, section, time, location, description)
       VALUES ($1,$2,$3,$4,$5)`,
      [course_name, section, time, location, description]
    );

    res.json({ message: "Teaching added successfully" });
  } catch (err) {
    console.error("Create teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN: UPDATE TEACHING
export const updateTeaching = async (req, res) => {
  try {
    const { course_name, section, time, location, description } = req.body;

    await pool.query(
      `UPDATE teaching 
       SET course_name=$1, section=$2, time=$3, location=$4, description=$5
       WHERE id=$6`,
      [
        course_name,
        section,
        time,
        location,
        description,
        req.params.id
      ]
    );

    res.json({ message: "Teaching updated successfully" });
  } catch (err) {
    console.error("Update teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN: DELETE TEACHING
export const deleteTeaching = async (req, res) => {
  try {
    await pool.query("DELETE FROM teaching WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ message: "Teaching deleted successfully" });
  } catch (err) {
    console.error("Delete teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
*/
import pool from "../config/db.js";

// ✅ ADMIN → CREATE COURSE
export const createTeaching = async (req, res) => {
  try {
    const {
      course_name,
      course_code,
      time,
      location,
      description,
      prerequisites
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO teaching 
      (course_name, course_code, time, location, description, prerequisites)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [course_name, course_code, time, location, description, prerequisites]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Create teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUBLIC → GET ACTIVE (CURRENT SEMESTER)
export const getActiveTeaching = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM teaching WHERE is_archived = false ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get active teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → GET ARCHIVED (PAST SEMESTER)
export const getArchivedTeaching = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM teaching WHERE is_archived = true ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get archived teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → UPDATE COURSE
export const updateTeaching = async (req, res) => {
  try {
    const {
      course_name,
      course_code,
      time,
      location,
      description,
      prerequisites
    } = req.body;

    const { rows } = await pool.query(
      `UPDATE teaching SET
        course_name=$1,
        course_code=$2,
        time=$3,
        location=$4,
        description=$5,
        prerequisites=$6
       WHERE id=$7
       RETURNING *`,
      [
        course_name,
        course_code,
        time,
        location,
        description,
        prerequisites,
        req.params.id
      ]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → DELETE
export const deleteTeaching = async (req, res) => {
  try {
    await pool.query("DELETE FROM teaching WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → ARCHIVE
export const archiveTeaching = async (req, res) => {
  try {
    await pool.query(
      "UPDATE teaching SET is_archived = true WHERE id=$1",
      [req.params.id]
    );
    res.json({ message: "Archived" });
  } catch (err) {
    console.error("Archive teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → RESTORE
export const restoreTeaching = async (req, res) => {
  try {
    await pool.query(
      "UPDATE teaching SET is_archived = false WHERE id=$1",
      [req.params.id]
    );
    res.json({ message: "Restored" });
  } catch (err) {
    console.error("Restore teaching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
