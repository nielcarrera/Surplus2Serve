import React, { useState } from 'react';

function ChatWindow({ selectedConversation, messages, userID, onSendMessage }) {
    const [newMessage, setNewMessage] = useState('');

    console.log('Selected Conversation:', selectedConversation); // Debugging line

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent sending empty messages

        let receiver_id;
        if (selectedConversation.interested_id !== userID) {
            receiver_id = selectedConversation.interested_id;
        } else {
            receiver_id = selectedConversation.owner_ID;
        }

        const messageData = {
            conversation_id: selectedConversation.conversation_id,
            sender_id: userID,
            receiver_id: receiver_id,
            message_text: newMessage,
        };

        await onSendMessage(messageData);
        setNewMessage(''); // Clear the input field after sending
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 mt-5 max-w-lg mx-auto">
            <div className="border-b border-gray-200 bg-gray-100 p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">{selectedConversation.foodName}</h2>
                <p className="text-sm text-gray-600">Owner: {selectedConversation.owner_name}</p>
            </div>
            <div className="chat-messages max-h-96 overflow-y-scroll p-4 flex flex-col space-y-2">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg ${
                                message.sender_id === userID
                                    ? 'bg-green-100 self-end'
                                    : 'bg-white self-start'
                            }`}
                        >
                            <strong className="block font-medium">
                                {message.sender_id === userID ? 'You' : selectedConversation.interested_user_name}
                            </strong>
                            <span className="text-sm">{message.message_text}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-sm">No messages yet.</div>
                )}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className={`ml-3 p-2 rounded-lg ${newMessage.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()} // Disable if the message is empty
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
