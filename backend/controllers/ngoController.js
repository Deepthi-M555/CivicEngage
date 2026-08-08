const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NGO = require("../models/NGO");

exports.registerNGO = async (req, res) => {
    try {
        const { ngoName, email, phone, address, password } = req.body;

        if (!ngoName || !email || !phone || !address || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingNGO = await NGO.findOne({ email });
        if (existingNGO) {
            return res.status(400).json({ success: false, message: "NGO already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const ngo = await NGO.create({ ngoName, email, phone, address, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "NGO registered successfully",
            ngo: { id: ngo._id, ngoName: ngo.ngoName, email: ngo.email, phone: ngo.phone, address: ngo.address }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.loginNGO = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const ngo = await NGO.findOne({ email });
        if (!ngo) {
            return res.status(404).json({ success: false, message: "NGO not found" });
        }

        const isMatch = await bcrypt.compare(password, ngo.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET || "mysecretkey123", { expiresIn: "1d" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            ngo: { id: ngo._id, ngoName: ngo.ngoName, email: ngo.email, phone: ngo.phone, address: ngo.address }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.getNGOProfile = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.ngo._id).select("-password");
        if (!ngo) {
            return res.status(404).json({ success: false, message: "NGO not found" });
        }

        res.status(200).json({ success: true, message: "NGO profile retrieved successfully", ngo });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
