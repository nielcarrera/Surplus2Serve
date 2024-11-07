const db = require('../config/db');

// Query to fetch all food category
const getAllFoodCategory = (callback) => {
    const query = 'SELECT * FROM foodcategory_tbl';
    db.query(query, callback);
};
const insertFoodCategory = (category, callback) => {
    const query = 'INSERT INTO foodcategory_tbl(foodCategory) VALUES (?);';
    db.query(query, [category], callback);
};
const updateFoodCategory = (id, category, callback) => {
    const query = 'UPDATE foodcategory_tbl SET foodCategory = ? WHERE id = ?;';
    db.query(query, [category, id], callback); // Correct query here
  };
const deleteFoodCategory = (id, callback) => {
    const query = "DELETE FROM foodcategory_tbl WHERE id = ?;";
    db.query(query, [id], callback);
};  
const getAllFood = (callback) => {
    const query = `
    SELECT 
        ud.userId,
        p.id AS foodId,
        CONCAT(ud.firstName, ' ', ud.lastName) AS Name,
        l.location,
        ul.locationId,
        p.foodName AS Foodname,
        p.datePosted AS Date,
        d.postedFoodCategory AS Category,
        fc.foodCategory AS CategoryName,
        d.quantity,
        d.expiry_date,
        d.availability,
        d.description,
        s.status AS FoodStatus  -- Adding status from postedfood_status table
    FROM 
        postedfood_tbl p
    JOIN 
        postedfood_dtl d ON p.id = d.postedFoodId
    JOIN 
        userdetails_tbl ud ON p.foodOwnerId = ud.userId
    JOIN 
        userlocation_tbl ul ON p.foodOwnerId = ul.userId
    JOIN 
        foodCategory_tbl fc ON d.postedFoodCategory = fc.id
    JOIN
        location l ON ul.locationId = l.locationID
    JOIN
        postedfood_status s ON p.id = s.postedFoodId;  -- Joining postedfood_status table to fetch the status

`;
    db.query(query, callback);
}
const fetchCategoryStats = (callback) => {
    const query = `
    SELECT 
        fct.id AS category_id,                  -- Get the ID of the food category
        fct.foodCategory,                       -- Get the name of the food category
        COUNT(CASE WHEN pfs.status = 'Approved' THEN 1 END) AS approved_count,  -- Count of approved requests
        COUNT(CASE WHEN pfs.status = 'Denied' THEN 1 END) AS denied_count,      -- Count of denied requests
        COUNT(pfs.id) AS total_count            -- Total requests (approved + denied)
    FROM 
        postedfood_dtl pfd
    JOIN 
        postedfood_status pfs ON pfd.postedFoodId = pfs.postedFoodId
    JOIN 
        foodcategory_tbl fct ON pfd.postedFoodCategory = fct.id
    GROUP BY 
        fct.id, fct.foodCategory;               -- Group by category ID and name
`;

    db.query(query,callback);
}
const updateFoodStatus = (id, status, callback) => {
    const query = 'UPDATE postedfood_status SET `status` = ? WHERE `id` = ?';
    db.query(query, [status, id], callback);
  };
const getFoodStats = (callback) => {
    const query = 'CALL GetFoodCounts;';
    db.query(query, callback);
};

const getMyFoodPosts = (userId, callback) => {
    const query = `CALL GetFoodPostsByOwner(?);`;

    db.query(query, [userId], callback);
};
const insertFoodPosted = (foodOwnerId, foodName, postedFoodCategory, quantity, expiryDate, availability, description, timestamp, predefinedStatus, predefinedTransactStatus, callback) => {
    // The query string with placeholders for the parameters
    const query = 'CALL InsertPostedFood(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the query with the provided parameters
    db.query(query, [
        foodOwnerId,        // foodOwnerId (should be an INT)
        foodName,           // foodName (should be a VARCHAR)
        postedFoodCategory, // postedFoodCategory (should be an INT - category ID)
        quantity,           // quantity (should be an INT)
        expiryDate,         // expiry_date (should be a DATE)
        availability,       // availability (should be a VARCHAR, e.g., "Available")
        description,        // description (should be a VARCHAR)
        timestamp,          // timestamp (should be a DATETIME value)
        predefinedStatus,   // predefinedStatus (should be a VARCHAR, e.g., "Pending for approval")
        predefinedTransactStatus // predefinedTransactStatus (should be a VARCHAR, e.g., "Open")
    ], callback);  // Execute and invoke the callback with results
};

function findUserDetail(id, callback){
    const query = `CALL GetUserDetails(?);`;
    db.query(query, [id], callback);
}
module.exports = { 
    getAllFoodCategory, 
    getAllFood, 
    fetchCategoryStats,
    getFoodStats,
    updateFoodStatus, 
    insertFoodCategory, 
    updateFoodCategory,
    deleteFoodCategory,
    insertFoodPosted,
    findUserDetail,
    getMyFoodPosts};