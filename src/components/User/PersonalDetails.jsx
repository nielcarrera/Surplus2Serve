import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";

function PersonalDetails({ userId, name }) {
    const [userData, setUserData] = useState([]);
    const [location, setLocation] = useState([]);
    const [sloc, setSloc] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [firstname, lastname] = name.split(" ");
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        location: ''
    });

    useEffect(() => {
        const fetchdata = async () => {
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
    
        fetchdata();
    }, [userId]);

    const callSelect = () => (
        <div className="input-box">
            <label>SELECT A LOCATION</label>
            <select 
                value={sloc} 
                onChange={(e) => setSloc(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mt-1"
            >
                <option value="All">All</option>
                {location.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.location}</option>
                ))}
            </select>
        </div>
    );
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (formName) => (e) => {
        e.preventDefault();
        switch (formName) {
            case 'detailForm':
                console.log('Submitting Detail Form:', formData.firstname, formData.lastname, formData.location);
                break;
            case 'usernameForm':
                console.log('Changing Username:', formData.username);
                break;
            default:
                break;
        }
    };

    return (
        <main>
            <div className="container mx-auto p-4">
                <div className="cardContainer mb-4">
                    <label htmlFor="detailForm" className="font-bold text-lg">Personal Information</label>
                    <form name="detailForm" onSubmit={handleSubmit('detailForm')}>
                        <div className="input-container mb-4">
                            <div className="input-box">
                                <label htmlFor="fName" className="block font-medium">FIRST NAME</label>
                                <input type="text" name="fName" value={firstname} className="border border-gray-300 rounded px-3 py-2 w-full mt-1" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="LName" className="block font-medium">LAST NAME</label>
                                <input type="text" name="LName" value={lastname} className="border border-gray-300 rounded px-3 py-2 w-full mt-1" />
                            </div>
                            {callSelect()}
                        </div>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Save Changes
                        </button>
                    </form>
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
                                <button onClick={() => { setModalOpen(true); }} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2">
                                    Verify Now
                                </button>
                                <ImageUploadModal isOpen={isModalOpen} onClose={() => { setModalOpen(false); }} />
                            </div>
                        )
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                <div className="cardContainer mb-4">
                    <form onSubmit={handleSubmit('usernameForm')}>
                        <div className="input-box">
                            <label htmlFor="username" className="block font-medium">USERNAME</label>
                            <input type="text" value={username} className="border border-gray-300 rounded px-3 py-2 w-full mt-1" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2">
                            Change Username
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default PersonalDetails;
