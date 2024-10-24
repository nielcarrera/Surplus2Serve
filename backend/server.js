const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Add your MySQL password here
    database: 'Surplus2Serve_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

// User Registration
app.post('/register', (req, res) => {
    const { firstName, lastName, username, password, confirmPassword, location } = req.body;
    // Validate incoming data
    if (!firstName || !lastName || !username || !password || !confirmPassword || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM user_tbl WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) return res.status(500).json({ message: err });

        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //Hash the password before saving
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            // Insert the new user into the database
            const CreateUser = 'CALL CreateUser(?, ?, ?, ?, ?)';
            db.query(CreateUser, [username, hashedPassword, firstName, lastName, location], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error saving user to the database' });
                }
                return res.status(200).json({ message: 'User registered successfully' });
            });
        });
    });
});

//fetchLocations
// Endpoint to fetch locations
app.get('/locations', (req, res) => {
    db.query('SELECT * FROM location', (err, results) => {
        if (err) {
            console.error('Error fetching locations:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        
        // Ensure results is an array
        if (!Array.isArray(results)) {
            console.error('Expected an array but got:', results);
            return res.status(500).json({ message: 'Unexpected response format' });
        }

        res.json(results);
    });
});

// User Login
// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        console.log("Missing username or password");
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const query = "SELECT * FROM user_tbl WHERE username = ?";
    
    db.query(query, [username], async (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (result.length === 0) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found.' });
        }

        const user = result[0];

        try {
            // Compare the password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match result:", isMatch);
            if (isMatch) {
                console.log("Login successful");
                const token = jwt.sign({ id: user.id }, 'secretkey');
                return res.status(200).json({ message: 'Login successful', token});
            } else {
                console.log("Invalid credentials");
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (compareError) {
            console.error('Error comparing passwords:', compareError);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
});




// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
