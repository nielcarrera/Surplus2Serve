import React, { useState, useEffect } from 'react';
import TransactionSidebar from './user-components/TransactionSidebar';
import ChatWindow from './user-components/ChatWindow'; // Import the new component
import axios from 'axios';

function MyTransactions({ userID }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
    const [activeTab, setActiveTab] = useState("Overview");
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    const toggleSidebar = () => setOpenSidebarToggle(!openSidebarToggle);

    const handleConversationClick = async (conversation) => {
        console.log('Conversation clicked:', conversation);
        setSelectedConversation(conversation);
        await fetchMessages(conversation.conversation_id); // Fetch messages linked to the conversation
    };

    // Fetch messages for the selected conversation
    const fetchMessages = async (conversationId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}`);
            setMessages(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching messages:', err);
        }
    };

    // Handle sending a message
    const handleSendMessage = (message) => {
        console.log('Sending message:', message); // You can implement actual sending logic here
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <TransactionSidebar 
                openSidebarToggle={openSidebarToggle} 
                OpenSidebar={toggleSidebar} 
                setActiveTab={setActiveTab} 
                userID={userID} 
                onConversationClick={handleConversationClick} 
            />
            <main style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', marginLeft: openSidebarToggle ? '250px' : '0', transition: 'margin-left 0.3s' }}>
                <div className="container">
                    <h1>Transaction Page</h1>
                    <p>Content related to transactions will go here.</p>

                    {/* Chat Interface */}
                    {selectedConversation ? (
                        <ChatWindow // Use the new ChatWindow component
                            selectedConversation={selectedConversation}
                            messages={messages}
                            userID={userID}
                            onSendMessage={handleSendMessage} // Pass the handler
                        />
                    ) : (
                        <p>Select a conversation to view messages.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MyTransactions;
