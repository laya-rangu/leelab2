// backend/migrateMongoToPostgres.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import pkg from "pg";
const { Pool } = pkg;

// ----- POSTGRES -----
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

// ----- MONGO MODELS (minimal versions) -----
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
const personSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  photo: String,
  email: String,
  website: String,
  linkedIn: String,
  googleScholar: String,
  order: Number,
});
const publicationSchema = new mongoose.Schema({
  title: String,
  authors: String,
  journal: String,
  year: Number,
  doi: String,
  link: String,
  abstract: String,
  tags: [String],
});
const researchSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
});
const teachingSchema = new mongoose.Schema({
  courseTitle: String,
  courseCode: String,
  schedule: String,
  semester: String,
});
const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  image: String,
  createdAt: Date,
});
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date,
});
const materialSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  itemName: String,
  quantity: Number,
  reason: String,
  status: String,
  createdAt: Date,
});

const MongoUser = mongoose.model("User", userSchema);
const MongoPerson = mongoose.model("Person", personSchema);
const MongoPublication = mongoose.model("Publication", publicationSchema);
const MongoResearch = mongoose.model("Research", researchSchema);
const MongoTeaching = mongoose.model("TeachingSchedule", teachingSchema);
const MongoNews = mongoose.model("News", newsSchema);
const MongoContact = mongoose.model("Contact", contactSchema);
const MongoMaterial = mongoose.model("MaterialRequest", materialSchema);

async function migrateUsers() {
  const users = await MongoUser.find();
  for (const u of users) {
    await pool.query(
      `INSERT INTO users (name, email, password, role, created_at)
       VALUES ($1,$2,$3,$4, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [u.name, u.email, u.password, u.role || "lab"]
    );
  }
  console.log(`Migrated ${users.length} users`);
}

async function migratePeople() {
  const docs = await MongoPerson.find();
  for (const p of docs) {
    await pool.query(
      `INSERT INTO people (name, role, bio, photo, is_alumni)
       VALUES ($1,$2,$3,$4,$5)`,
      [p.name, p.title, p.bio, p.photo, false] // decide alumni later
    );
  }
  console.log(`Migrated ${docs.length} people`);
}

async function migratePublications() {
  const docs = await MongoPublication.find();
  for (const p of docs) {
    await pool.query(
      `INSERT INTO publications (title, authors, journal, year, link, abstract)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [p.title, p.authors, p.journal, p.year, p.link || p.doi, p.abstract]
    );
  }
  console.log(`Migrated ${docs.length} publications`);
}

async function migrateResearch() {
  const docs = await MongoResearch.find();
  for (const r of docs) {
    await pool.query(
      `INSERT INTO research (title, description)
       VALUES ($1,$2)`,
      [r.title, r.description]
    );
  }
  console.log(`Migrated ${docs.length} research entries`);
}

async function migrateTeaching() {
  const docs = await MongoTeaching.find();
  for (const t of docs) {
    await pool.query(
      `INSERT INTO teaching (course_title, course_code, schedule, semester)
       VALUES ($1,$2,$3,$4)`,
      [t.courseTitle, t.courseCode, t.schedule, t.semester]
    );
  }
  console.log(`Migrated ${docs.length} teaching entries`);
}

async function migrateNews() {
  const docs = await MongoNews.find();
  for (const n of docs) {
    await pool.query(
      `INSERT INTO news (title, description, image, source, created_at)
       VALUES ($1,$2,$3,$4,$5)`,
      [n.title, n.description, n.image, n.source || "manual", n.createdAt || new Date()]
    );
  }
  console.log(`Migrated ${docs.length} news items`);
}

async function migrateContacts() {
  const docs = await MongoContact.find();
  for (const c of docs) {
    await pool.query(
      `INSERT INTO contacts (name, email, subject, message, created_at)
       VALUES ($1,$2,$3,$4,$5)`,
      [c.name, c.email, c.subject, c.message, c.createdAt || new Date()]
    );
  }
  console.log(`Migrated ${docs.length} contacts`);
}

// For materials, you need a mapping from Mongo user _id → PG user id,
// which may require a lookup. For now, we skip or default to null.
async function migrateMaterials() {
  const docs = await MongoMaterial.find();
  for (const m of docs) {
    await pool.query(
      `INSERT INTO material_requests (user_id, item_name, quantity, reason, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [null, m.itemName, m.quantity, m.reason, m.status || "pending", m.createdAt || new Date()]
    );
  }
  console.log(`Migrated ${docs.length} material requests`);
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Mongo");

    await pool.query("SELECT 1");
    console.log("✅ Connected to Postgres");

    await migrateUsers();
    await migratePeople();
    await migratePublications();
    await migrateResearch();
    await migrateTeaching();
    await migrateNews();
    await migrateContacts();
    await migrateMaterials();

    console.log("✅ Migration complete");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await mongoose.disconnect();
    await pool.end();
    process.exit(0);
  }
}

main();
