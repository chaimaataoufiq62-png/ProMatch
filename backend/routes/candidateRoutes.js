const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");
const candidateController = require("../controllers/candidateController");

router.get("/profile", authMiddleware, requireRole("candidat"), candidateController.getCandidateProfile);

router.put(
  "/profile",
  authMiddleware,
  requireRole("candidat"),
  candidateController.updateCandidateProfile
);
router.get(
  "/skills",
  authMiddleware,
  requireRole("candidat"),
  candidateController.getCandidateSkills
);

router.post(
  "/skills",
  authMiddleware,
  requireRole("candidat"),
  candidateController.addOrUpdateCandidateSkills
);



router.delete(
  "/skills/:competenceId",
  authMiddleware,
  requireRole("candidat"),
  candidateController.deleteCandidateSkill
);

module.exports = router;