import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// ✅ REGISTER USER (ADMIN CREATES USERS)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userCheck = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role",
      [name, email, hashedPassword, role || "student"]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST BODY:", req.body); // ✅ DEBUG

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userQuery.rows.length === 0) {
      console.log("❌ Email not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("✅ Password Match:", isMatch); // ✅ DEBUG

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

  
    
// ✅ GET ALL USERS (ADMIN)
export const getUsers = async (req, res) => {
  const users = await pool.query(
    "SELECT id,name,email,role FROM users ORDER BY id DESC"
  );
  res.json(users.rows);
};

// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.json({ message: "User deleted" });
};

// ✅ UPDATE USER
export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  await pool.query(
    "UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4",
    [name, email, role, req.params.id]
  );
  res.json({ message: "User updated" });
};
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userRes = await pool.query("SELECT password FROM users WHERE id=$1", [userId]);
    const user = userRes.rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE users SET password=$1 WHERE id=$2", [
      hashedPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};