const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const ngoroutes = require("./routes/ngoroutes");
const campaignroutes = require("./routes/campaignroutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/ngo", ngoroutes);
app.use("/api/campaign", campaignroutes);

// Test Route
app.get("/", (req, res) => {
    res.send("NGO Backend API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});