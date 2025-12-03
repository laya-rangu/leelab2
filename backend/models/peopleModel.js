import pool from "../config/db.js";

export const getAllPeopleDB = () =>
  pool.query("SELECT * FROM people ORDER BY created_at DESC");

export const createPersonDB = (data) =>
  pool.query(
    `INSERT INTO people (name, role, department, description, photo_url)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [data.name, data.role, data.department, data.description, data.photo_url]
  );

export const updatePersonDB = (id, data) =>
  pool.query(
    `UPDATE people SET name=$1, role=$2, department=$3, description=$4, photo_url=$5 WHERE id=$6 RETURNING *`,
    [data.name, data.role, data.department, data.description, data.photo_url, id]
  );

export const deletePersonDB = (id) =>
  pool.query("DELETE FROM people WHERE id=$1", [id]);
