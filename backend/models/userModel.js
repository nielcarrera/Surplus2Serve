// models/userModel.js
const db = require('../config/db');

// Query to insert new user
const createUser = (username, hashedPassword, firstName, lastName, location, callback) => {
    const query = 'CALL CreateUser(?, ?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, firstName, lastName, location], callback);
};

// In your user model file
function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_tbl WHERE username = ?', [username], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}

function findUserFullName(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT firstName, lastName FROM userdetails_tbl WHERE userId = ?';
        console.log(`Executing query: ${query} with ID: ${id}`);

        db.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error executing query:', error); // Improved error logging
                return reject(error); // Reject the promise on error
            }
            
            if (results.length === 0) {
                console.warn(`No user found with ID: ${id}`);
                return resolve(null); // Resolve with null if no user is found
            }

            console.log('Query result:', results); // Log the result
            resolve(results[0]); // Resolve with the first matched row
        });
    });
}

function findUserRole(id){
    return new Promise((resolve, reject) => {
        const query = 'SELECT roleId FROM userrole_tbl WHERE userId = ?';
        console.log(`Executing query: ${query} with ID: ${id}`);

        db.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error executing query:', error); // Improved error logging
                return reject(error); // Reject the promise on error
            }
            
            if (results.length === 0) {
                console.warn(`No user found with ID: ${id}`);
                return resolve(null); // Resolve with null if no user is found
            }

            console.log('Query result:', results); // Log the result
            resolve(results[0]); // Resolve with the first matched row
        });
    });
}

function findUserDetail(id, callback){
    const query = `CALL GetUserDetails(?);`;
    db.query(query, [id], callback);
}

// Function to update user's full name
function updateUserProfile(userID, firstName, lastName) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE userdetails_tbl SET firstName = ?, lastName = ? WHERE userID = ?';
        db.query(query, [firstName, lastName, userID], (error, results) => {
            if (error) {
                console.error('Error updating profile:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

function uploadImage(attachmentOwnerId, attachmentLocation) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO attachment (attachmentOwnerId, attachmentLocation) VALUES (?, ?)';
        db.query(query, [attachmentOwnerId, attachmentLocation], (error, results) => {
            if (error) {
                console.error('ERROR UPLOADING IMAGE: ', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

function updateUsername(id, username){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user_tbl SET username = ? WHERE userID = ?';
        db.query(query, [username, id], (error, results) => {
            if (error) {
                console.error('Error updating profile:', error);
                return reject(error);
            }
            resolve(results);
        });
    });
}
module.exports = { 
    updateUsername,
    findUserByUsername, 
    createUser, 
    findUserFullName, 
    findUserRole, 
    findUserDetail, 
    updateUserProfile, 
    uploadImage};
