const express = require("express");
const {createClass, getAllClasses, getClassByClassId,getClassBySchoolId} = require("../controllers/ClassController");
const auth = require("../middlewares/Auth");


const router = express.Router();

router.post("/create-class", auth, createClass);
router.get("/all", auth, getAllClasses);
router.get("/:id", auth,getClassByClassId);
router.get("/school/:id", auth, getClassBySchoolId)

module.exports = router;