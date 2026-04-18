const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  location: { type: String, required: true },

  skills: [{ type: String }],
  interests: [{ type: String }],

  emailPreferences: { type: Boolean, default: true },
  privacyMode: { type: String, enum: ['public', 'private'], default: 'public' },
  badges: [{ name: String, awardedAt: Date }],

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);