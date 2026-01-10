const multer = require("multer");

// Memory storage keeps file in memory as buffer
const storage = multer.memoryStorage();

// File filter (optional)
const fileFilter = (req, file, cb) => {
  cb(null, true); // accept all files
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;
