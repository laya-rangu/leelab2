import pool from "../config/db.js";

// ✅ PUBLIC → ACTIVE PEOPLE
export const getActivePeople = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM people WHERE is_archived = false ORDER BY id DESC"
  );
  res.json(rows);
};

// ✅ ADMIN → ARCHIVED PEOPLE
export const getArchivedPeople = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM people WHERE is_archived = true ORDER BY id DESC"
  );
  res.json(rows);
};

// ✅ ADMIN → ADD PERSON (STUDENT / FACULTY)
export const addPerson = async (req, res) => {
  const {
    name,
    role,
    education,
    project,
    biography,
    photo,
    start_date,
    end_date,
  } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO people
       (name, role, education, project, biography, photo, start_date, end_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        name,
        role,
        education,
        project,
        biography,
        photo,
        start_date || null,  // ✅ FIX
        end_date || null     // ✅ FIX
      ]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Add person error:", err);
    res.status(500).json({ message: "Failed to add person" });
  }
};


export const updatePerson = async (req, res) => {
  const {
    name,
    role,
    education,
    project,
    biography,
    photo,
    start_date,
    end_date,
  } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE people SET
        name=$1,
        role=$2,
        education=$3,
        project=$4,
        biography=$5,
        photo=$6,
        start_date=$7,
        end_date=$8
       WHERE id=$9
       RETURNING *`,
      [
        name,
        role,
        education,
        project,
        biography,
        photo,
        start_date || null,   // ✅ FIX
        end_date || null,     // ✅ FIX
        req.params.id,
      ]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update person error:", err);
    res.status(500).json({ message: "Failed to update person" });
  }
};



// ✅ ADMIN → ARCHIVE
export const archivePerson = async (req, res) => {
  await pool.query("UPDATE people SET is_archived=true WHERE id=$1", [
    req.params.id,
  ]);
  res.json({ message: "Archived" });
};

// ✅ ADMIN → RESTORE
export const restorePerson = async (req, res) => {
  await pool.query("UPDATE people SET is_archived=false WHERE id=$1", [
    req.params.id,
  ]);
  res.json({ message: "Restored" });
};

// ✅ ADMIN → PROMOTE STUDENT → ALUMNI
export const promoteToAlumni = async (req, res) => {
  const { rows } = await pool.query(
    "UPDATE people SET role='alumni' WHERE id=$1 RETURNING *",
    [req.params.id]
  );
  res.json(rows[0]);
};

// ✅ ADMIN → DELETE
export const deletePerson = async (req, res) => {
  await pool.query("DELETE FROM people WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
};
