const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config(); // loads .env
connectDB(); // connects DB

const app = express();

app.use(express.json()); // allows JSON data
app.use(cors()); // allows frontend to connect

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/events", require("./routes/eventRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});