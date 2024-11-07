const db = require('../config/db');

const insertImage = (id, filepath, callback) => {
    const query = 'INSERT INTO attachment (attachmentOwnerId, attachmentLocation) VALUES (?, ?)';
    db.query(query, [id, filepath], callback);
};

module.exports = {
    insertImage
};