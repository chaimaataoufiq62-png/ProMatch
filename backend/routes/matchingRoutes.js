const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");
const matchingController = require("../controllers/matchingController");

// Candidate — live match compute
router.get(
  "/candidate/matches",
  authMiddleware,
  requireRole("candidat"),
  matchingController.getCandidateMatches
);

// Candidate — saved match results (from DB)
router.get(
  "/candidate/matches/saved",
  authMiddleware,
  requireRole("candidat"),
  matchingController.getSavedCandidateMatches
);

// Company — live match compute for a challenge
router.get(
  "/company/challenges/:challengeId/matches",
  authMiddleware,
  requireRole("entreprise"),
  matchingController.getChallengeMatchedCandidates
);

// Company — saved match results for a challenge
router.get(
  "/company/challenges/:challengeId/matches/saved",
  authMiddleware,
  requireRole("entreprise"),
  matchingController.getSavedChallengeMatches
);

// Trigger matching run (both candidat and entreprise)
router.post(
  "/matching/run",
  authMiddleware,
  matchingController.runMatching
);

module.exports = router;