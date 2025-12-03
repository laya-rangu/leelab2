import pool from "../config/db.js";

// ✅ PUBLIC: Only active news
export const getActiveNewsDB = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM news WHERE is_active=true ORDER BY created_at DESC"
  );
  return rows;
};

// ✅ ADMIN: All news (active + archived)
export const getAllNewsDB = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM news ORDER BY created_at DESC"
  );
  return rows;
};

export const addNewsDB = async ({ title, description, image, source }) => {
  const { rows } = await pool.query(
    `INSERT INTO news (title,description,image,source,is_active)
     VALUES ($1,$2,$3,$4,true) RETURNING *`,
    [title, description, image, source]
  );
  return rows[0];
};

export const updateNewsDB = async (id, data) => {
  const { title, description, image, source } = data;
  const { rows } = await pool.query(
    `UPDATE news SET title=$1, description=$2, image=$3, source=$4
     WHERE id=$5 RETURNING *`,
    [title, description, image, source, id]
  );
  return rows[0];
};

// ✅ Archive instead of delete
export const archiveNewsDB = async (id) => {
  await pool.query(
    "UPDATE news SET is_active=false WHERE id=$1",
    [id]
  );
};

// ✅ Restore from archive
export const restoreNewsDB = async (id) => {
  await pool.query(
    "UPDATE news SET is_active=true WHERE id=$1",
    [id]
  );
};
