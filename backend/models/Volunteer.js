const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  skills: [{
    type: String
  }],

  availability: {
    type: String,
    default: "Weekends"
  },

  location: {
    type: String
  },

  interests: [{
    type: String
  }],

  impactScore: {
    type: Number,
    default: 0
  },

  campaignAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    default: null
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Volunteer", volunteerSchema);