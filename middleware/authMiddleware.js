const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        console.log("Authorization Header:", req.headers.authorization);
        console.log("JWT Secret:", process.env.JWT_SECRET || "mysecretkey123");

        const token = req.headers.authorization?.split(" ")[1];

        console.log("Extracted Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Added || "mysecretkey123" fallback here:
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey123");

        console.log("Decoded Token:", decoded);

        req.ngo = decoded;

        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;