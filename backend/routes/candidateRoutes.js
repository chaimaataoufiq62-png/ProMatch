const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const candidateController = require("../controllers/candidateController");

router.get("/profile", authMiddleware, candidateController.getProfile);
router.post("/skills", authMiddleware, candidateController.addSkill);
router.get("/skills", authMiddleware, candidateController.getSkills);
router.delete("/skills/:id", authMiddleware, candidateController.deleteSkill);

module.exports = router;