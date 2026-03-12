const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/submissions");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");

    cb(null, `${uniqueSuffix}-${safeName}${ext && !safeName.endsWith(ext) ? "" : ""}`);
  }
});

function fileFilter(req, file, cb) {
  const allowedTypes = [
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
    "image/png",
    "image/jpeg"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé."));
  }
}

const uploadSubmission = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

module.exports = uploadSubmission;