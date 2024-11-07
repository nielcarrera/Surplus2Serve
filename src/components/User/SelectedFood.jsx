import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function SelectedFood() {
    const location = useLocation();
    const foodDetails = location.state; // The passed state will be available here

    const token = localStorage.getItem('jwtToken'); // Retrieve the token
    // Function to decode the token
    const decodeToken = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded; // Returns the decoded payload
      } catch (err) {
        console.error("Token decoding failed:", err.message);
        return null; // Return null if decoding fails
      }
    };
    let sessionId = '';
    // Usage
  
    if (token) {
        const decodedPayload = decodeToken(token);
        console.log('Decoded Payload:', decodedPayload);
        sessionId = decodedPayload.id;
        console.log("Fetching from: selectedfood page", sessionId);
    } else {
      console.log("No token found.");
    }

    const [message, setMessage] = useState("I'm interested!"); // State for the message input

    // Function to handle the message submission
    const handleSendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (message.trim() === "") {
            alert("Please enter a message before sending.");
            return;
        }

        // Display the values of inputs in the form
        console.log("Message sent: ", message);
        console.log("Food Owner ID: ", foodDetails.ownerId);
        try{
            const res = await axios.post('http://localhost:5000/api/createFoodConversation',{
                id1: sessionId,
                id2: foodDetails.ownerId,
                message: message,
                foodId: foodDetails.foodid,
                interestedId: sessionId
            });
            console.log(res.data);
        }catch(err){
            console.error(err);
        }
        // Clear the message input field after displaying the values
        setMessage("");
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6">
                {/* Image Section */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGZvb2R8ZW58MHx8fHwxNjE2MjAyNzU1&ixlib=rb-1.2.1&q=80&w=400" // Open-source food image from Unsplash
                        alt={foodDetails.name}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                {/* Details Section */}
                <div className="w-full md:w-2/3 md:pl-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">{foodDetails.name}</h2>
                    <p className="text-xl text-gray-600 mb-4">Quantity: {foodDetails.quantity}</p>
                    <p className="text-lg text-gray-700 mb-6">{foodDetails.description}</p>

                    {/* Status Section */}
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-lg font-medium text-gray-800">Status:</span>
                        <span className="text-green-600 font-semibold">Available</span>
                    </div>

                    {/* Message Form */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Send a Message</h3>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <input type="hidden" value={foodDetails.ownerId} />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message here..."
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <p className="text-gray-600 mt-2">For further inquiries, please contact the food owner through the form above.</p>
            </div>
        </div>
    );
}
