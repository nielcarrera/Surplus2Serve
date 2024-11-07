const foodModel = require('../models/foodModel');

const errorMessage = "Internal Server Error";

const getFoodCategory = (req, res) => {
    foodModel.getAllFoodCategory((err, results) => {
        if (err) return res.status(500).json({ message: errorMessage });
        res.json(results);
    });
};

const getFood = (req, res) => {
    foodModel.getAllFood((err, results) => {
        if (err) return res.status(500).json({ message: errorMessage});
        res.json(results);
    });
};

const fetchFoodPosts = (req, res) => {
  const { userId } = req.params; 
  foodModel.getMyFoodPosts(userId, (err, results) => {
    if (err) return res.status(500).json({ message: errorMessage});
    res.json(results);
});

};

const getFoodStats = (req, res) => {
  foodModel.getFoodStats((err, results) => {
    if (err) return res.status(500).json({ message: 'An error occurred' });
    res.json(results);
  });
};

const fetchCategoryStats = (req, res) => {
  foodModel.fetchCategoryStats((err, results) => {
    if (err) return res.status(500).json({ message: 'An error occurred' });
    res.json(results);
  });
};
const updateFoodStatus = (req, res) => {
    const { id, status } = req.body; // Get id and status from the request body
  
    // Validate input
    if (!id || !status) {
      return res.status(400).json({ message: 'ID and status are required' });
    }
  
    // Call the model to update the food status
    foodModel.updateFoodStatus(id, status, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating food status' });
      }
      
      // Check if any rows were affected
      if (result.affectedRows > 0) {
        return res.status(200).json({ 
            message: `Food status updated successfully to ${status}`,
            updatedStatus: status // Include the updated status in the response
          });
          
    } else {
        return res.status(404).json({ message: 'Food status not found' });
      }
    });
};

const insertFoodCategory = (req, res) => {
    const { name } = req.body;
  
    // Validate category
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
  
    // Call the model to insert the category into the database
    foodModel.insertFoodCategory(name, (err, result) => {
      if (err) {
        // Handle database errors
        console.error('Error inserting food category:', err);
        return res.status(500).json({ message: 'Failed to insert food category' });
      }
  
      if (result.affectedRows === 0) {
        // In case no rows were affected, indicating the insertion didn't succeed
        return res.status(400).json({ message: 'Category insertion failed' });
      }
  
      // Successfully inserted the category
      return res.status(201).json({
        success: true,
        message: 'Food category inserted successfully',
        id: result.insertId,
        foodCategory: name // You can return the inserted category ID if needed
      });
    });
};

const updateFoodCategory = (req, res) => {
    const { category, categoryId } = req.body;
  
    // Check if category and categoryId are provided
    if (!category || !categoryId) {
      return res.status(400).json({ message: 'Category name and Category ID are required' });
    }
  
    // Call the model function to update the food category
    foodModel.updateFoodCategory(categoryId, category, (err, result) => {
      if (err) {
        console.error('Error updating food category:', err);
        return res.status(500).json({ message: 'Error updating food category' });
      }
    
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
    
      // Log result for debugging
      console.log('Update result:', result);
    
      // Return the updated category
      res.status(200).json({ id: categoryId, foodCategory: category });
    });
    
};
  
const deleteFoodCategory = (req, res) => {
    // Get categoryId from the request parameters (from the URL)
    const { categoryId } = req.params;
    console.log('Received categoryId:', categoryId);  // Log to check if it's correctly received
  
    // Check if categoryId is provided
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }
  
    // Call the model function to delete the food category
    foodModel.deleteFoodCategory(categoryId, (err, result) => {
      if (err) {
        console.error('Error deleting food category:', err);
        return res.status(500).json({ message: err });
      }
  
      // If no rows are affected, the category was not found
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Successfully deleted the category
      res.status(200).json({ message: 'Category deleted successfully', id: categoryId });
    });
};



// Create a new food post
const createFoodPost = (req, res) => {
  // Destructure fields from the request body
  const { 
    foodOwnerId, 
    foodName, 
    postedFoodCategory, 
    quantity, 
    expiryDate, 
    availability, 
    description 
  } = req.body;

  console.log(req.body);

  // Validate required fields
  if (!foodOwnerId || !foodName || !postedFoodCategory || !quantity || !expiryDate || !availability || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate field types and values
  if (typeof foodName !== 'string' || foodName.trim() === '') {
    return res.status(400).json({ message: 'Food name must be a valid string' });
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  if (isNaN(Date.parse(expiryDate))) {
    return res.status(400).json({ message: 'Expiry date must be a valid date' });
  }

  if (typeof availability !== 'string' || !['Yes', 'No'].includes(availability)) {
    return res.status(400).json({ message: 'Availability must be "Available" or "Not Available"' });
  }

  //Prepare the current timestamp
  const timestamp = new Date();

  // Default values for status
  const predefinedStatus = "Pending for approval";
  const predefinedTransactStatus = "Open";

  // Call the model to insert the food post
  foodModel.insertFoodPosted(
    foodOwnerId,
    foodName,
    postedFoodCategory,
    quantity,
    expiryDate,
    availability,
    description,
    timestamp,
    predefinedStatus,
    predefinedTransactStatus,
    (err, results) => {
      if (err) {
        console.error("Error inserting food post:", err);
        return res.status(500).json({ message: err.message || 'Error inserting food post' });
      }

      // If the insertion was successful, send a success message
      return res.status(201).json({
        message: 'Food post created successfully',
        foodPostId: results.insertId, // assuming results.insertId contains the new post ID
      });
    }
  );
};

const fetchUserDetail = async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body
  console.log("User Id:", userId); // Check if userId is received correctly

  // Call your model to find user details
  foodModel.findUserDetail(userId, (err, result) => {
      if (err) return res.status(500).json({ message: err });
      if (result.length === 0) { // Corrected to check if the result is empty
          console.log("User not found");
          return res.status(400).json({ message: 'User not found' });
      }
      console.log("Retrieved data: ", result[0]);
      return res.status(200).json({ success: true, data: result[0] });
  });
};
  

  
module.exports = { 
  getFoodCategory, 
  getFood, 
  fetchCategoryStats,
  getFoodStats,
  updateFoodStatus, 
  insertFoodCategory, 
  updateFoodCategory,
  deleteFoodCategory,
  createFoodPost,
  fetchUserDetail,
  fetchFoodPosts };