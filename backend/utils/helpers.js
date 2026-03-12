/**
 * Shared helper functions used across multiple controllers.
 * Centralised here to avoid code duplication.
 */
const db = require("../config/db");

// ─── Database helpers ────────────────────────────────────────────────────────

async function getCandidateByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT * FROM candidat WHERE utilisateur_id = ?`,
    [userId]
  );
  return rows.length ? rows[0] : null;
}

async function getCompanyByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT * FROM entreprise WHERE utilisateur_id = ?`,
    [userId]
  );
  return rows.length ? rows[0] : null;
}

async function getChallengeEligibility(challengeId) {
  const [rows] = await db.execute(
    `SELECT id, type_critere, valeur FROM challenge_eligibilite WHERE challenge_id = ?`,
    [challengeId]
  );
  return rows;
}

// ─── Eligibility logic ───────────────────────────────────────────────────────

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

/**
 * Returns { eligible, matchedCriteria, failedCriteria } for the detailed view.
 */
function checkCandidateEligibilityDetailed(candidate, criteria) {
  if (!criteria || criteria.length === 0) {
    return { eligible: true, matchedCriteria: [], failedCriteria: [] };
  }

  const matchedCriteria = [];
  const failedCriteria = [];

  for (const crit of criteria) {
    const type = normalize(crit.type_critere);
    const expected = normalize(crit.valeur);

    let candidateValue = "";

    if (type === "niveauetude") {
      candidateValue = normalize(candidate.niveauEtude);
    } else if (type === "specialite") {
      candidateValue = normalize(candidate.specialite);
    } else if (type === "ville") {
      candidateValue = normalize(candidate.ville);
    } else if (type === "ecole") {
      candidateValue = normalize(candidate.ecole);
    } else {
      // Unknown criteria type — non-blocking
      matchedCriteria.push({
        type_critere: crit.type_critere,
        valeur: crit.valeur,
        note: "critère ignoré"
      });
      continue;
    }

    if (candidateValue === expected) {
      matchedCriteria.push({ type_critere: crit.type_critere, valeur: crit.valeur });
    } else {
      failedCriteria.push({
        type_critere: crit.type_critere,
        valeurAttendue: crit.valeur,
        valeurCandidat: candidateValue || null
      });
    }
  }

  return {
    eligible: failedCriteria.length === 0,
    matchedCriteria,
    failedCriteria
  };
}

/**
 * Simple boolean check used by submission controller.
 */
function checkCandidateEligibility(candidate, criteria) {
  if (!criteria || criteria.length === 0) return true;

  for (const crit of criteria) {
    const type = normalize(crit.type_critere);
    const expected = normalize(crit.valeur);
    let candidateValue = "";

    if (type === "niveauetude") candidateValue = normalize(candidate.niveauEtude);
    else if (type === "specialite") candidateValue = normalize(candidate.specialite);
    else if (type === "ville") candidateValue = normalize(candidate.ville);
    else if (type === "ecole") candidateValue = normalize(candidate.ecole);
    else continue;

    if (candidateValue !== expected) return false;
  }

  return true;
}

module.exports = {
  getCandidateByUserId,
  getCompanyByUserId,
  getChallengeEligibility,
  checkCandidateEligibility,
  checkCandidateEligibilityDetailed,
  normalize
};
