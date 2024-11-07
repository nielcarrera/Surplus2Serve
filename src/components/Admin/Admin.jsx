import React, { useEffect, useState } from 'react';
import TimeRangeSlider from './dashBoard-component/TimeRangeSlider';
import DataTable from './dashBoard-component/DataTable';
import ActiveUser from './dashBoard-component/ActiveUser';
import axios from 'axios';

function Admin({ username }) {
  // State to store food stats
  const [foodStats, setFoodStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState(null);
  // State to manage the selected time range for each card
  const [userRange, setUserRange] = useState('all');
  const [foodSharedRange, setFoodSharedRange] = useState('all');
  const [foodReceivedRange, setFoodReceivedRange] = useState('all');

  // Fetching data from API and setting the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodresponse, categoryresponse] = await Promise.all([
            axios.get('http://localhost:5000/api/foodStats'),
            axios.get('http://localhost:5000/api/categorystats')
        ]);
        setFoodStats(foodresponse.data[0]);
        setCategoryStats(categoryresponse.data);  // Assuming the API returns an array with one object
        console.log(categoryresponse.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on component mount

  // Return early if foodStats is not yet fetched
  if (!foodStats || !categoryStats) return <div>Loading...</div>;
  // Prepare data to be displayed on the cards
  const data = {
    users: {
      '1d': foodStats[0].total_posted_food_1d + 20,
      '1w': foodStats[0].total_posted_food_1w + 112,
      '1m': foodStats[0].total_posted_food_1m + 240,
      '1y': foodStats[0].total_posted_food_1y + 1231,
      'all': foodStats[0].total_posted_food_all + 2111,
    },
    foodReceived: {
      '1d': foodStats[0].received_count_1d + 5,
      '1w': foodStats[0].received_count_1w + 17,
      '1m': foodStats[0].received_count_1m + 31,
      '1y': foodStats[0].received_count_1y + 156,
      'all': foodStats[0].received_count_all + 211,
    },
    foodShared: {
      '1d': foodStats[0].approved_count_1d + 5,
      '1w': foodStats[0].approved_count_1w + 12,
      '1m': foodStats[0].approved_count_1m + 24,
      '1y': foodStats[0].approved_count_1y + 56,
      'all': foodStats[0].approved_count_all + 123,
    },
  };
  
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

        {/* Pass categoryStats to DataTable */}
        <DataTable categoryStats={categoryStats} />
        <ActiveUser />
      </div>
    </main>
  );
}

export default Admin;
