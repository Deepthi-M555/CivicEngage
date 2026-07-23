const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add an NGO name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("NGO", ngoSchema);