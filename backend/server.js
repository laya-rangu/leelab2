/*import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"; // ✅ THIS MUST EXIST
import peopleRoutes from "./routes/peopleRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (TO VERIFY SERVER WORKS)
app.get("/api/test", (req, res) => {
  res.send("SERVER IS WORKING");
});

// ✅ AUTH ROUTES MOUNT
app.use("/api/auth", authRoutes); // ✅ THIS IS THE FIX

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
app.use("/api/people", peopleRoutes);
*/
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import peopleRoutes from "./routes/peopleRoutes.js";   // ✅ REQUIRED
import publicationRoutes from "./routes/publicationRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import teachingRoutes from "./routes/teachingRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import pool from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
dotenv.config();
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/api/test", (req, res) => {
  res.send("SERVER IS WORKING");
});

// ✅ ROUTE MOUNTING (THIS IS WHAT YOU WERE MISSING)
app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);        // ✅ PEOPLE ACTIVE HERE
app.use("/api/publications", publicationRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/teaching", teachingRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ DB TEST
pool.query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

// ✅ SINGLE LISTENER (ONLY ONCE)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
