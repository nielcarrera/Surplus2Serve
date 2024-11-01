import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs';
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function User(){
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
        <main>
            <div className="name">Hello, {username}</div>
        </main>

    );
}

export default User