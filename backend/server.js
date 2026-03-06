require("dotenv").config();
const pool = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "ProMatch API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ ok: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const authMiddleware = require("./middlewares/authMiddleware");

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Utilisateur authentifié",
    user: req.user
  });
});