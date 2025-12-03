import pool from "../config/db.js";


export const createUser = async ({ name, email, password, role }) => {
  const { rows } = await pool.query(
    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, password, role]
  );
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id,name,email,role FROM users WHERE id=$1",
    [id]
  );
  return rows[0];
};

export const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT id,name,email,role FROM users");
  return rows;
};

export const updateUserRole = async (id, role) => {
  await pool.query("UPDATE users SET role=$1 WHERE id=$2", [role, id]);
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};
