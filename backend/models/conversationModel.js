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

module.exports = { getUserConversations, getMessagesByConversationId };
