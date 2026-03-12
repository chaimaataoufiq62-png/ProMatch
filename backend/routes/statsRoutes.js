const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const statsController = require("../controllers/statsController");

router.get(
  "/stats/candidate",
  authMiddleware,
  requireRole("candidat"),
  statsController.getCandidateStats
);

router.get(
  "/stats/company",
  authMiddleware,
  requireRole("entreprise"),
  statsController.getCompanyStats
);

module.exports = router;