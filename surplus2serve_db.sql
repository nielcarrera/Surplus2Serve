-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2024 at 03:31 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surplus2serve_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser` (IN `p_username` VARCHAR(50), IN `p_pass` VARCHAR(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_location` INT)  BEGIN
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
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPostedFood` (IN `foodOwnerId` INT, IN `foodName` VARCHAR(255), IN `postedFoodCategory` INT, IN `quantity` INT, IN `expiry_date` DATE, IN `availability` VARCHAR(10), IN `description` VARCHAR(255))  BEGIN
    DECLARE lastPostedFoodId INT;

    -- Insert into postedfood_tbl and get the last inserted id
    INSERT INTO postedfood_tbl (foodOwnerId, foodName, datePosted) 
    VALUES (foodOwnerId, foodName, CURRENT_TIMESTAMP());

    SET lastPostedFoodId = LAST_INSERT_ID();

    -- Insert into postedfood_dtl using the last inserted id
    INSERT INTO postedfood_dtl (postedFoodId, postedFoodCategory, quantity, expiry_date, availability, description) 
    VALUES (lastPostedFoodId, postedFoodCategory, quantity, expiry_date, availability, description);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `foodcategory_tbl`
--

CREATE TABLE `foodcategory_tbl` (
  `id` int(11) NOT NULL,
  `foodCategory` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `foodcategory_tbl`
--

INSERT INTO `foodcategory_tbl` (`id`, `foodCategory`) VALUES
(1, 'Canned Goods'),
(2, 'Dairy');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `locationID` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`locationID`, `location`) VALUES
(1, 'Area - E'),
(2, 'Area - B');

-- --------------------------------------------------------

--
-- Table structure for table `postedfood_dtl`
--

CREATE TABLE `postedfood_dtl` (
  `id` int(11) NOT NULL,
  `postedFoodId` int(11) NOT NULL,
  `postedFoodCategory` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  `availability` enum('Yes','No') NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postedfood_dtl`
--

INSERT INTO `postedfood_dtl` (`id`, `postedFoodId`, `postedFoodCategory`, `quantity`, `expiry_date`, `availability`, `description`) VALUES
(1, 3, 2, 10, '2024-11-30', 'Yes', 'Pampagana'),
(2, 4, 2, 10, '2024-11-30', 'Yes', 'Pampagana'),
(3, 5, 2, 10, '2024-11-30', 'Yes', 'Pampagana');

-- --------------------------------------------------------

--
-- Table structure for table `postedfood_tbl`
--

CREATE TABLE `postedfood_tbl` (
  `id` int(11) NOT NULL,
  `foodOwnerId` int(11) NOT NULL,
  `foodName` varchar(255) NOT NULL,
  `datePosted` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `postedfood_tbl`
--

INSERT INTO `postedfood_tbl` (`id`, `foodOwnerId`, `foodName`, `datePosted`) VALUES
(1, 7, 'Canned Goods', '2024-11-01 00:00:00'),
(2, 7, 'Chocolate', '2024-11-01 00:00:00'),
(3, 7, 'Sting na pula', '2024-11-01 19:08:44'),
(4, 7, 'Sting na pula', '2024-11-01 19:13:34'),
(5, 7, 'Sting na pula', '2024-11-01 22:27:20');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Verified');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails_tbl`
--

CREATE TABLE `userdetails_tbl` (
  `userDetailsID` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `dateCreated` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdetails_tbl`
--

INSERT INTO `userdetails_tbl` (`userDetailsID`, `userId`, `firstName`, `lastName`, `dateCreated`) VALUES
(2, 2, 'Zedrick', 'Espere', '2024-10-24 01:56:33'),
(3, 3, 'Venniel', 'Carerra', '2024-10-24 01:57:14'),
(4, 4, 'fname', 'lname', '2024-10-24 02:23:38'),
(5, 5, 'Adrian', 'Allidap', '2024-10-29 14:08:34'),
(6, 6, 'Adrian', 'Allidap', '2024-10-29 14:11:04'),
(7, 7, 'Zedrick', 'Espere', '2024-11-01 16:51:51');

-- --------------------------------------------------------

--
-- Table structure for table `userlocation_tbl`
--

CREATE TABLE `userlocation_tbl` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlocation_tbl`
--

INSERT INTO `userlocation_tbl` (`id`, `userId`, `locationId`) VALUES
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 1),
(7, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userrole_tbl`
--

CREATE TABLE `userrole_tbl` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userrole_tbl`
--

INSERT INTO `userrole_tbl` (`id`, `userId`, `roleId`) VALUES
(2, 2, 2),
(3, 3, 2),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2),
(7, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `userID` int(11) NOT NULL,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`userID`, `username`, `password`) VALUES
(2, 'zed123', '1234'),
(3, 'vc123', '$2a$10$03UDeVfgFZiGppOUverWDOgLUiGABErGwc2OLXpJvCoLfdBIt5mx6'),
(4, 'f123', '$2a$10$LueI4IW17fZD8svLbq4DNeji2x5m0S7UTlS72Onpa3ML7bM9vQ2bG'),
(5, 'eq123', '$2a$10$L6gnu2IU60KkQ74dgO0Gs.E3BW.agD7YxZ660wsZZPk7xFuPVsVrm'),
(6, 'eq1234', '$2a$10$JVmeUnjeBNQVNsolFwKhlOm1PIffCGeVm6RUMUaqrDVXDaJSJtsrS'),
(7, 'zed123456', '$2a$10$G9Sxmlpd15DZ0yO6DVClmuBJzvE8esTK3qOeXhwltnROM2XLwH.V.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foodcategory_tbl`
--
ALTER TABLE `foodcategory_tbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foodCategory` (`foodCategory`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`locationID`);

--
-- Indexes for table `postedfood_dtl`
--
ALTER TABLE `postedfood_dtl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postedFoodId` (`postedFoodId`),
  ADD KEY `postedFoodCategory` (`postedFoodCategory`);

--
-- Indexes for table `postedfood_tbl`
--
ALTER TABLE `postedfood_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foodOwnerId` (`foodOwnerId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `userdetails_tbl`
--
ALTER TABLE `userdetails_tbl`
  ADD PRIMARY KEY (`userDetailsID`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userlocation_tbl`
--
ALTER TABLE `userlocation_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `locationId` (`locationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userrole_tbl`
--
ALTER TABLE `userrole_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foodcategory_tbl`
--
ALTER TABLE `foodcategory_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `locationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `postedfood_dtl`
--
ALTER TABLE `postedfood_dtl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `postedfood_tbl`
--
ALTER TABLE `postedfood_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userdetails_tbl`
--
ALTER TABLE `userdetails_tbl`
  MODIFY `userDetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `userlocation_tbl`
--
ALTER TABLE `userlocation_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `userrole_tbl`
--
ALTER TABLE `userrole_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `postedfood_dtl`
--
ALTER TABLE `postedfood_dtl`
  ADD CONSTRAINT `postedFoodCategory` FOREIGN KEY (`postedFoodCategory`) REFERENCES `foodcategory_tbl` (`id`),
  ADD CONSTRAINT `postedFoodId` FOREIGN KEY (`postedFoodId`) REFERENCES `postedfood_tbl` (`id`);

--
-- Constraints for table `postedfood_tbl`
--
ALTER TABLE `postedfood_tbl`
  ADD CONSTRAINT `foodOwnerId` FOREIGN KEY (`foodOwnerId`) REFERENCES `user_tbl` (`userID`);

--
-- Constraints for table `userdetails_tbl`
--
ALTER TABLE `userdetails_tbl`
  ADD CONSTRAINT `userdetails_tbl_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_tbl` (`userID`);

--
-- Constraints for table `userlocation_tbl`
--
ALTER TABLE `userlocation_tbl`
  ADD CONSTRAINT `userlocation_tbl_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `location` (`locationID`),
  ADD CONSTRAINT `userlocation_tbl_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user_tbl` (`userID`);

--
-- Constraints for table `userrole_tbl`
--
ALTER TABLE `userrole_tbl`
  ADD CONSTRAINT `userrole_tbl_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
