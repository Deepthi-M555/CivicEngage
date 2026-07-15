console.log("AI Routes Loaded");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/recommend", async (req, res) => {
    console.log("AI route hit");
  try {
    const { interest } = req.body;

    const response = await axios.post("http://127.0.0.1:5001/recommend", {
      interest: interest,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "AI error" });
  }
});
router.get("/test", (req, res) => {
  res.send("AI route working");
});

module.exports = router;