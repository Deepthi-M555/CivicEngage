const express = require("express");
const router = express.Router();
const {
    registerNGO,
    loginNGO,
    getNGOProfile
} = require("../controllers/ngoController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/signup", registerNGO);
router.post("/login", loginNGO);
router.get("/dashboard", authMiddleware, getNGOProfile);

module.exports = router;
