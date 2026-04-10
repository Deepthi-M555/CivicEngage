const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  location: { type: String, required: true },

  skills: [{ type: String }],
  interests: [{ type: String }],

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);