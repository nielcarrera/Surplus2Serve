import React from "react";
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';

function MyAccountSidebar({ openSidebarToggle, OpenSidebar, setActiveTab }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          S <span> 2 </span> <span2> S</span2>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => setActiveTab('User Details')}>
          <BsGrid1X2Fill className='icon'/> User Details
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('Edit Details')}>
          <BsFillArchiveFill className='icon'/> Edit Details
        </li>
        </ul>
        </aside>
  );
}

export default MyAccountSidebar;



