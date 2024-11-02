import React, { useEffect, useState } from "react";
import ViewDetails from "./ViewDetails";
import MyAccountSidebar from "./user-components/MyAccountSidebar";
import { jwtDecode } from "jwt-decode";
import EditDetails from "./EditDetails";

function MyAccount() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [activeTab, setActiveTab] = useState('User Details');
    const [name, setName] = useState('');
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
                setName(decodedPayload.name); // Set the name state
            }
        } else {
            console.log('No token found.');
        }
    }, [token]); // Dependency on token

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Edit Details':
                return <EditDetails />;
            default:
                return <ViewDetails 
                    userId={userId}
                    name = {name} />; // Pass userId as a prop
        }
    };

    return (
        <div className='grid-container'>
            <MyAccountSidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
                setActiveTab={setActiveTab} // Pass the function to change the active tab
            />
            {renderContent()} {/* Render the active tab's content */}
        </div>
    );
}

export default MyAccount;
