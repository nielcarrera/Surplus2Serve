import { useState } from 'react'
import '../components/Admin/Admin.css'
import User from '../components/User/User';
import Sidebar from '../components/User/Sidebar';
import FoodFeed from '../components/User/FoodFeed';
import MyAccount from '../components/User/MyAccount';
import MyTransactions from '../components/User/MyTransactions';
import { jwtDecode } from 'jwt-decode';

function Userpage() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // Track active tab
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
  let id = '';
  // Usage
  
  if (token) {
      const decodedPayload = decodeToken(token);
      console.log('Decoded Payload:', decodedPayload);
      id = decodedPayload.id;
      username = decodedPayload.name;
      console.log("Fetching from: user page", username, id);
  } else {
      console.log('No token found.');
  }
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'My Transactions':
        return <MyTransactions 
          userID={id}
        />;
      case 'Food Feed':
        return <FoodFeed/>;
      case 'My Account':
        return <MyAccount/>;
      default:
        return <User
          sessionName={username}
        />;
    }
  };

  return (
    <div className='grid-container'>
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
        setActiveTab={setActiveTab} // Pass the function to change the active tab
      />
      {renderContent()} {/* Render the active tab's content */}
    </div>
  );
}


  export default Userpage