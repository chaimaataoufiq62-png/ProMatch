const express = require("express");
const router = express.Router();
const competenceController = require("../controllers/competenceController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, competenceController.getAllCompetences);

module.exports = router;