const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");

router.get("/profile", authMiddleware, candidateController.getProfile);
router.post("/skills", authMiddleware, candidateController.addSkill);
router.get("/skills", authMiddleware, candidateController.getSkills);
router.delete("/skills/:id", authMiddleware, candidateController.deleteSkill);
router.get("/challenges", authMiddleware, candidateController.getChallenges);

module.exports = router;