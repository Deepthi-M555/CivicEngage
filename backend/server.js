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
app.use("/api/ai", require("./routes/aiRoutes"));

app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/impact", require("./routes/impactRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});