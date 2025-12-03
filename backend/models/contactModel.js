import pool from "../config/db.js";


export const addContactDB = async (c) => {
  const { name, email, subject, message } = c;
  const { rows } = await pool.query(
    "INSERT INTO contacts (name,email,subject,message) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, subject, message]
  );
  return rows[0];
};

export const getContactsDB = async () => {
  const { rows } = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
  return rows;
};
