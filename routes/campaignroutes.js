const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
} = require("../controllers/campaignController");


// Get all campaigns
router.get("/", protect, getAllCampaigns);


// Get single campaign
router.get("/:id", protect, getCampaignById);


// Create campaign
router.post("/", protect, createCampaign);


// Update campaign
router.put("/:id", protect, updateCampaign);


// Delete campaign
router.delete("/:id", protect, deleteCampaign);


module.exports = router;