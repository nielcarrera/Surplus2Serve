import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar, setActiveTab }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          S <span> 2 </span> <span2> S</span2>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => setActiveTab('Overview')}>
          <BsGrid1X2Fill className='icon'/> Overview
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('Requests')}>
          <BsFillArchiveFill className='icon'/> Food Post Request
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('Settings')}>
          <BsPeopleFill className='icon'/> Settings
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('Notifications')}>
        <BsListCheck className='icon'/> Notifications
        </li>
        </ul>
        </aside>
  );
}

export default Sidebar;



