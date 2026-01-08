const express = require("express");
const { fetchClasses, fetchSubjects, fetchSets, fetchYear } = require("../controller/classesController");
const router = express.Router();

router.get("/classes",fetchClasses);
router.post("/subjects",fetchSubjects);
router.get("/sets",fetchSets);
router.get("/years",fetchYear);

module.exports = router;
