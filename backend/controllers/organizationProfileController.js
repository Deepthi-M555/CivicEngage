const OrganizationProfile = require("../models/OrganizationProfile");

exports.createProfile = async (req, res) => {
  try {
    const profile = await OrganizationProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await OrganizationProfile.find();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await OrganizationProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await OrganizationProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await OrganizationProfile.findByIdAndDelete(req.params.id);

    res.json({
      message: "Organization profile deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};