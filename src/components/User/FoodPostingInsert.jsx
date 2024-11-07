import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodPosting from "./FoodPosting";
import FoodCard from "./FoodCard";
import Alert from "../alert";

function FoodPostingInsert({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [category, setCategory] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [location, setLocation] = useState([]);
  const [fetchPosts, setFetchPosts] = useState([]);
  const [formData, setFormData] = useState({
    foodOwnerId: id,
    foodName: "",
    postedFoodCategory: "",
    quantity: "",
    expiryDate: "",
    availability: "Yes",
    description: "",
    predefinedStatus: "Pending for approval",
    predefinedTransactStatus: "Open",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get("http://localhost:5000/api/category");
        const foodResponse = await axios.get(`http://localhost:5000/api/fetchPosts/${id}`);
  
        setCategory(categoryResponse.data);
        setFetchPosts(foodResponse.data);
        
        // Set filteredRequests here after data is fetched
        setFilteredRequests(foodResponse.data);
  
        console.log("Filtered Requests: ", foodResponse.data); // Log the fetched data
      } catch (err) {
        console.error("Error fetching categories or food posts:", err);
      }
    };
  
    fetchData();
  }, [id]); // Add 'id' as a dependency if the `id` might change over time  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePosting = async (e) => {
    e.preventDefault();

    // Validate that all required fields are present
    const {
      foodName,
      postedFoodCategory,
      quantity,
      expiryDate,
      availability,
      description,
    } = formData;
    console.log(formData);
    if (
      !foodName ||
      !postedFoodCategory ||
      !quantity ||
      !expiryDate ||
      !availability ||
      !description
    ) {
      alert("All fields are required");
      return setAlertMessage("All fields are required");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/insertFood",
        formData,
      );
      console.log(response.data);
      setAlertType("success");
      setAlertMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertType("error");
      setAlertMessage(
        error.response?.data?.message || "Error submitting post.",
      );
    }
  };

  return (
    <main>
      <div className="allPost">
        <div className="CreatePost">
          <button className="Food-Post" onClick={openModal}>
            Create Post
          </button>
        </div>
        <div className="PostFood">
          <FoodPosting isOpen={isModalOpen} onClose={closeModal}>
            <h2>Create a New Post</h2>
            <form className="food-posting" onSubmit={handlePosting}>
              <input
                type="text"
                placeholder="Food Name"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
              />
              <select
                name="postedFoodCategory" // Make sure this matches the formData key
                value={formData.postedFoodCategory}
                onChange={handleInputChange}
              >
                <option value="">Select a category:</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.foodCategory}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
              <input
                type="date"
                placeholder="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <button type="submit">Submit Post</button>
            </form>
          </FoodPosting>
        </div>
      </div>

      <div className="food-list">
        {/* Fix the condition to handle filteredRequests correctly */}
        {filteredRequests.length > 0 ? (
          filteredRequests[0].map((request, index) => (
            // Only render FoodCard if foodStatus is not 'pending for approval'
            request.FoodStatus !== 'Pending for approval' && (
              <FoodCard
                key={index}
                name={request.Foodname}
                quantity={request.quantity}
                location={request.location}
              />
            )
          ))
        ) : (
          <div className="no-results">No results.</div>
        )}

      </div>
    </main>
  );
}

export default FoodPostingInsert;
