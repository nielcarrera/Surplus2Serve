CREATE DATABASE  IF NOT EXISTS `surplus2serve_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `surplus2serve_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: surplus2serve_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participant1_id` int(11) NOT NULL,
  `participant2_id` int(11) NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `participant1_id` (`participant1_id`,`participant2_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_conversations`
--

DROP TABLE IF EXISTS `food_conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_conversations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `food_id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `interested_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `foodcategory_tbl`
--

DROP TABLE IF EXISTS `foodcategory_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodcategory_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foodCategory` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `foodCategory` (`foodCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `locationID` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `conversation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message_text` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postedfood_dtl`
--

DROP TABLE IF EXISTS `postedfood_dtl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postedfood_dtl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postedFoodId` int(11) NOT NULL,
  `postedFoodCategory` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  `availability` enum('Yes','No') NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postedFoodId` (`postedFoodId`),
  KEY `postedFoodCategory` (`postedFoodCategory`),
  CONSTRAINT `postedFoodCategory` FOREIGN KEY (`postedFoodCategory`) REFERENCES `foodcategory_tbl` (`id`),
  CONSTRAINT `postedFoodId` FOREIGN KEY (`postedFoodId`) REFERENCES `postedfood_tbl` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postedfood_tbl`
--

DROP TABLE IF EXISTS `postedfood_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postedfood_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foodOwnerId` int(11) NOT NULL,
  `foodName` varchar(255) NOT NULL,
  `datePosted` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `foodOwnerId` (`foodOwnerId`),
  CONSTRAINT `foodOwnerId` FOREIGN KEY (`foodOwnerId`) REFERENCES `user_tbl` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userdetails_tbl`
--

DROP TABLE IF EXISTS `userdetails_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdetails_tbl` (
  `userDetailsID` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `dateCreated` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`userDetailsID`),
  KEY `userId` (`userId`),
  CONSTRAINT `userdetails_tbl_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_tbl` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userlocation_tbl`
--

DROP TABLE IF EXISTS `userlocation_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlocation_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locationId` (`locationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userlocation_tbl_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `location` (`locationID`),
  CONSTRAINT `userlocation_tbl_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user_tbl` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userrole_tbl`
--

DROP TABLE IF EXISTS `userrole_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userrole_tbl_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'surplus2serve_db'
--

--
-- Dumping routines for database 'surplus2serve_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `CreateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser`(IN `p_username` VARCHAR(50), IN `p_pass` VARCHAR(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_location` INT)
BEGIN
    DECLARE user_id INT;

    -- Insert into users table
    INSERT INTO user_tbl (username, password) VALUES (p_username, p_pass);
    
    -- Get the last inserted user id
    SET user_id = LAST_INSERT_ID();
    
    -- Insert into profiles table
    INSERT INTO userdetails_tbl (userId, firstName, lastName) 
    VALUES (user_id, p_firstName, p_lastName);

    -- Insert into locations table (assuming the location needs to be added if it doesn't exist)
    INSERT INTO userlocation_tbl (userId, locationId) 
    VALUES (user_id, p_location);
    
    -- Insert role into user role table
    INSERT INTO userrole_tbl(userId, roleId)
    VALUES (user_id, 2);
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserConversations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserConversations`(IN userID INT)
BEGIN
    SELECT 
        c.id AS conversation_id,
        f.id AS food_id,
        f.foodName,
        u1.userID as interested_userID,
        u2.userID as owner_userID,
        concat(ud1.firstName, " ", ud1.lastName) AS owner_name,  -- Owner's username
        concat(ud2.firstName, " ", ud2.lastName) AS interested_user_name, -- Interested user's username
        c.started_at
    FROM 
        conversations c
    LEFT JOIN 
        food_conversations fc ON c.id = fc.conversation_id
    LEFT JOIN 
        userdetails_tbl ud1 ON c.participant1_id = ud1.userID -- Owner of the food
    LEFT JOIN 
        userdetails_tbl ud2 ON c.participant2_id = ud2.userID -- Interested user
    LEFT JOIN 
        postedfood_tbl f ON fc.food_id = f.id
	LEFT JOIN
		user_tbl u1 ON c.participant1_id = u1.userID
	LEFT JOIN
		user_tbl u2 ON c.participant2_id = u2.userID
    WHERE 
        c.participant1_id = userID OR c.participant2_id = userID
    ORDER BY 
        c.started_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserDetails`(IN `userId` INT)
BEGIN
    SELECT 
        u.username,
        ur.roleId,
        r.roleName,
        ul.locationId,
        l.location
    FROM 
        user_tbl u 
    JOIN
        userrole_tbl ur ON ur.userId = u.userID
    JOIN 
        roles r ON r.roleId = ur.roleId
    JOIN
        userlocation_tbl ul ON ul.userId = u.userID
    JOIN 
        location l ON l.locationId = ul.locationId
    WHERE
        u.userID = userId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertConversation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertConversation`(
    IN p_participant1_id INT,
    IN p_participant2_id INT,
    IN p_message_text TEXT,
    IN p_food_id INT,
    IN p_interested_user_id INT
)
BEGIN
    DECLARE v_conversation_id BIGINT;

    -- Insert a new conversation if it doesn't already exist
    INSERT INTO conversations (participant1_id, participant2_id)
    VALUES (p_participant1_id, p_participant2_id)
    ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id); -- Use existing conversation id if it exists

    SET v_conversation_id = LAST_INSERT_ID(); -- Get the ID of the inserted or updated conversation

    -- Insert the message associated with the new or existing conversation
    INSERT INTO messages (conversation_id, sender_id, receiver_id, message_text)
    VALUES (v_conversation_id, p_participant1_id, p_participant2_id, p_message_text);

    -- Insert into food_conversations to associate food with the conversation
    INSERT INTO food_conversations (food_id, conversation_id, interested_user_id)
    VALUES (p_food_id, v_conversation_id, p_interested_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertPostedFood` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPostedFood`(IN `foodOwnerId` INT, IN `foodName` VARCHAR(255), IN `postedFoodCategory` INT, IN `quantity` INT, IN `expiry_date` DATE, IN `availability` VARCHAR(10), IN `description` VARCHAR(255))
BEGIN
    DECLARE lastPostedFoodId INT;

    -- Insert into postedfood_tbl and get the last inserted id
    INSERT INTO postedfood_tbl (foodOwnerId, foodName, datePosted) 
    VALUES (foodOwnerId, foodName, CURRENT_TIMESTAMP());

    SET lastPostedFoodId = LAST_INSERT_ID();

    -- Insert into postedfood_dtl using the last inserted id
    INSERT INTO postedfood_dtl (postedFoodId, postedFoodCategory, quantity, expiry_date, availability, description) 
    VALUES (lastPostedFoodId, postedFoodCategory, quantity, expiry_date, availability, description);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-03 23:22:42
