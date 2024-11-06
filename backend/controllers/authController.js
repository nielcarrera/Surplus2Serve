// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const register = async (req, res) => {
    console.log("flag register");
    const { firstName, lastName, username, password, confirmPassword, location } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !username || !password || !confirmPassword || !location) {
        console.log("All fields required");
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        const userExists = await userModel.findUserByUsername(username);
        if (userExists.length > 0) {
            console.log("User exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        userModel.createUser(username, hashedPassword, firstName, lastName, location, (err) => {
            if (err) {
                console.error("MySQL error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    error: err.message, // For debugging; hide this in production
                });
            }
            console.log("User registered");
            res.status(200).json({
                success: true,
                message: 'User registered successfully'
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Step 1: Find user by username
        const result = await userModel.findUserByUsername(username);
        if (!result || result.length === 0) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const user = result[0];
        const id = user.userID;

        // Step 2: Fetch user role first
        const userRole = await userModel.findUserRole(id);
        if (!userRole) {
            return res.status(404).json({ message: 'User role not found.' });
        }

        console.log(`User role retrieved: ${userRole.roleId}`);

        // Step 3: Check if user is admin (role ID is 1) or regular user
        if (userRole.roleId === 1) {
            // Admin - Basic password verification
            if (user.password !== password) {
                return res.status(400).json({ message: 'Invalid admin credentials' });
            }
            console.log('Admin login successful.');
        } else {
            // Regular user - Verify password with bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            console.log('User login with password verification successful.');
        }

        // Step 4: Fetch full name after successful role check or password verification
        const userFullName = await userModel.findUserFullName(id);
        if (!userFullName) {
            return res.status(404).json({ message: 'Full name not found.' });
        }

        const fullName = `${userFullName.firstName} ${userFullName.lastName}`;
        console.log(`Full name retrieved: ${fullName}`);

        // Step 5: Generate JWT including user role
        const token = jwt.sign(
            { id: id, name: fullName, role: userRole.roleId }, // Add role to the payload
            'secretkey',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const fetchUserDetail = async (req, res) => {
    const { userId } = req.body; // Extract userId from the request body
    console.log("User Id:", userId); // Check if userId is received correctly

    // Call your model to find user details
    userModel.findUserDetail(userId, (err, result) => {
        if (err) return res.status(500).json({ message: err });
        if (result.length === 0) { // Corrected to check if the result is empty
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }
        console.log("Retrieved data: ", result[0]);
        return res.status(200).json({ success: true, data: result[0] });
    });
};

const updateProfile = async (req, res) => {
    const { userID, firstName, lastName} = req.body;

    if (!userID || !firstName || !lastName) {
        return res.status(400).json({ message: 'User ID and full name are required' });
    }

    try {
        await userModel.updateUserProfile(userID, firstName, lastName);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

// Controller for fetching the user's full name
const getUserFullName = async (req, res) => {
    const { userId } = req.body; // Expecting userId in the request body

    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Call the model function to fetch full name by userId
        const user = await userModel.findUserFullName(userId);
        
        if (!user) {
            // If no user found, send an error response
            return res.status(404).json({ message: 'User not found' });
        }

        // If user found, send the full name
        const fullName = `${user.firstName} ${user.lastName}`;
        res.status(200).json({ success: true, fullName });
    } catch (error) {
        console.error('Error fetching full name:', error);
        res.status(500).json({ message: 'Error fetching user full name' });
    }
};


module.exports = { register, login, fetchUserDetail, updateProfile, getUserFullName };
