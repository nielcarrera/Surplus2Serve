import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";

function ViewDetails({userId, name}) {
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    console.log(userId);
    useEffect(() => {
        const fetchdata = async () => {
            try{
                console.log("User Id: ", userId);
                const response = await axios.post('http://localhost:5000/auth/fetchUser', {userId});
                setUserData(response.data.data);
                console.log("Fetched data:", userData[0]);
            }catch(err){
                console.error("Error fetching data:", err);
            }
        };
        fetchdata();
    }, []); // Dependency array includes token

    return (
        <main>
            <div className="container">
                <p>Name: {name}</p>
                
                {userData[0] ? (
                userData[0].role === 'verified' ? (
                    <div>
                        <p>Location: {userData[0].location}</p>
                        <p>Verified: Yes</p>
                    </div>
                ) : (
                    <div>
                        <p>Location: {userData[0].location}</p>
                        <p>Verified: No </p>
                        <button onClick={()=>{setModalOpen(true)}}>Verify Account</button>
                        <ImageUploadModal isOpen={isModalOpen} onClose={()=>{setModalOpen(false)}}/>
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
