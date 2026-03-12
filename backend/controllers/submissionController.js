const db = require("../config/db");
const createNotification = require("../utils/createNotification");
const logger = require("../utils/logger");
const {
  getCandidateByUserId,
  getCompanyByUserId,
  getChallengeEligibility,
  checkCandidateEligibility
} = require("../utils/helpers");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

// ─── Submit challenge ─────────────────────────────────────────────────────────

exports.submitChallenge = async (req, res) => {
  const { challengeId } = req.params;
  const { contenu_reponse, lien_github } = req.body;

  try {
    const candidate = await getCandidateByUserId(req.user.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidat introuvable." });
    }

    const [challengeRows] = await db.execute(
      `
      SELECT
        ch.*,
        e.utilisateur_id AS entreprise_utilisateur_id
      FROM challenge ch
      JOIN entreprise e ON ch.entreprise_id = e.id
      WHERE ch.id = ?
      `,
      [challengeId]
    );

    if (challengeRows.length === 0) {
      return res.status(404).json({ message: "Challenge introuvable." });
    }

    const challenge = challengeRows[0];
    const now = new Date();

    if (challenge.dateDebut) {
      const dateDebut = new Date(challenge.dateDebut);
      if (now < dateDebut) {
        return res.status(403).json({
          message: "Ce challenge n'est pas encore ouvert aux soumissions."
        });
      }
    }

    if (challenge.dateFin) {
      const dateFin = new Date(challenge.dateFin);
      dateFin.setHours(23, 59, 59, 999);
      if (now > dateFin) {
        return res.status(403).json({
          message: "La date limite de soumission pour ce challenge est dépassée."
        });
      }
    }

    // Check eligibility
    const criteria = await getChallengeEligibility(challenge.id);
    const eligible = checkCandidateEligibility(candidate, criteria);

    if (!eligible) {
      return res.status(403).json({
        message: "Vous n'êtes pas éligible pour soumettre une réponse à ce challenge."
      });
    }

    // Prevent duplicate submissions
    const [existing] = await db.execute(
      `SELECT id FROM soumission_challenge WHERE candidat_id = ? AND challenge_id = ?`,
      [candidate.id, challengeId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Vous avez déjà soumis une réponse pour ce challenge."
      });
    }

    const fichier_reponse = req.file
      ? `/uploads/submissions/${req.file.filename}`
      : null;

    const [result] = await db.execute(
      `
      INSERT INTO soumission_challenge (
        candidat_id,
        challenge_id,
        contenu_reponse,
        fichier_reponse,
        lien_github
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        candidate.id,
        challengeId,
        contenu_reponse || null,
        fichier_reponse,
        lien_github || null
      ]
    );

    if (challenge.entreprise_utilisateur_id) {
      await createNotification(
        challenge.entreprise_utilisateur_id,
        "soumission",
        `Une nouvelle soumission a été reçue pour le challenge "${challenge.titre}".`
      );
    }

    return res.status(201).json({
      message: "Soumission enregistrée avec succès.",
      submissionId: result.insertId,
      fichier_reponse
    });
  } catch (error) {
    logger.error("Erreur submitChallenge :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ─── Candidate sees own submissions ──────────────────────────────────────────

exports.getCandidateSubmissions = async (req, res) => {
  try {
    const candidate = await getCandidateByUserId(req.user.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidat introuvable." });
    }

    const [rows] = await db.execute(
      `
      SELECT
        s.id,
        s.challenge_id,
        s.contenu_reponse,
        s.fichier_reponse,
        s.lien_github,
        s.date_soumission,
        s.statut,
        ch.titre,
        ch.description,
        e.note_finale,
        e.commentaire,
        e.est_qualifie,
        e.date_evaluation
      FROM soumission_challenge s
      JOIN challenge ch ON s.challenge_id = ch.id
      LEFT JOIN evaluation_challenge e ON e.soumission_id = s.id
      WHERE s.candidat_id = ?
      ORDER BY s.date_soumission DESC
      `,
      [candidate.id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    logger.error("Erreur getCandidateSubmissions :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ─── Company sees submissions for a challenge ─────────────────────────────────

exports.getChallengeSubmissions = async (req, res) => {
  const { challengeId } = req.params;

  try {
    const company = await getCompanyByUserId(req.user.id);
    if (!company) {
      return res.status(404).json({ message: "Entreprise introuvable." });
    }

    const [challengeRows] = await db.execute(
      `SELECT * FROM challenge WHERE id = ? AND entreprise_id = ?`,
      [challengeId, company.id]
    );

    if (challengeRows.length === 0) {
      return res.status(404).json({ message: "Challenge introuvable ou non autorisé." });
    }

    const [rows] = await db.execute(
      `
      SELECT
        s.id,
        s.candidat_id,
        s.challenge_id,
        s.contenu_reponse,
        s.fichier_reponse,
        s.lien_github,
        s.date_soumission,
        s.statut,
        c.nom,
        c.prenom,
        c.ville,
        c.ecole,
        c.specialite,
        c.niveauEtude,
        ev.note_finale,
        ev.commentaire,
        ev.est_qualifie,
        ev.date_evaluation
      FROM soumission_challenge s
      JOIN candidat c ON s.candidat_id = c.id
      LEFT JOIN evaluation_challenge ev ON ev.soumission_id = s.id
      WHERE s.challenge_id = ?
      ORDER BY s.date_soumission DESC
      `,
      [challengeId]
    );

    return res.status(200).json({ challenge: challengeRows[0], submissions: rows });
  } catch (error) {
    logger.error("Erreur getChallengeSubmissions :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ─── Company evaluates a submission ──────────────────────────────────────────

exports.evaluateSubmission = async (req, res) => {
  const { submissionId } = req.params;
  const { note_finale, commentaire, est_qualifie } = req.body;

  if (note_finale === undefined || note_finale === null) {
    return res.status(400).json({ message: "La note finale est obligatoire." });
  }

  if (typeof note_finale !== "number" || note_finale < 0 || note_finale > 100) {
    return res.status(400).json({
      message: "La note finale doit être un nombre entre 0 et 100."
    });
  }

  try {
    const company = await getCompanyByUserId(req.user.id);
    if (!company) {
      return res.status(404).json({ message: "Entreprise introuvable." });
    }

    const [submissionRows] = await db.execute(
      `
      SELECT
        s.*,
        ch.titre,
        ch.entreprise_id,
        c.utilisateur_id AS candidat_utilisateur_id
      FROM soumission_challenge s
      JOIN challenge ch ON s.challenge_id = ch.id
      JOIN candidat c ON s.candidat_id = c.id
      WHERE s.id = ? AND ch.entreprise_id = ?
      `,
      [submissionId, company.id]
    );

    if (submissionRows.length === 0) {
      return res.status(404).json({ message: "Soumission introuvable ou non autorisée." });
    }

    const submission = submissionRows[0];

    await db.execute(
      `
      INSERT INTO evaluation_challenge (
        soumission_id,
        entreprise_id,
        note_finale,
        commentaire,
        est_qualifie
      )
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        note_finale = VALUES(note_finale),
        commentaire = VALUES(commentaire),
        est_qualifie = VALUES(est_qualifie),
        date_evaluation = CURRENT_TIMESTAMP
      `,
      [
        submissionId,
        company.id,
        note_finale,
        commentaire || null,
        Boolean(est_qualifie)
      ]
    );

    await db.execute(
      `UPDATE soumission_challenge SET statut = 'corrige' WHERE id = ?`,
      [submissionId]
    );

    if (submission.candidat_utilisateur_id) {
      await createNotification(
        submission.candidat_utilisateur_id,
        "evaluation",
        `Votre soumission pour le challenge "${submission.titre}" a été évaluée.`
      );
    }

    return res.status(200).json({ message: "Évaluation enregistrée avec succès." });
  } catch (error) {
    logger.error("Erreur evaluateSubmission :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};