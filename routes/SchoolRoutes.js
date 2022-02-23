const express = require("express");
const {createSchool, getSchoolById, getAllSchools} = require("../controllers/SchoolController");
const auth = require("../middlewares/Auth");


const router = express.Router();

router.post("/create-school", auth, createSchool);
router.get("/all", auth, getAllSchools);
router.get("/:id", auth,getSchoolById)

module.exports = router;