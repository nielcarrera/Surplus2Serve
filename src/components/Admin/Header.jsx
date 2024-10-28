import React, { useState } from 'react';
import { BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <form onSubmit={handleSearchSubmit} className='search-form'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search...'
            className='search-input'
          />
          <button type='submit' className='search-button'>
            <BsSearch className='icon' />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
