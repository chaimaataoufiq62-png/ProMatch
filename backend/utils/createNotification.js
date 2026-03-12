const db = require("../config/db");

async function createNotification(utilisateurId, type, message) {
    try {
    await db.execute(
    `
    INSERT INTO notification (utilisateur_id, type, message)
    VALUES (?, ?, ?)
    `,
    [utilisateurId, type, message]
  );
    } catch (error) {
    console.error("Erreur createNotification :", error);
  } 
}

module.exports = createNotification;