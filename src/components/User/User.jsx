import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';
import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs';
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function User({sessionName}){
    return (
        <main>
            <div className="name">Hello, {sessionName}</div>
        </main>

    );
}

export default User