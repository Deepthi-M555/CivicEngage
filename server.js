const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check Route
app.get("/", (req, res) => {
    res.send("NGO Backend API is Running...");
});

// NGO Routes
app.use("/api/ngo", require("./routes/ngoroutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});