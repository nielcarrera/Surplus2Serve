// config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Surplus2Serve_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

module.exports = db;
