const axios = require("axios");
const Volunteer = require("../models/Volunteer");

exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);

    // Notify AI service
    try {
      await axios.post("http://localhost:8000/embedding-sync", volunteer);
    } catch (err) {
      console.log("Embedding sync failed");
    }

    res.status(201).json(volunteer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ status: "pending" });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApprovedVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ status: "approved" });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: "Volunteer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignVolunteer = async (req, res) => {
  try {

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      {
        campaignAssigned: req.body.campaignId
      },
      { new: true }
    );

    res.json({
      message: "Volunteer assigned successfully",
      volunteer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select(
      "name email skills interests location availability impactScore status campaignAssigned"
    );

    res.json(volunteers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};