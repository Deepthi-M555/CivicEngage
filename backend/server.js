const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ======================================
// MongoDB Connection
// ======================================

const MONGO_URI =
    "mongodb://127.0.0.1:27017/ngo_database";

console.log("Connecting directly to:", MONGO_URI);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.error("❌ DB Error:", error.message);
    });


// ======================================
// Middlewares
// ======================================

app.use(cors());

app.use(express.json());


// ======================================
// Routes
// ======================================

// NGO Routes
app.use(
    "/api/ngo",
    require("./routes/ngoRoutes")
);


// Campaign Routes
app.use(
    "/api/campaigns",
    require("./routes/campaignRoutes")
);


// ======================================
// Home Route
// ======================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NGO Backend API is running..."
    });
});


// ======================================
// Start Server
// ======================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});