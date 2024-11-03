import React, { useEffect, useState } from 'react';
import ConversationHeader from './ConversationHeader';
import axios from 'axios';

function TransactionSidebar({ openSidebarToggle, OpenSidebar, userID, onConversationClick }) {
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/conversations/${userID}`);
                
                const uniqueConversations = {};
                response.data[0].forEach(item => {
                    const conversationId = item.conversation_id;

                    if (!uniqueConversations[conversationId]) {
                        uniqueConversations[conversationId] = {
                            conversation_id: conversationId,
                            food_id: item.food_id,
                            foodName: item.foodName,
                            owner_name: item.owner_name,
                            owner_ID: item.owner_userID,
                            interested_user_name: item.interested_user_name,
                            interested_id: item.interested_userID,
                            started_at: item.started_at,
                            messages: []
                        };
                    }

                    if (item.message_id) {
                        uniqueConversations[conversationId].messages.push({
                            message_id: item.message_id,
                            sender_id: item.sender_id,
                            receiver_id: item.receiver_id,
                            message_text: item.message_text,
                            sent_at: item.sent_at
                        });
                    }
                });

                const conversationsArray = Object.values(uniqueConversations);
                setConversations(conversationsArray);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching conversations:', err);
            }
        };
        fetchConversations();
    }, [userID]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    S <span> 2 </span> <span2> S</span2>
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <div className="conversation-headers">
                {conversations.map((conversation) => (
                    <div key={conversation.conversation_id} onClick={() => onConversationClick(conversation)}>
                        <ConversationHeader 
                            foodName={conversation.foodName}
                            ownerName={conversation.owner_name}
                        />
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default TransactionSidebar;
