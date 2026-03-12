const db = require("../config/db");
const logger = require("../utils/logger");

exports.getAllCompetences = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT id, nom
      FROM competence
      ORDER BY nom ASC
      `
    );

    return res.status(200).json(rows);
  } catch (error) {
    logger.error("Erreur getAllCompetences :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};