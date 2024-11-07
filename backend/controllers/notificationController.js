const notifModel = require('../models/notificationModel');

const fetchNotificationsById = (req,res) => {
    const  userId  = req.params.userId;
    if(!userId){
        return res.status(400).json({ message: 'ID is required' });
    }

    notifModel.fetchNotificationsById(userId, (err, result) => {
        if (err) {
            return res.status(500).json({message: 'Error fetching notifications'});
        }
        // Check if there are notifications in the result
        if (result && result.length > 0) {
            res.json(result); // Return the notifications
        } else {
            res.status(200).json({ message: 'No notifications found' }); // Return a 404 if no notifications
        }
    });
};
const insertNotificationById = (req,res) => {
    const {id, type, message} = req.body;

    if(!id || !type || !message){
        return res.status(400).json({message: 'All fields required'});
    }

    notifModel.insertNotification(id,type,message, (err,result) => {
        if(err) {
            return res.status(500).json({message: 'Error inserting notification' + err})
        }
        return res.status(200).json({message: 'Notification Created Successfully'});
    });
};
module.exports = {
    fetchNotificationsById,
    insertNotificationById
}