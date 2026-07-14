const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  updateProfile,
  getDashboard,
  changePassword
} = require("../controllers/authController");

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED ROUTES
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.put("/profile", protect, updateProfile);

// ✅ Dashboard moved to controller
router.get("/dashboard", protect, getDashboard);

router.put("/change-password", protect, changePassword);

module.exports = router;