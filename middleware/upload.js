const multer = require("multer");
const path = require("path");
const fs = require("fs");

function getStorage(modelName) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, `../uploads/${modelName}`);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });
}

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

function uploadSingleWithModel(modelName) {
  return multer({
    storage: getStorage(modelName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("image");
}

function uploadMultipleWithModel(modelName) {
  return multer({
    storage: getStorage(modelName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).array("images", 10);
}

const customFieldsUpload = (fields, model = "gallery") =>
  multer({
    storage: getStorage(model),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).fields(fields);

module.exports = {
  uploadSingleWithModel,
  uploadMultipleWithModel,
  customFieldsUpload,
};
