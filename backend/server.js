const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SmartMatch API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});