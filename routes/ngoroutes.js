const express = require("express");
const router = express.Router();
const { registerNGO, loginNGO, getNGOProfile } = require("../controllers/ngoController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.post("/signup", registerNGO);
router.post("/login", loginNGO);

// Protected Route (Requires Authorization Header)
router.get("/profile", authMiddleware, getNGOProfile);

module.exports = router;