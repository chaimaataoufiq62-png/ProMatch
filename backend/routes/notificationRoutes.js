const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");

// NOTE: The "/notifications/unread-count" route MUST be declared before
// "/notifications/:id" to prevent Express matching "unread-count" as an :id param.
router.get(
  "/notifications/unread-count",
  authMiddleware,
  notificationController.getUnreadCount
);

// Mark all as read must come before /:id routes for same reason
router.put(
  "/notifications/read-all",
  authMiddleware,
  notificationController.markAllAsRead
);

router.get(
  "/notifications",
  authMiddleware,
  notificationController.getNotifications
);

router.put(
  "/notifications/:id/read",
  authMiddleware,
  notificationController.markAsRead
);

router.delete(
  "/notifications/:id",
  authMiddleware,
  notificationController.deleteNotification
);

module.exports = router;