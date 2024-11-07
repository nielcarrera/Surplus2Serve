import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodPosting from "./FoodPosting";
import FoodCard from "./FoodCard";
import Alert from "../alert";

function FoodPostingInsert({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [category, setCategory] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
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
        setFilteredRequests(foodResponse.data);
        console.log(foodResponse.data);
      } catch (err) {
        console.error("Error fetching categories or food posts:", err);
      }
    };

    fetchData();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentFood(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePosting = async (e) => {
    e.preventDefault();

    const { foodName, postedFoodCategory, quantity, expiryDate, availability, description } = formData;

    if (!foodName || !postedFoodCategory || !quantity || !expiryDate || !availability || !description) {
      alert("All fields are required");
      return setAlertMessage("All fields are required");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/insertFood", formData);
      setAlertType("success");
      setAlertMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertType("error");
      setAlertMessage(error.response?.data?.message || "Error submitting post.");
    }
  };

  const openUpdateModal = (food) => {
    setCurrentFood(food);
    setFormData({
      foodOwnerId: id,
      foodName: food.Foodname,
      postedFoodCategory: food.categoryId,
      quantity: food.quantity,
      expiryDate: food.expiryDate,
      availability: food.availability,
      description: food.description,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateFood/${currentFood.foodId}`,
        formData
      );
      setAlertType("success");
      setAlertMessage(response.data.message);
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating food post:", error);
      setAlertType("error");
      setAlertMessage(error.response?.data?.message || "Error updating post.");
    }
  };

  return (
    <main>
      <div className="allPost">
        <div className="CreatePost">
          <button
            className="Food-Post px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={openModal}
          >
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
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <select
                name="postedFoodCategory"
                value={formData.postedFoodCategory}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
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
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <label htmlFor="expiryDate">Expiration Date: </label>
              <input
                type="date"
                placeholder="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />

              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Post
              </button>
            </form>
          </FoodPosting>
        </div>
      </div>

      <div className="food-list">
        {filteredRequests.length > 0 ? (
          filteredRequests[0].map((request, index) => (
            request.FoodStatus !== 'Pending for approval' && (
              <div key={index}>
                <FoodCard
                  name={request.Foodname}
                  quantity={request.quantity}
                  location={request.location}
                />
                <button
                  onClick={() => openUpdateModal(request)}
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Update Post
                </button>
              </div>
            )
          ))
        ) : (
          <div className="no-results">No results.</div>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Post</h2>
            <form className="update-form" onSubmit={handleUpdate}>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                placeholder="Food Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <select
                name="postedFoodCategory"
                value={formData.postedFoodCategory}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
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
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="Expiry Date"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={closeUpdateModal}
                className="w-full py-2 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default FoodPostingInsert;
