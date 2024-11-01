import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

function FoodFeed() {
    const [browseFood, setBrowseFood] = useState('');
    const [food, setFood] = useState([]);
    const [category, setCategory] = useState([]);
    const [scategory, setScategory] = useState('0');
    const [location, setLocation] = useState([]);
    const [slocation, setSlocation] = useState('0');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRequests, setFilteredRequests] = useState([]);

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
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = food.filter((food) => {
            const matchesSearchTerm = 
                browseFood === '' || 
                food.Foodname.toLowerCase().includes(browseFood.toLowerCase());
            const matchesCategory = 
                (scategory === '0') ||
                (scategory === food.Category);
            const matchesLocation = 
                (slocation === '0') || 
                (slocation === food.locationId);

            return matchesSearchTerm && matchesCategory && matchesLocation;
        });

        setFilteredRequests(filtered);
    };

    React.useEffect(() => {
        setFilteredRequests(food);
    }, []);
    return (
        <main>
            <div className='Searchbar'>
                <div className='SearchForm'>
                    <input 
                        type="text"
                        placeholder='Browse a food'
                        className='l-input-field'
                        value={browseFood}
                        onChange={(e) => setBrowseFood(e.target.value)}
                    />
                    <select 
                        value={scategory} 
                        onChange={(e) => setScategory(e.target.value)}>
                        <option value="0">Select a category:</option>
                        {category.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.foodCategory}</option>
                        ))}
                    </select>
                    <select 
                        value={slocation} 
                        onChange={(e) => setSlocation(e.target.value)}>
                        <option value="0">Select a location:</option>
                        {location.map(loc => (
                            <option key={loc.id} value={loc.locationID}>{loc.location}</option>
                        ))}  
                    </select>
                    <button className='search-button' onClick={handleSearch}>Search</button>
                </div>
                <div className="food-list">
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request, index) => (
                            <FoodCard
                                key={index}
                                name={request.Foodname}
                                quantity={request.quantity} // Ensure this field is correct
                                location={request.location} // Ensure this field is correct
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            Seems Empty
                        </div>
                    )}
                </div>    
            </div>
        </main>
    );
}

export default FoodFeed;
