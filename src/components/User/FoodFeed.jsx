import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
function FoodFeed(){
    const [browseFood, setBrowseFood] = useState("");
    const [category, setCategory] = useState([]);
    const [food, setFood] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/category');
                setCategory(response.data);
                console.log(response.data);
            } catch(err){
                console.error('Error fetching locations: ', err.response.data);
            }
        };
        const fetchFood = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/foodPosted');
                setFood(response.data);
                console.log(response.data);
            } catch(err){
                console.error('Error fetching foods: ', err.response.data);
            }
        }
        fetchCategory();
        fetchFood();
    }, []);
    const handleSearch = () => {

    }
    return(
        <main>
            <div className='Searchbar'>
                <form className='SearchForm'>
                    <input 
                    type="text"
                    placeholder='Browse a food'
                    className='l-input-field'
                    value = {browseFood}
                    onChange={(e) => setBrowseFood(e.target.value)}
                    />
                    <select name="" id="">
                        <option value="0"> Select a category.</option>
                        {category.map(category => (
                            <option key={category.id} value={category.id}>{category.foodCategory}</option>
                        ))}
                    </select>
                    <input type="submit" value="Search" />
                </form>
                <div className="food-list">
                    {food.map((item, index) => (
                    <FoodCard 
                        key={index} 
                        name={item.Foodname} 
                        quantity={item.quantity} 
                        location={item.location} 
                    />
                    ))}
                </div>    
            </div>
        </main>
    );
}

export default FoodFeed