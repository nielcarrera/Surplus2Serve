import React, { useState } from 'react';
import './Requests.css'; // Import the updated CSS styles

function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [filteredRequests, setFilteredRequests] = useState([]);
  
  // Sample data for requests
  const requests = [
    {
      id: 1,
      name: 'Jane Doe',
      date: '15/10/24',
      location: 'Salawag',
      category: 'Canned Goods',
      foodname: 'Chongke',
      quantity: 34,
    },
    {
        id: 2,
        name: 'Jane Doe',
        date: '15/10/24',
        location: 'Salawag',
        category: 'Canned Goods',
        foodname: 'Chongke',
        quantity: 34,
      },
      {
        id: 3,
        name: 'Mike',
        date: '15/10/24',
        location: 'Paliparan',
        category: 'Canned Goods',
        foodname: 'Chongke',
        quantity: 34,
      },
      {
        id: 4,
        name: 'Jane',
        date: '15/10/24',
        location: 'Area',
        category: 'Packed Foods',
        foodname: 'Chongke',
        quantity: 34,
      },
      
     

   
      

    // Add more request objects as needed
  ];

  const handleApprove = (id) => {
    // Logic for approving the request
    console.log(`Approved request with ID: ${id}`);
  };

  const handleDeny = (id) => {
    // Logic for denying the request
    console.log(`Denied request with ID: ${id}`);
  };

  const handleSearch = () => {
    // Categories for filtering (excluding 'Others')
    const predefinedCategories = ['Canned Goods', 'Packed Foods'];

    // Filter the requests based on the search criteria
    const filtered = requests.filter((request) => {
      // Matches search term to name or foodname (case-insensitive)
      const matchesSearchTerm = 
        searchTerm === '' || 
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.foodname.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the category is selected as 'Others' or matches a predefined category
      const matchesCategory = 
        (category === 'All') || 
        (category === 'Others' && !predefinedCategories.includes(request.category)) || 
        (request.category === category);

      // Check if the location matches
      const matchesLocation = location === 'All' || request.location === location;

      return matchesSearchTerm && matchesCategory && matchesLocation;
    });

    setFilteredRequests(filtered);
  };

  // Initialize filteredRequests with all requests on the first render
  React.useEffect(() => {
    setFilteredRequests(requests);
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>REQUESTS</h3>
      </div>

      <div className='request-controls'>
        <input 
          type='text' 
          placeholder='Search for category, location, name, etc...' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className='search-input'
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='search-select'>
          <option value='All'>All</option>
          <option value='Canned Goods'>Canned Goods</option>
          <option value='Packed Foods'>Packed Foods</option>
          <option value='Others'>Others</option>
          {/* Add more category options */}
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)} className='search-select'>
          <option value='All'>All</option>
          <option value='Paliparan'>Paliparan</option>
          <option value='Salawag'>Salawag</option>
          <option value='Salitran'>Salitran</option>
          <option value='Area'>Area</option>
          {/* Add more location options */}
        </select>

        <button className='search-button' onClick={handleSearch}>Search</button>
      </div>

      <div className='request-summary'>
        <div className='table-header'>
          <span>ID</span>
          <span>NAME</span>
          <span>DATE</span>
          <span>LOCATION</span>
          <span>CATEGORY</span>
          <span>FOODNAME</span>
          <span>QUANTITY</span>
          <span>ACTION</span>
        </div>
        
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div className='table-row' key={request.id}>
              <span>{request.id}</span>
              <span>{request.name}</span>
              <span>{request.date}</span>
              <span>{request.location}</span>
              <span>{request.category}</span>
              <span>{request.foodname}</span>
              <span>{request.quantity}</span>
              <span>
                <button className='approve-button' onClick={() => handleApprove(request.id)}>Approve</button>
                <button className='deny-button' onClick={() => handleDeny(request.id)}>Deny</button>
              </span>
            </div>
          ))
        ) : (
          <div className='no-results'>No results</div>
        )}
      </div>
    </main>
  );
}

export default Requests;
