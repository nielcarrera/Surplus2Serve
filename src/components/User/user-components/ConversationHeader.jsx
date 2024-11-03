import React from 'react';

function ConversationHeader({ 
    foodName, 
    ownerName, 
    onClick = () => {}
}) {
    return (
        <div 
            className="conversation-header" 
            style={styles.header} 
            onClick={onClick} // Attach the click handler
        >
            <div className="circle-icon" style={styles.circleIcon}>
                {ownerName ? ownerName.charAt(0) : '?'} {/* Display the first letter of the owner's name or a placeholder if ownerName is null */}
            </div>
            <div style={styles.textContainer}> {/* New style for text container */}
                <strong>{foodName}</strong>
                <span>{ownerName || 'Unknown'}</span> {/* Fallback if ownerName is null */}
            </div>
        </div>
    );
}
// Example inline styles for the header
const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
    circleIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50', // You can customize the color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    textContainer: { // New style for text container
        display: 'flex',
        flexDirection: 'column',
    },
};

export default ConversationHeader;
