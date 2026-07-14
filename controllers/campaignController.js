const Campaign = require("../models/Campaign");


// Create Campaign
const createCampaign = async (req, res) => {
  try {

    const campaign = await Campaign.create({
      ...req.body,
      ngoId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Campaigns
const getAllCampaigns = async (req, res) => {
  try {

    const campaigns = await Campaign.find({
      ngoId: req.user._id,
    });

    res.status(200).json({
      success: true,
      campaigns,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Single Campaign
const getCampaignById = async (req, res) => {
  try {

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      ngoId: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      success: true,
      campaign,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Campaign
const updateCampaign = async (req, res) => {
  try {

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      ngoId: req.user._id,
    });


    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }


    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      campaign: updatedCampaign,
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Delete Campaign
const deleteCampaign = async (req, res) => {
  try {

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      ngoId: req.user._id,
    });


    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }


    await Campaign.findByIdAndDelete(req.params.id);


    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};