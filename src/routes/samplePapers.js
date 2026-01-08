const express = require("express");
const router = express.Router();
const uploadController = require("../controller/samplePapersController");
const upload = require("../../multer");

// Upload multiple files (max 50)
router.post("/addPapers", upload.array("files",50), uploadController.addPapers);
router.post("/getPapers", uploadController.fetchPapers);

module.exports = router;
