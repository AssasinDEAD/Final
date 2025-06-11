const multer = require("multer");
const path = require("path");
const fs = require("fs");

const userPhotoDir = path.join("uploads", "users");
if (!fs.existsSync(userPhotoDir)) {
  fs.mkdirSync(userPhotoDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, userPhotoDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadUserPhoto = multer({ storage });

module.exports = uploadUserPhoto;
