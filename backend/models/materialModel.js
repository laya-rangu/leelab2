import pool from "../config/db.js";


export const createMaterialDB = async ({ user_id, item_name, quantity, reason }) => {
  const { rows } = await pool.query(
    "INSERT INTO material_requests (user_id,item_name,quantity,reason) VALUES ($1,$2,$3,$4) RETURNING *",
    [user_id, item_name, quantity, reason]
  );
  return rows[0];
};

export const getAllMaterialsDB = async () => {
  const { rows } = await pool.query(`
    SELECT m.*, u.name, u.email
    FROM material_requests m
    JOIN users u ON m.user_id=u.id
    ORDER BY m.created_at DESC
  `);
  return rows;
};
