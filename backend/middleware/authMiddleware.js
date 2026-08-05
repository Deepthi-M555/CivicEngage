const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No authorization header" });
    }

    // 2️⃣ Check Bearer format
    if (!req.headers.authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 3️⃣ Extract token
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Check user exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 6️⃣ Attach user
    req.user = user;

    next();

  } catch (error) {
    // 7️⃣ Handle errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = protect;