const express = require("express");
const router = express.Router();

const {createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications
} = require("../controllers/notificationController");

router.post("/", createNotification);
router.get("/", getNotifications);
router.put("/:id/read", markAsRead);
router.delete("/:id",  deleteNotification);
router.delete("/clear/all", clearAllNotifications);

module.exports = router;
