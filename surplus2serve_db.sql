-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 04:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser` (IN `p_username` VARCHAR(50), IN `p_pass` VARCHAR(100), IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_location` INT)   BEGIN
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

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `locationID` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`locationID`, `location`) VALUES
(1, 'Area - E'),
(2, 'Area - B');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdetails_tbl`
--

INSERT INTO `userdetails_tbl` (`userDetailsID`, `userId`, `firstName`, `lastName`, `dateCreated`) VALUES
(2, 2, 'Zedrick', 'Espere', '2024-10-24 01:56:33'),
(3, 3, 'Venniel', 'Carerra', '2024-10-24 01:57:14'),
(4, 4, 'fname', 'lname', '2024-10-24 02:23:38');

-- --------------------------------------------------------

--
-- Table structure for table `userlocation_tbl`
--

CREATE TABLE `userlocation_tbl` (
  `userLocationID` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `locationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlocation_tbl`
--

INSERT INTO `userlocation_tbl` (`userLocationID`, `userId`, `locationId`) VALUES
(2, 2, 1),
(3, 3, 1),
(4, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userrole_tbl`
--

CREATE TABLE `userrole_tbl` (
  `userRoleTblID` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userrole_tbl`
--

INSERT INTO `userrole_tbl` (`userRoleTblID`, `userId`, `roleId`) VALUES
(2, 2, 2),
(3, 3, 2),
(4, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `userID` int(11) NOT NULL,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`userID`, `username`, `password`) VALUES
(2, 'zed123', '1234'),
(3, 'vc123', '$2a$10$03UDeVfgFZiGppOUverWDOgLUiGABErGwc2OLXpJvCoLfdBIt5mx6'),
(4, 'f123', '$2a$10$LueI4IW17fZD8svLbq4DNeji2x5m0S7UTlS72Onpa3ML7bM9vQ2bG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`locationID`);

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
  ADD PRIMARY KEY (`userLocationID`),
  ADD KEY `locationId` (`locationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `userrole_tbl`
--
ALTER TABLE `userrole_tbl`
  ADD PRIMARY KEY (`userRoleTblID`),
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
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `locationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userdetails_tbl`
--
ALTER TABLE `userdetails_tbl`
  MODIFY `userDetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userlocation_tbl`
--
ALTER TABLE `userlocation_tbl`
  MODIFY `userLocationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userrole_tbl`
--
ALTER TABLE `userrole_tbl`
  MODIFY `userRoleTblID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

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
