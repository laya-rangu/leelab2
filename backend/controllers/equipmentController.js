import pool from "../config/db.js";

// ✅ GET ALL EQUIPMENT (STUDENT + ADMIN)
export const getEquipmentController = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM equipment ORDER BY name"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get equipment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD NEW EQUIPMENT (ADMIN ONLY)
export const addEquipment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Equipment name required" });
    }

    const { rows } = await pool.query(
      "INSERT INTO equipment(name) VALUES($1) RETURNING *",
      [name.trim()]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Add equipment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE EQUIPMENT (ADMIN ONLY)
export const deleteEquipment = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM equipment WHERE id=$1",
      [req.params.id]
    );
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete equipment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
