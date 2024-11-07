const db = require('../config/db');

const fetchNotificationsById = (id, callback) => {
    const query = `SELECT * FROM notifications WHERE userID = ?;`;
    db.query(query, [id], callback);
};
const insertNotification = (id,type,message, callback) => {
    const query = `
    INSERT INTO 
        notifications (userID, type, message)
    VALUES
        (?,?,?)
    ;`;

    db.query(query, [id,type,message], callback);
}
module.exports = {
    fetchNotificationsById,
    insertNotification
}