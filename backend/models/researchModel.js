import pool from "../config/db.js";


export const getResearchDB = async () => {
  const { rows } = await pool.query("SELECT * FROM research");
  return rows;
};

export const addResearchDB = async ({ title, description }) => {
  const { rows } = await pool.query(
    "INSERT INTO research (title,description) VALUES ($1,$2) RETURNING *",
    [title, description]
  );
  return rows[0];
};

export const deleteResearchDB = async (id) => {
  await pool.query("DELETE FROM research WHERE id=$1", [id]);
};
