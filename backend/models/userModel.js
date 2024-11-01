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





module.exports = { findUserByUsername, createUser, findUserFullName, findUserRole};
