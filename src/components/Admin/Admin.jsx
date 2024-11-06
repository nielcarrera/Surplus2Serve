import React, { useState } from 'react';
import TimeRangeSlider from './dashBoard-component/TimeRangeSlider';
import DataTable from './dashBoard-component/DataTable';
import ActiveUser from './dashBoard-component/ActiveUser';

function Admin({ username }) {
  // Dummy Data for each type of card
  const data = {
    users: {
      '1d': 5,
      '1w': 30,
      '1m': 100,
      '1y': 300,
      'all': 500,
    },
    foodReceived: {
      '1d': 1,
      '1w': 5,
      '1m': 10,
      '1y': 12,
      'all': 20,
    },
    foodShared: {
      '1d': 3,
      '1w': 10,
      '1m': 15,
      '1y': 33,
      'all': 50,
    },
  };

  // State to manage the selected time range for each card
  const [userRange, setUserRange] = useState('all');
  const [foodSharedRange, setFoodSharedRange] = useState('all');
  const [foodReceivedRange, setFoodReceivedRange] = useState('all');

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>WELCOME BACK 
          <br /> <span>{username}</span>
        </h3>
      </div>

      <div className='main-cards'>
        {/* Card 1 - Total Users */}
        <div className='bg-white border border-gray-300 rounded-2xl p-6 relative'>
          <div className='c-inner'>
            <h3>TOTAL REQUESTS</h3>
          </div>
          <h1 className='text-5xl'>{data.users[userRange]}</h1>
          {/* TimeRangeSlider Component */}
          <TimeRangeSlider 
            cardType="users" 
            selectedRange={userRange} 
            onRangeChange={setUserRange} 
          />
          {/* Floating Icon */}
          <div className="absolute top-[-20px] right-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg">
            <span className="font-bold text-xl">U</span>
          </div>
        </div>

        {/* Card 2 - Food Shared */}
        <div className='bg-white border border-gray-300 rounded-2xl p-6 relative'>
          <div className='c-inner'>
            <h3>FOOD SHARED</h3>
          </div>
          <h1 className='text-5xl'>{data.foodShared[foodSharedRange]}</h1>
          {/* TimeRangeSlider Component */}
          <TimeRangeSlider 
            cardType="foodShared" 
            selectedRange={foodSharedRange} 
            onRangeChange={setFoodSharedRange} 
          />
          {/* Floating Icon */}
          <div className="absolute top-[-20px] right-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
            <span className="font-bold text-xl">S</span>
          </div>
        </div>

        {/* Card 3 - Food Received */}
        <div className='bg-white border border-gray-300 rounded-2xl p-6 relative'>
          <div className='c-inner'>
            <h3>FOOD RECEIVED</h3>
          </div>
          <h1 className='text-5xl'>{data.foodReceived[foodReceivedRange]}</h1>
          {/* TimeRangeSlider Component */}
          <TimeRangeSlider 
            cardType="foodReceived" 
            selectedRange={foodReceivedRange} 
            onRangeChange={setFoodReceivedRange} 
          />
          {/* Floating Icon */}
          <div className="absolute top-[-20px] right-2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg">
            <span className="font-bold text-xl">R</span>
          </div>
        </div>

        <DataTable/>
        <ActiveUser/>
      </div>
    </main>
  );
}

export default Admin;
