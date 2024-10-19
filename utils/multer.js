const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Make sure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    // Corrected the typo here
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("File type not allowed. Please upload a JPEG or PNG image."),
      false
    );
  }
};

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB size limit
  },
});

module.exports = upload;

// const multer = require("multer");
// const path = require("path");

// // Set Storage
// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "uploads"); //**directory where photos will be stored**
//   },
//   filename: (req, res, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Filter file type
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = fileTypes.test(file.mimetype);

//   if (extname && mimeType) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed (jpeg, jpg, png)."));
//   }
// };

// // setting up multer
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, //5mb limit for file
//   fileFilter,
// });
// module.exports = upload;
