import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs';
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Admin() {
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
    let username = '';
    // Usage
    
    if (token) {
        const decodedPayload = decodeToken(token);
        console.log('Decoded Payload:', decodedPayload);
        username = decodedPayload.name;
        console.log(username);
    } else {
        console.log('No token found.');
    }

    return (
        <main className='main-container'>

            <div className='main-title'>
                <h3>WELCOME BACK 
        <br></br> <span>{username}</span></h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL USERS </h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>FOOD SHARED</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>12</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>FOOD RECIEVED</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>33</h1>
                </div>
                
            </div>

            

        
        </main>
    )
}

export default Admin