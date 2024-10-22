import multer from "multer";
import path from "path";

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory for uploads
  },
  filename: (req, file, cb) => {
    console.log(file);

    const uniqueName = req.body.username + path.extname(file.originalname);
    cb(null, uniqueName); // Save the file with a unique name
  },
});

// Configure multer
const upload = multer({ storage });

// Export the upload configuration
export default upload;
