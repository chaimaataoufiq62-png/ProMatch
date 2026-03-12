const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const db = require("./config/db");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const companyRoutes = require("./routes/companyRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const statsRoutes = require("./routes/statsRoutes");
const competenceRoutes = require("./routes/competenceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true
  })
);

// ─── Body parsers (must come before routes) ───────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static files ─────────────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Rate limiters ────────────────────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: "Trop de tentatives de connexion. Réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/company", companyRoutes);
app.use("/api", matchingRoutes);
app.use("/api", submissionRoutes);
app.use("/api", notificationRoutes);
app.use("/api", statsRoutes);
app.use("/api/competences", competenceRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "Talynx API" });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable." });
});

// ─── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Handle multer errors gracefully
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Fichier trop volumineux (max 10 Mo)." });
  }
  if (err.message === "Type de fichier non autorisé.") {
    return res.status(415).json({ message: err.message });
  }
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ message: err.message });
  }

  logger.error("Unhandled error:", err);
  return res.status(500).json({ message: "Erreur serveur inattendue." });
});

// ─── Boot ─────────────────────────────────────────────────────────────────────
async function startServer() {
  try {
    const connection = await db.getConnection();
    logger.info("Database connected successfully");
    connection.release();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;