import { useState, useEffect } from 'react';
import '../components/Admin/Admin.css';
import Sidebar from '../components/Admin/Sidebar';
import Admin from '../components/Admin/Admin';
import Requests from '../components/Admin/Requests';
import Settings from '../components/Admin/Settings';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Adminpage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // Track active tab
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');

  // Function to decode the token
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded; // Returns the decoded payload
    } catch (err) {
      console.error('Token decoding failed:', err);
      return null; // Return null if decoding fails
    }
  };

  // Fetch user data from token
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token
    if (token) {
      const decodedPayload = decodeToken(token);
      setUserID(decodedPayload?.id || ''); // Use optional chaining in case the token doesn't contain the id
    } else {
      console.log('No token found.');
    }
  }, []); // Empty dependency array ensures this effect only runs on mount

  // Fetch user name when userID changes
  useEffect(() => {
    const fetchName = async () => {
      if (!userID) return; // If no userID, don't proceed

      try {
        // Make sure the URL matches the backend endpoint
        const res = await axios.post('http://localhost:5000/auth/fetchName', { userId: userID });
        console.log(res.data);
        setUsername(res.data.fullName); // Set the full name in state
      } catch (error) {
        console.error('Error fetching full name:', error.response ? error.response.data : error.message);
      }
    };

    fetchName(); // Fetch name when userID is available
  }, [userID]); // This effect runs only when userID changes

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Admin username={username} />;
      case 'Requests':
        return <Requests />;
      case 'ActivityLog':
        return <ActivityLog />;
      case 'Settings':
        return <Settings userID={userID} fullName={username} />;
      default:
        return <Admin username={username} />;
    }
  };

  return (
    <div className='grid-container'>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setActiveTab={setActiveTab} // Pass the function to change the active tab
      />
      <div className="p-6 bg-gray-100 w-max">
        {renderContent()} {/* Render the active tab's content */}
      </div>
    </div>
  );
}

export default Adminpage;
