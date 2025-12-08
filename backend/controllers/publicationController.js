import pool from "../config/db.js";

// ✅ ADMIN → CREATE
// export const createPublication = async (req, res) => {
//   try {
//     const { title, authors, year, link } = req.body;

//     const { rows } = await pool.query(
//       `INSERT INTO publications (title, authors, year, link)
//        VALUES ($1,$2,$3,$4)
//        RETURNING *`,
//       [title, authors, year, link]
//     );

//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Create publication error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const createPublication = async (req, res) => {
  try {
    // accept both link & pdf_link, plus optional description/project
    const { title, authors, year, link, pdf_link, description, project } =
      req.body;

    const finalPdfLink = pdf_link ?? link ?? null; // map "link" -> pdf_link

    const { rows } = await pool.query(
      `INSERT INTO publications (title, authors, year, description, pdf_link, project)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, authors, year, description, finalPdfLink, project]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Create publication error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUBLIC → ACTIVE ONLY
export const getActivePublications = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM publications WHERE is_archived = false ORDER BY year DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get active publications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → ARCHIVED ONLY
export const getArchivedPublications = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM publications WHERE is_archived = true ORDER BY year DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Get archived publications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → UPDATE
// export const updatePublication = async (req, res) => {
//   try {
//     const { title, authors, year, link } = req.body;

//     const { rows } = await pool.query(
//       `UPDATE publications SET
//         title=$1,
//         authors=$2,
//         year=$3,
//         link=$4
//        WHERE id=$5
//        RETURNING *`,
//       [title, authors, year, link, req.params.id]
//     );

//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Update publication error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// ✅ ADMIN → UPDATE
export const updatePublication = async (req, res) => {
  try {
    const { title, authors, year, link, pdf_link, description, project } =
      req.body;

    const finalPdfLink = pdf_link ?? link ?? null;

    const { rows } = await pool.query(
      `UPDATE publications SET
        title=$1,
        authors=$2,
        year=$3,
        description=$4,
        pdf_link=$5,
        project=$6
       WHERE id=$7
       RETURNING *`,
      [title, authors, year, description, finalPdfLink, project, req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update publication error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → DELETE
export const deletePublication = async (req, res) => {
  try {
    await pool.query("DELETE FROM publications WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete publication error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → ARCHIVE
export const archivePublication = async (req, res) => {
  try {
    await pool.query("UPDATE publications SET is_archived = true WHERE id=$1", [
      req.params.id,
    ]);

    res.json({ message: "Archived" });
  } catch (err) {
    console.error("Archive publication error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADMIN → RESTORE
export const restorePublication = async (req, res) => {
  try {
    await pool.query(
      "UPDATE publications SET is_archived = false WHERE id=$1",
      [req.params.id]
    );

    res.json({ message: "Restored" });
  } catch (err) {
    console.error("Restore publication error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
