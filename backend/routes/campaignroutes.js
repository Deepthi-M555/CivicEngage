const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Create Campaign
router.post("/create", authMiddleware, createCampaign);

// Get All Campaigns
router.get("/", authMiddleware, getAllCampaigns);

// Get Single Campaign
router.get("/:id", authMiddleware, getCampaignById);

// Update Campaign
router.put("/:id", authMiddleware, updateCampaign);

// Delete Campaign
router.delete("/:id", authMiddleware, deleteCampaign);

module.exports = router;
