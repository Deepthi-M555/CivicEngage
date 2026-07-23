const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NGO = require("../models/ngo");

// @desc    Register new NGO
// @route   POST /api/ngo/signup
const registerNGO = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const ngoExists = await NGO.findOne({ email });
        if (ngoExists) {
            return res.status(400).json({ message: "NGO with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const ngo = await NGO.create({
            name,
            email,
            password: hashedPassword,
        });

        if (ngo) {
            const token = jwt.sign(
                { id: ngo._id },
                process.env.JWT_SECRET || "mysecretkey123",
                { expiresIn: "30d" }
            );

            return res.status(201).json({
                message: "Registration successful",
                ngo: {
                    id: ngo._id,
                    name: ngo.name,
                    email: ngo.email,
                },
                token,
            });
        } else {
            return res.status(400).json({ message: "Invalid NGO data" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate NGO / Login
// @route   POST /api/ngo/login
const loginNGO = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const ngo = await NGO.findOne({ email });

        if (ngo && (await bcrypt.compare(password, ngo.password))) {
            const token = jwt.sign(
                { id: ngo._id },
                process.env.JWT_SECRET || "mysecretkey123",
                { expiresIn: "30d" }
            );

            return res.status(200).json({
                message: "Login successful",
                ngo: {
                    id: ngo._id,
                    name: ngo.name,
                    email: ngo.email,
                },
                token,
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get NGO Profile / Dashboard
// @route   GET /api/ngo/profile
// @access  Private
const getNGOProfile = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.ngo.id).select("-password");

        if (!ngo) {
            return res.status(404).json({ message: "NGO profile not found" });
        }

        return res.status(200).json({
            message: "Profile retrieved successfully",
            ngo,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerNGO, loginNGO, getNGOProfile };