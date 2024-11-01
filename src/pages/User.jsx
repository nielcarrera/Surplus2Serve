import { useState } from 'react'
import '../components/Admin/Admin.css'
import User from '../components/User/User';
import Sidebar from '../components/User/Sidebar';

function Userpage() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview'); // Track active tab

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <User />;
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


  export default Userpage