const db = require("../config/db");
const logger = require("../utils/logger");

exports.getNotifications = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        utilisateur_id,
        type,
        message,
        est_lue,
        created_at
      FROM notification
      WHERE utilisateur_id = ?
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    logger.error("Erreur getNotifications :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      `
      UPDATE notification
      SET est_lue = true
      WHERE id = ? AND utilisateur_id = ?
      `,
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Notification introuvable."
      });
    }

    return res.status(200).json({
      message: "Notification marquée comme lue."
    });
  } catch (error) {
    logger.error("Erreur markAsRead :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await db.execute(
      `
      UPDATE notification
      SET est_lue = true
      WHERE utilisateur_id = ?
      `,
      [req.user.id]
    );

    return res.status(200).json({
      message: "Toutes les notifications sont marquées comme lues."
    });
  } catch (error) {
    logger.error("Erreur markAllAsRead :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT COUNT(*) AS unreadCount
      FROM notification
      WHERE utilisateur_id = ? AND est_lue = false
      `,
      [req.user.id]
    );

    return res.status(200).json({
      unreadCount: rows[0].unreadCount
    });
  } catch (error) {
    logger.error("Erreur getUnreadCount :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      `
      DELETE FROM notification
      WHERE id = ? AND utilisateur_id = ?
      `,
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Notification introuvable."
      });
    }

    return res.status(200).json({
      message: "Notification supprimée avec succès."
    });
  } catch (error) {
    logger.error("Erreur deleteNotification :", error);
    return res.status(500).json({
      message: "Erreur serveur."
    });
  }
};