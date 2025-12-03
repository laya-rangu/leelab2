import pool from "../config/db.js";


export const getEquipmentDB = async () => {
  const { rows } = await pool.query("SELECT * FROM equipment ORDER BY id DESC");
  return rows;
};

export const addEquipmentDB = async (d) => {
  const { name, description, location, availability, image, notes } = d;

  const { rows } = await pool.query(
    `INSERT INTO equipment (name,description,location,availability,image,notes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, description, location, availability ?? true, image, notes]
  );
  return rows[0];
};

export const updateEquipmentDB = async (id, d) => {
  const { name, description, location, availability, image, notes } = d;

  const { rows } = await pool.query(
    `UPDATE equipment SET
      name=$1,description=$2,location=$3,availability=$4,image=$5,notes=$6
      WHERE id=$7 RETURNING *`,
    [name, description, location, availability, image, notes, id]
  );
  return rows[0];
};

export const deleteEquipmentDB = async (id) => {
  await pool.query("DELETE FROM equipment WHERE id=$1", [id]);
};
