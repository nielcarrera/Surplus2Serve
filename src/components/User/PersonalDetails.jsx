import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import "./css/personaldetails.css";
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
        location: '' // Assuming location is set by callSelect() or another input
    });
    useEffect(() => {
        const fetchdata = async () => {
            if (!userId) return; // Prevent fetch if userId is not available
            try {
                console.log("User Id: ", userId);
                const [dataResponse, locationResponse] = await Promise.all([
                    axios.post('http://localhost:5000/auth/fetchUser', { userId }),
                    axios.get('http://localhost:5000/api/locations')
                ]);
    
                setLocation(locationResponse.data);
                const fetchedUserData = dataResponse.data.data; // Get user data from response
    
                setUserData(fetchedUserData); // Set user data
    
                // Set username and location using the fetched data
                if (fetchedUserData.length > 0) {
                    setUsername(fetchedUserData[0].username);
                    setSloc(fetchedUserData[0].location);
                }
    
                console.log("Fetched data:", fetchedUserData); // Log the response data directly
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
    
        fetchdata();
    }, [userId]); // Add userId to the dependency array
    const callSelect = () => {
        return (
            <div className="input-box">
                <label>SELECT A LOCATION</label>
                <select 
                    value={sloc} 
                    onChange={(e) => setSloc(e.target.value)}
                >
                    <option value="All">All</option>
                    {location.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.location}</option>
                    ))}
                </select>
            </div>
        );
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value // Update specific input based on name
        }));
    };
    
    const handleSubmit = (formName) => (e) => {
        e.preventDefault(); // Prevent default form submission
        switch (formName) {
            case 'detailForm':
                console.log('Submitting Detail Form:', formData.firstname, formData.lastname, formData.location);
                // Add logic to save changes for first name, last name, and location
                break;
            case 'usernameForm':
                console.log('Changing Username:', formData.username);
                // Add logic to change username
                break;
            default:
                break;
        }
    };

    return (
        <main>
            <div className="container">
                <div className="cardContainer">
                    <label htmlFor="detailForm">Personal Information</label>
                    <form action="" name="detailForm" onSubmit={handleSubmit('detailForm')}>
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="fName">FIRST NAME</label>
                                <input type="text" name="fName" id="" value={firstname} />
                            </div>
                            <div className="input-box">
                                <label htmlFor="LName">LAST NAME</label>
                                <input type="text" name="LName" id="" value={lastname} />
                            </div>
                            {callSelect()}
                        </div>
                        <input type="submit" value="Save Changes" />
                    </form>
                </div>
                <div className="cardContainer">
                    <span>Account Status</span>
                    {userData.length > 0 ? ( // Check if userData has any items
                            userData[0].role === 'verified' ? (
                                <div>
                                    <span>Verified: Yes</span>
                                </div>
                            ) : (
                                <div>
                                    <span>Verified: No </span>
                                    <button onClick={() => { setModalOpen(true); }}>Verify Now</button>
                                    <ImageUploadModal isOpen={isModalOpen} onClose={() => { setModalOpen(false); }} />
                                </div>
                            )
                        ) : (
                            <p>No user data available.</p>
                        )}
                </div>
                <div className="cardContainer">
                    <form action="#" onSubmit={handleSubmit('usernameForm')}>
                        <div className="input-box">
                            <label htmlFor="username">USERNAME</label>
                            <input type="text"  value={username}/>
                        </div>
                        <input type="submit" value="Change Username" />
                    </form>
                </div>
            </div>
        </main>
    );
}

export default PersonalDetails;
