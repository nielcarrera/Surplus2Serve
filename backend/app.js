// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const imageRoutes = require('./controllers/imageController')

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', locationRoutes);
app.use('/images', imageRoutes); 


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const userId = req.body.userID;
//         const dir = path.join("D:", "Downloads", "Surplus2Serve-main", "Surplus2Serve-main", "Surplus2Serve", "src", "userAttachmentStorage", userId);

//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir, { recursive: true });
//         }
//         cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//         const filename = Date.now() + path.extname(file.originalname);
//         cb(null, filename);
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/api/uploadImage', upload.single('attachmentLocation'), async (req, res) => {
//     console.log("API endpoint reached");

//     // Check if the file is processed correctly by multer
//     if (!req.file) {
//         console.error("Multer failed to process the file.");
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }

//     try {
//         const userID = req.body.userID;
//         const filePath = path.join("userAttachmentStorage", userID, req.file.filename);
        
//         console.log("UserID:", userID);
//         console.log("FilePath:", filePath);
        
//         // Insert the file path into the database
//         const query = 'INSERT INTO attachment (attachmentOwnerId, attachmentLocation) VALUES (?, ?)';
//         db.query(query, [userID, filePath], (error, results) => {
//             if (error) {
//                 console.error('Database error:', error);
//                 return res.status(500).json({ message: 'Failed to save file path in database.' });
//             }
//             console.log('Database insert successful, result:', results);
//             res.status(200).json({ message: 'Image uploaded and stored successfully.' });
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({ message: 'File upload failed.' });
//     }
// });