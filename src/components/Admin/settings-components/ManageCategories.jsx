import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // States for handling inline editing
  const [editingId, setEditingId] = useState(null); // Track which category is being edited
  const [editedName, setEditedName] = useState(''); // Track the edited category name

  useEffect(() => {
    axios.get('http://localhost:5000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/insertCategory', { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      // Send the DELETE request with categoryId as part of the URL
      await axios.delete(`http://localhost:5000/api/deleteCategory/${id}`);
  
      // If deletion is successful, remove the deleted category from the state
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      alert('Error deleting category: a foreign key constraint fails');
    }
  };
  
  const handleEditCategory = async (id, newName) => {
    try {
      // Send the updated category to the backend
      const response = await axios.post('http://localhost:5000/api/updateCategory', { 
        categoryId: id,
        category: newName 
      });
      // Update the category in the state with the new data from the response
      setCategories(categories.map(category => 
        category.id === id ? { ...category, foodCategory: response.data.foodCategory } : category
      ));
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };
  

  const handleKeyPress = (e, categoryId) => {
    if (e.key === 'Enter') {
      const newName = e.target.value;
      handleEditCategory(categoryId, newName);
      setEditingId(null); // Stop editing after saving
    }
  };

  const handleStartEditing = (categoryId, name) => {
    setEditingId(categoryId);
    setEditedName(name);
  };

  const handleStopEditing = () => {
    setEditingId(null);
    setEditedName('');
  };

  const handleSaveEdit = (categoryId) => {
    handleEditCategory(categoryId, editedName);
    handleStopEditing(); // Reset editing state after saving
  };

  return (
    <div>
      <h3>Manage Categories</h3>

      <form onSubmit={handleAddCategory} className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="border p-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2">Add Category</button>
      </form>

      <table className="min-w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                {/* Check if the category is being edited */}
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, category.id)}
                    className="border p-2"
                    autoFocus
                  />
                ) : (
                  category.foodCategory // Display category name if not in edit mode
                )}
              </td>
              <td>
                {/* Edit button triggers start editing */}
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleStopEditing}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStartEditing(category.id, category.foodCategory)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCategories;
