import React from 'react';
import './Sidebar.css';
import overview from '../../../assets/ov.png';
import request from '../../../assets/req.png';
import settings from '../../../assets/settings.png';
import notif from '../../../assets/notif.png';
import activity from '../../../assets/activity.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Surplus<span>2Serve</span></h2>
      </div>
      <div className="menu">
        <h4 className="menu-header">Admin Tools</h4>
        <ul>
          <li className="menu-item active">
          <img src={overview} alt="Overview" className="menu-icon" />
          Overview
          </li>
          <li className="menu-item">
            <img src={request} alt="Requests" className="menu-icon" />
            Requests
          </li>
          <li className="menu-item">
            <img src={settings} alt="Settings" className="menu-icon" />
            Settings
          </li>
          <li className="menu-item">
            <img src={notif} alt="Notifications" className="menu-icon" />
            Notifications
          </li>
          <li className="menu-item">
            <img src={activity} alt="Activity Log" className="menu-icon" />
            Activity Log
          </li>
        </ul>
      </div>
      <div className="logout">
        <img src="path-to-your-icon" alt="Log Out" className="menu-icon" />
        Log Out
      </div>
    </div>
  );
}

export default Sidebar;