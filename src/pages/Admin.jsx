import { useState } from 'react'
import '../components/Admin/Admin.css'
import Header from '../components/Admin/Header'
import Sidebar from '../components/Admin/Sidebar'
import Admin from '../components/Admin/Admin'
import Requests from '../components/Admin/Requests'; // Import the Requests component


function Adminpage() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // Track active tab

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Admin />;
      case 'Requests':
        return <Requests />;
      case 'ActivityLog':
        return <ActivityLog />;
      default:
        return <Admin />;
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


  export default Adminpage