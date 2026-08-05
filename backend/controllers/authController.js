const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Participation = require("../models/Participation");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= SIGN IN =================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, dob, location, skills, interests } =
      req.body;

    // 1️⃣ Validation
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // 2️⃣ Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      location,
      skills,
      interests,
    });

    // 5️⃣ Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ Send response
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DASHBOARD =================
exports.getDashboard = async (req, res) => {
  try {
    const user = req.user;

    const tasks = await Participation.find({ user: user._id });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      stats: {
        totalTasks: total,
        completedTasks: completed,
        impactScore: total * 10,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only if new value given
    user.name = req.body.name || user.name;
    user.location = req.body.location || user.location;
    user.skills = req.body.skills || user.skills;
    user.interests = req.body.interests || user.interests;

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    // 1️⃣ Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // 2️⃣ Hash new password
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
