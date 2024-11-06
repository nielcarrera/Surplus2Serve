import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ActiveUser() {
  // Dummy data for the last 5 months
  const data = [
    { name: 'Month 1', value: 250 },  // January
    { name: 'Month 2', value: 300 },  // February
    { name: 'Month 3', value: 280 },  // March
    { name: 'Month 4', value: 350 },  // April
    { name: 'Month 5', value: 400 },  // May
  ];

  // Custom Tooltip function
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { value } = payload[0];  // Get the value from the payload
      return (
        <div className="custom-tooltip bg-gray-800 text-white p-2 rounded-lg">
          <p className="label">{label}</p>
          <p className="value">{`Value: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* Remove the names on X-axis by disabling tick and axisLine */}
          <XAxis dataKey="name" tick={false} axisLine={false} />
          <YAxis />
          {/* Custom Tooltip Component */}
          <Tooltip content={<CustomTooltip />} />
          {/* Set the gap between bars using barCategoryGap */}
          <Bar dataKey="value" fill="#8884d8" barSize={10} barCategoryGap={5} />
        </BarChart>
      </ResponsiveContainer>
      <div className="texts">
        <h1 className='text-black'>Active Users</h1>
      </div>
    </div>
  );
}
