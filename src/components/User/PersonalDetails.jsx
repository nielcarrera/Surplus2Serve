import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import EditProfile from "./user-components/EditProfile";

function PersonalDetails({ userId, name }) {
    const [userData, setUserData] = useState([]);
    const [location, setLocation] = useState([]);
    const [sloc, setSloc] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [username, setUsername] = useState('');
    const [updatedName, setUpdatedName] = useState(name);  // Store the updated name here
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        location: ''
    });
    const [isImageUploadModalOpen, setImageUploadModalOpen] = useState(false);
    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        console.log("Touched handleusernamesubmit", username);
        try{
            const response = await axios.put('http://localhost:5000/auth/update-user', {
                userID: userId,
                username: username
            });
            console.log(response.data);
        }catch(error){
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            try {
                const [dataResponse, locationResponse] = await Promise.all([
                    axios.post('http://localhost:5000/auth/fetchUser', { userId }),
                    axios.get('http://localhost:5000/api/locations')
                ]);

                setLocation(locationResponse.data);
                const fetchedUserData = dataResponse.data.data;

                setUserData(fetchedUserData);
                if (fetchedUserData.length > 0) {
                    setUsername(fetchedUserData[0].username);
                    setSloc(fetchedUserData[0].location);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [userId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleUploadImage = async () => {
        if (!imageFile) {
            alert("Please select an image file first.");
            return;
        }

        const formData = new FormData();
        formData.append("userID", userId);
        formData.append("attachmentLocation", imageFile);

        try {
            const response = await axios.post("http://localhost:5000/api/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert('Image uploaded successfully');
        } catch (error) {
            console.error("Error uploading image:", error);
            alert('Error uploading image');
        }
    };

    // Handle the update of name
    const handleNameChange = (newName) => {
        setUpdatedName(newName);  // Update the name in parent state
    };

    return (
        <main>
            <div className="container mx-auto p-4">
                <div className="cardContainer mb-4">
                    <label htmlFor="detailForm" className="font-bold text-lg">Personal Information</label>
                    <EditProfile 
                        userID={userId}
                        initialFullName={name} // Pass updated name as prop
                        onNameChange={handleNameChange} // Send the handler to update name
                    />
                </div>
                <div className="cardContainer mb-4">
                    <span className="font-bold text-lg">Account Status</span>
                    {userData.length > 0 ? (
                        userData[0].role === 'verified' ? (
                            <div className="mt-2">
                                <span>Verified: Yes</span>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <span>Verified: No </span>
                                <button
                                    onClick={() => { setImageUploadModalOpen(true); }}
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2"
                                >
                                    Verify Now
                                </button>
                                <ImageUploadModal 
                                    isOpen={isImageUploadModalOpen} 
                                    onClose={() => setImageUploadModalOpen(false)}
                                    userID={userId}
                                    imageFile={imageFile}
                                    onImageChange={handleImageChange}
                                    onUpload={handleUploadImage}
                                />
                            </div>
                        )
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                <div className="cardContainer mb-4">
                    <form onSubmit={handleUsernameSubmit}>
                        <div className="input-box">
                            <label htmlFor="username" className="block font-medium">USERNAME</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 w-full mt-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
                        >
                            Change Username
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default PersonalDetails;
