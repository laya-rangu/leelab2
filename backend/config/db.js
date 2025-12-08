import pkg from "pg";
dotenv.config();

import dotenv from "dotenv";

const { Pool } = pkg;

const connectionString = process.env.DB_URL;

// const pool = new Pool({
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5433,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5433),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

export default pool;

console.log(
  "Using database:",
  connectionString ? "Render Cloud DB" : "Local DB"
);
