import pool from "../config/db.js";


export const getTeachingDB = async () => {
  const { rows } = await pool.query("SELECT * FROM teaching");
  return rows;
};

export const addTeachingDB = async (data) => {
  const { course_title, course_code, schedule, semester, location, description } = data;
  const { rows } = await pool.query(
    "INSERT INTO teaching (course_title,course_code,schedule,semester,location,description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [course_title, course_code, schedule, semester, location, description]
  );
  return rows[0];
};

export const deleteTeachingDB = async (id) => {
  await pool.query("DELETE FROM teaching WHERE id=$1", [id]);
};
