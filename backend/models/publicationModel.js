import pool from "../config/db.js";


export const getPublicationsDB = async () => {
  const { rows } = await pool.query("SELECT * FROM publications");
  return rows;
};

export const addPublicationDB = async (data) => {
  const { title, authors, journal, year, link, abstract } = data;
  const { rows } = await pool.query(
    "INSERT INTO publications (title,authors,journal,year,link,abstract) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [title, authors, journal, year, link, abstract]
  );
  return rows[0];
};

export const updatePublicationDB = async (id, data) => {
  const { title, authors, journal, year, link, abstract } = data;
  const { rows } = await pool.query(
    "UPDATE publications SET title=$1,authors=$2,journal=$3,year=$4,link=$5,abstract=$6 WHERE id=$7 RETURNING *",
    [title, authors, journal, year, link, abstract, id]
  );
  return rows[0];
};

export const deletePublicationDB = async (id) => {
  await pool.query("DELETE FROM publications WHERE id=$1", [id]);
};
