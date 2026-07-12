const express = require("express");
const router = express.Router();
const axios = require("axios");
const volunteerController = require("../controllers/volunteerController");

router.post("/", volunteerController.createVolunteer);

router.get("/", volunteerController.getAllVolunteers);

router.get("/pending", volunteerController.getPendingVolunteers);

router.get("/approved", volunteerController.getApprovedVolunteers);

router.put("/:id/approve", volunteerController.approveVolunteer);

router.put("/:id/reject", volunteerController.rejectVolunteer);

router.put("/:id/assign", volunteerController.assignVolunteer);

router.delete("/:id", volunteerController.deleteVolunteer);

router.post("/recommend", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/recommend",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "AI service unavailable" });
  }
});

router.get("/:id", volunteerController.getVolunteerById);

module.exports = router;