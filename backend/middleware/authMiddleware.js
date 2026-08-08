const jwt = require("jsonwebtoken");
const NGO = require("../models/NGO");

const protectNGO = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey123"
        );

        const ngo = await NGO.findById(decoded.id).select("-password");

        if (!ngo) {
            return res.status(404).json({
                success: false,
                message: "NGO not found."
            });
        }

        req.ngo = ngo;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = {
    protectNGO,
    authMiddleware: protectNGO
};