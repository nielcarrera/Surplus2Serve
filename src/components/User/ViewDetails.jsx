import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";

function ViewDetails({ userId, name }) {
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            if (!userId) return; // Prevent fetch if userId is not available
            try {
                console.log("User Id: ", userId);
                const response = await axios.post('http://localhost:5000/auth/fetchUser', { userId });
                setUserData(response.data.data);
                console.log("Fetched data:", response.data.data); // Log the response data directly
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchdata();
    }, [userId]); // Add userId to the dependency array

    return (
        <main>
            <div className="container">
                <p>Name: {name}</p>
                
                {userData.length > 0 ? ( // Check if userData has any items
                    userData[0].role === 'verified' ? (
                        <div>
                            <p>Location: {userData[0].location}</p>
                            <p>Verified: Yes</p>
                        </div>
                    ) : (
                        <div>
                            <p>Location: {userData[0].location}</p>
                            <p>Verified: No </p>
                            <button onClick={() => { setModalOpen(true); }}>Verify Account</button>
                            <ImageUploadModal isOpen={isModalOpen} onClose={() => { setModalOpen(false); }} />
                        </div>
                    )
                ) : (
                    <p>No user data available.</p>
                )}
            </div>
        </main>
    );
}

export default ViewDetails;
