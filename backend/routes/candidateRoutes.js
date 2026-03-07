const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");

router.get("/profile", authMiddleware, candidateController.getProfile);

module.exports = router;