const db = require('../config/db'); // Adjust the path as necessary

// Query to fetch user conversations based on user ID
const getUserConversations = (userID, callback) => {
    const query = 'CALL GetUserConversations(?);';
    db.query(query, [userID], callback);
};
// Query to fetch messages by conversation ID
const getMessagesByConversationId = (conversationId, callback) => {
    const query = 'SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at ASC'; // Ordering by sent_at to show the messages in the correct sequence
    db.query(query, [conversationId], callback);
};
// Query to insert a new message
const insertMessage = (conversationId, senderId, receiverId, messageText, callback) => {
    const query = `
        INSERT INTO messages (conversation_id, sender_id, receiver_id, message_text, sent_at) 
        VALUES (?, ?, ?, ?, NOW())
    `;
    
    db.query(query, [conversationId, senderId, receiverId, messageText], (err, results) => {
        if (err) {
            console.error('Error inserting message:', err);
            return callback(err, null);
        }
        // Return the inserted message's ID and details
        callback(null, {
            id: results.insertId,
            conversationId,
            senderId,
            receiverId,
            messageText,
            sentAt: new Date(),
        });
    });
};
const createFoodConversation = (id1, id2, message, foodId, interestedId, callback) => {
    const query = 'CALL InsertConversation(?,?,?,?,?);';
    db.query(query, [id1, id2, message, foodId, interestedId], callback);
}
module.exports = { 
    getUserConversations, 
    getMessagesByConversationId, 
    insertMessage,
    createFoodConversation };
