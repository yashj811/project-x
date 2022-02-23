const express = require("express");
const {getAllUsers, getUsersBySchoolId} = require("../controllers/UserController");
const auth = require("../middlewares/Auth");


const router = express.Router();

router.get("/all", auth, getAllUsers);
router.get("/school/:id", auth,getUsersBySchoolId)

module.exports = router;