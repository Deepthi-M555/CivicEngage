const express = require("express");
const router = express.Router();

const organizationProfileController = require("../controllers/organizationProfileController");

router.post("/", organizationProfileController.createProfile);

router.get("/", organizationProfileController.getProfile);

router.get("/:id", organizationProfileController.getProfileById);

router.put("/:id", organizationProfileController.updateProfile);

router.delete("/:id", organizationProfileController.deleteProfile);

module.exports = router;