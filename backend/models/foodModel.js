const db = require('../config/db');

// Query to fetch all food category
const getAllFoodCategory = (callback) => {
    const query = 'SELECT * FROM foodcategory_tbl';
    db.query(query, callback);
};
const getAllFood = (callback) => {
    const query = `
    SELECT 
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
        d.description
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
        location l ON ul.locationId = l.locationID;
`;
    db.query(query, callback);
}
module.exports = { getAllFoodCategory, getAllFood };