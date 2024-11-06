import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchSection from './request-components/SearchSection';
import RequestRow from './request-components/RequestRow';
import Pagination from './request-components/Pagination';

function Requests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState([]);
  const [scategory, setScategory] = useState('All');
  const [location, setLocation] = useState([]);
  const [slocation, setSlocation] = useState('All');
  const [food, setFood] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Sorting states
  const [sortColumn, setSortColumn] = useState('foodId'); // Default column to sort by
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, foodResponse, locationResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/category'),
          axios.get('http://localhost:5000/api/foodPosted'),
          axios.get('http://localhost:5000/api/locations')
        ]);

        setCategory(categoryResponse.data);
        setFood(foodResponse.data);
        setLocation(locationResponse.data);

        setFilteredRequests(foodResponse.data);
        setTotalPages(Math.ceil(foodResponse.data.length / itemsPerPage));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Handle search and filter
  const handleSearch = () => {
    const filtered = food.filter((foodItem) => {
      const matchesSearchTerm = searchTerm === '' || foodItem.Foodname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = scategory === 'All' || foodItem.CategoryName === scategory;
      const matchesLocation = slocation === 'All' || foodItem.location === slocation;
      return matchesSearchTerm && matchesCategory && matchesLocation;
    });

    setFilteredRequests(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page
  };

  // Sorting function
  const sortData = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle direction

    const sorted = [...filteredRequests].sort((a, b) => {
      if (column === 'FoodStatus') {
        const statusOrder = { 'Pending for approval': 0, 'Approved': 1, 'Denied': 2 }; // Order for statuses
        return direction === 'asc'
          ? statusOrder[a[column]] - statusOrder[b[column]]
          : statusOrder[b[column]] - statusOrder[a[column]];
      }

      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortColumn(column);
    setSortDirection(direction);
    setFilteredRequests(sorted); // Update filtered requests
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get current page items
  const currentItems = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render sorting icon based on direction
  const getSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="text-left mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">FOOD POST REQUESTS</h3>
      </div>

      <SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        scategory={scategory}
        setScategory={setScategory}
        slocation={slocation}
        setSlocation={setSlocation}
        handleSearch={handleSearch}
        category={category}
        location={location}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-6xl mx-auto">
        {/* Table Header with Sort Buttons */}
        <div className="grid grid-cols-8 p-4 font-semibold text-gray-700 bg-gray-50 text-sm">
          <span onClick={() => sortData('foodId')} className="cursor-pointer">
            ID {getSortIcon('foodId')}
          </span>
          <span onClick={() => sortData('Name')} className="cursor-pointer">
            NAME {getSortIcon('Name')}
          </span>
          <span onClick={() => sortData('Date')} className="cursor-pointer">
            DATE {getSortIcon('Date')}
          </span>
          <span onClick={() => sortData('location')} className="cursor-pointer">
            LOCATION {getSortIcon('location')}
          </span>
          <span onClick={() => sortData('CategoryName')} className="cursor-pointer">
            CATEGORY {getSortIcon('CategoryName')}
          </span>
          <span onClick={() => sortData('Foodname')} className="cursor-pointer">
            FOODNAME {getSortIcon('Foodname')}
          </span>
          <span onClick={() => sortData('quantity')} className="cursor-pointer">
            QUANTITY {getSortIcon('quantity')}
          </span>
          <span onClick={() => sortData('FoodStatus')} className="cursor-pointer">
            ACTION {getSortIcon('FoodStatus')}
          </span>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((request, index) => (
            <RequestRow key={index} request={request} handleStatus={() => {}} />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No results</div>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </main>
  );
}

export default Requests;
