import React from 'react';
import PropTypes from 'prop-types'; // Optional, for type safety

function TimeRangeSlider({ cardType, selectedRange, onRangeChange }) {
  const ranges = ['1d', '1w', '1m', '1y', 'all'];

  return (
    <div className='time-range-slider'>
      {ranges.map((range) => (
        <button
          key={range}
          className={`btn ${selectedRange === range ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-2 rounded-md transition-all duration-200`}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

// Optional: Adding Prop Types for type checking
TimeRangeSlider.propTypes = {
  cardType: PropTypes.string.isRequired,
  selectedRange: PropTypes.string.isRequired,
  onRangeChange: PropTypes.func.isRequired,
};

export default TimeRangeSlider;
