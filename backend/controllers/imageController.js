const imageModel = require('../models/imageModel');
const notificationModel = require('../models/notificationModel');
const userModel = require('../models/userModel');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const adminId = 2;
const notifType = 'verification';
const messageSuffix = 'sent a verification request.';

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
const insertImage = async(req, res) => {
    const userID = req.body.userID;
    const filePath = path.join("userAttachmentStorage", userID, req.file.filename);

    console.log("User ID:", userID);
    console.log("File Path:", filePath);

    try {
        // Fetch user's full name based on userID
        const userFullName = await userModel.findUserFullName(userID);
        if (!userFullName) {
            return res.status(400).json({ message: 'Name not found on image controller' });
        }

        // Construct the message using user's full name and suffix
        const fullName = `${userFullName.firstName} ${userFullName.lastName}`;
        const message = `${fullName} ${messageSuffix}`;

        // Insert the image details into the database
        imageModel.insertImage(userID, filePath, (error, results) => {
            if (error) {
                console.error("Database insertion error:", error);
                return res.status(500).json({ message: "Failed to save file path in the database." });
            }

            // Insert the notification after image details are stored
            notificationModel.insertNotification(adminId, notifType, message, (error, results) => {
                if (error) {
                    console.error("Database insertion error:", error);
                    return res.status(500).json({ message: "Failed to generate notification for verification." });
                }

                // Successful response after both image and notification insertions
                res.status(200).json({ message: "Image uploaded and stored successfully, notification generated." });
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};


// Express route for handling the image upload request
const express = require('express');
const router = express.Router();

// Route for uploading an image
router.post('/insertImage', upload.single('attachmentLocation'), insertImage);

module.exports = router;