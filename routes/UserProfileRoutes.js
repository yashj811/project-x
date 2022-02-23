const express = require("express");
const auth = require("../middlewares/Auth");
const UserProfileController = require("../controllers/UserProfileController");

const router = express.Router();

router.post("/create-profile", auth, UserProfileController.createProfile);
router.get("/:id", auth, UserProfileController.getProfile);

module.exports = router;
