import React, { useEffect } from "react";

const CustomAlert = ({ message, onClose, duration = 3000, type = 'info' }) => {
    useEffect(() => {
        // Set a timer to automatically close the alert
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    // Define styles based on alert type
    const alertStyles = {
        info: {
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            border: '1px solid #bee5eb'
        },
        success: {
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb'
        },
        warning: {
            backgroundColor: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeeba'
        },
        error: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb'
        }
    };

    const { backgroundColor, color, border } = alertStyles[type] || alertStyles.info;

    return (
        <div style={{
            position: 'absolute',
            bottom: '20px', // Adjust as needed for spacing
            left: '20px', // Adjust as needed for spacing
            padding: '20px',
            backgroundColor: backgroundColor,
            color: color,
            border: border,
            borderRadius: '5px',
            margin: '10px 0',
            zIndex: 1000, // Ensure it appears above other elements
        }}>
            <span>{message}</span>
            <button onClick={onClose} style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer' }}>Close</button>
        </div>
    );
};

export default CustomAlert;
