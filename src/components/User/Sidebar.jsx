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
        <li className='sidebar-list-item' onClick={() => setActiveTab('Food Feed')}>
          <BsFillArchiveFill className='icon'/> Food Feed
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('My Surplus')}>
          <BsFillGrid3X3GapFill className='icon'/> My Surplus
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('My Transactions')}>
          <BsFillGrid3X3GapFill className='icon'/> My Transactions
        </li>
        <li className='sidebar-list-item' onClick={() => setActiveTab('My Account')}>
          <BsFillGrid3X3GapFill className='icon'/> My Account
        </li>
        </ul>
        </aside>
  );
}

export default Sidebar;



