const mongoose = require("mongoose");

const organizationProfileSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },

  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  website: {
    type: String
  },

  address: {
    type: String
  },

  city: {
    type: String
  },

  state: {
    type: String
  },

  postalCode: {
    type: String
  },

  description: {
    type: String
  },

  mission: {
    type: String
  },

  vision: {
    type: String
  },

  focusAreas: [{
    type: String
  }],

  logo: {
    type: String
  },

  certificate: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("OrganizationProfile", organizationProfileSchema);