const db = require("../config/db");
const logger = require("../utils/logger");

// ==========================
// Stats candidat
// ==========================

exports.getCandidateStats = async (req, res) => {
  try {
    const [candidateRows] = await db.execute(
      `
      SELECT id
      FROM candidat
      WHERE utilisateur_id = ?
      `,
      [req.user.id]
    );

    if (candidateRows.length === 0) {
      return res.status(404).json({
        message: "Candidat introuvable"
      });
    }

    const candidatId = candidateRows[0].id;

    const [[submissions]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM soumission_challenge
      WHERE candidat_id = ?
      `,
      [candidatId]
    );

    const [[evaluated]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM evaluation_challenge ev
      JOIN soumission_challenge s
      ON ev.soumission_id = s.id
      WHERE s.candidat_id = ?
      `,
      [candidatId]
    );

    const [[avgScore]] = await db.execute(
      `
      SELECT AVG(note_finale) AS moyenne
      FROM evaluation_challenge ev
      JOIN soumission_challenge s
      ON ev.soumission_id = s.id
      WHERE s.candidat_id = ?
      `,
      [candidatId]
    );

    const [[qualified]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM evaluation_challenge ev
      JOIN soumission_challenge s
      ON ev.soumission_id = s.id
      WHERE s.candidat_id = ?
      AND ev.est_qualifie = true
      `,
      [candidatId]
    );

    return res.status(200).json({
      totalSubmissions: submissions.total,
      totalEvaluated: evaluated.total,
      averageScore: avgScore.moyenne || 0,
      qualified: qualified.total
    });

  } catch (error) {
    logger.error("Erreur stats candidat:", error);
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};


// ==========================
// Stats entreprise
// ==========================

exports.getCompanyStats = async (req, res) => {
  try {

    const [companyRows] = await db.execute(
      `
      SELECT id
      FROM entreprise
      WHERE utilisateur_id = ?
      `,
      [req.user.id]
    );

    if (companyRows.length === 0) {
      return res.status(404).json({
        message: "Entreprise introuvable"
      });
    }

    const entrepriseId = companyRows[0].id;

    const [[challenges]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM challenge
      WHERE entreprise_id = ?
      `,
      [entrepriseId]
    );

    const [[submissions]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM soumission_challenge s
      JOIN challenge c
      ON s.challenge_id = c.id
      WHERE c.entreprise_id = ?
      `,
      [entrepriseId]
    );

    const [[evaluated]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM evaluation_challenge ev
      JOIN challenge c
      ON ev.entreprise_id = c.entreprise_id
      WHERE c.entreprise_id = ?
      `,
      [entrepriseId]
    );

    const [[qualified]] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM evaluation_challenge
      WHERE entreprise_id = ?
      AND est_qualifie = true
      `,
      [entrepriseId]
    );

    return res.status(200).json({
      totalChallenges: challenges.total,
      totalSubmissions: submissions.total,
      totalEvaluations: evaluated.total,
      totalQualified: qualified.total
    });

  } catch (error) {
    logger.error("Erreur stats entreprise:", error);
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};