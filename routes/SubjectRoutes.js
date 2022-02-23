const { Router } = require("express");
const express = require("express");
const {createSubject,assignSubjectToClass, getAllSubject, getSubjectsBySchoolId,getSubjectBySubjecId, getSubjectsByClassId} = require("../controllers/SubjectController");
const auth = require("../middlewares/Auth");


const router = express.Router();

router.post("/create-subject", auth, createSubject);
router.post("/assign", auth, assignSubjectToClass);

router.get("/all", auth, getAllSubject);
router.get("/:id", auth,getSubjectBySubjecId);
router.get("/school/:id", auth, getSubjectsBySchoolId);
router.get("/class/:id", auth, getSubjectsByClassId)

module.exports = router;