import React, { useEffect, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import { jwtDecode } from "jwt-decode";

function MyAccount({fullName}) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [activeTab, setActiveTab] = useState('User Details');
    const [userId, setUserId] = useState(''); // Use state for userId
    const token = localStorage.getItem('jwtToken'); // Retrieve the token
    // Function to decode the token
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded; // Returns the decoded payload
        } catch (err) {
            console.error('Token decoding failed:', err.message);
            return null; // Return null if decoding fails
        }
    };

    useEffect(() => {
        if (token) {
            const decodedPayload = decodeToken(token);
            
            if (decodedPayload) {
                console.log(decodedPayload);
                setUserId(decodedPayload.id); // Set userId state
            }
        } else {
            console.log('No token found.');
        }
    }, [token]); // Only depend on `token` to decode it

    return (
        <div className='grid-container'>
            <PersonalDetails
                userId={userId}
                name={fullName}
            />
        </div>
    );
}

export default MyAccount;
