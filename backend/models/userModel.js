// models/userModel.js
const db = require('../config/db');

// Query to insert new user
const createUser = (username, hashedPassword, firstName, lastName, location, callback) => {
    const query = 'CALL CreateUser(?, ?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, firstName, lastName, location], callback);
};

// In your user model file
const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user_tbl WHERE username = ?';
        db.query(query, [username], (err, result) => {
            if (err) {
                return reject(err); // Reject the promise on error
            }
            resolve(result); // Resolve the promise with the result
        });
    });
};

// Assuming you want to keep findUserFullName similar
const findUserFullName = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM userdetails_tbl WHERE id = ?';
        console.log(`Executing query: ${query} with ID: ${id}`); // Log the query
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log('Query result:', result); // Log the result
            resolve(result);
        });
    });
};



module.exports = { findUserByUsername, createUser, findUserFullName};
