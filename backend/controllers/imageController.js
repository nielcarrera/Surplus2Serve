const imageModel = require('../models/imageModel');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.userID; // Get userId from the body
        const dir = path.join("D:", "Downloads", "Surplus2Serve-main", "Surplus2Serve-main", "Surplus2Serve", "src", "userAttachmentStorage", userId);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Set the directory path
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname); // Create a unique filename
        cb(null, filename);
    }
});

// Create the multer upload instance
const upload = multer({ storage: storage });

// Controller function to handle image upload and database insertion
const insertImage = (req, res) => {
    // Extract the userID from the request body and the file path from multer
    const userID = req.body.userID;
    const filePath = path.join("userAttachmentStorage", userID, req.file.filename); // The relative path of the uploaded file
    
    console.log("User ID:", userID);
    console.log("File Path:", filePath);

    // Insert the image details into the database
    imageModel.insertImage(userID, filePath, (error, results) => {
        if (error) {
            console.error("Database insertion error:", error);
            return res.status(500).json({ message: "Failed to save file path in the database." });
        }
        res.status(200).json({ message: "Image uploaded and stored successfully." });
    });
};

// Express route for handling the image upload request
const express = require('express');
const router = express.Router();

// Route for uploading an image
router.post('/insertImage', upload.single('attachmentLocation'), insertImage);

module.exports = router;