function SearchSection({
    searchTerm,
    setSearchTerm,
    scategory,
    setScategory,
    slocation,
    setSlocation,
    handleSearch,
    category,
    location
  }) {
    return (
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 mb-6 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search for category, location, name, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
  
        <select
          value={scategory}
          onChange={(e) => setScategory(e.target.value)}
          className="w-full md:w-1/6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.foodCategory}>
              {cat.foodCategory}
            </option>
          ))}
        </select>
  
        <select
          value={slocation}
          onChange={(e) => setSlocation(e.target.value)}
          className="w-full md:w-1/6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Locations</option>
          {location.map((loc) => (
            <option key={loc.id} value={loc.location}>
              {loc.location}
            </option>
          ))}
        </select>
  
        <button
          onClick={handleSearch}
          className="w-full md:w-1/6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Search
        </button>
      </div>
    );
  }
  
  export default SearchSection;
  