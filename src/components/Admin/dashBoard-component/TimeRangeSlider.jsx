import React from 'react';

function TimeRangeSlider({ cardType, selectedRange, onRangeChange }) {
  const ranges = ['1d', '1w', '1m', '1y', 'all'];

  return (
    <div className='time-range-slider'>
      {ranges.map((range) => (
        <button
          key={range}
          className={`btn ${selectedRange === range ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

export default TimeRangeSlider;
