// ChatWindow.jsx
import React, { useState } from 'react';

function ChatWindow({ selectedConversation, messages, userID, onSendMessage }) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        alert(`Message to send: ${newMessage}`);
        onSendMessage(newMessage);
        setNewMessage('');
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
                    className="ml-3 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
