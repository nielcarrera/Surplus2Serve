const conversationModel = require('../models/conversationModel');

// Controller to fetch user conversations
const fetchUserConversations = (req, res) => {
    const userID = req.params.userID; // Get userID from the request parameters

    conversationModel.getUserConversations(userID, (err, results) => {
        if (err) {
            console.error('Error fetching conversations:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Check if results are empty
        if (!results.length) {
            return res.status(404).json({ message: 'No conversations found' });
        }

        // Send the results as JSON
        res.json(results);
    });
};

// Fetch messages for a specific conversation
const getMessagesForConversation = (req, res) => {
    const conversationId = req.params.conversationId; // Get the conversation ID from the request parameters

    conversationModel.getMessagesByConversationId(conversationId, (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results); // Send the results as a JSON response
    });
};

module.exports = { fetchUserConversations,  getMessagesForConversation};
