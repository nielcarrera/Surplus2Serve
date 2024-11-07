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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_conversations`
--

LOCK TABLES `food_conversations` WRITE;
/*!40000 ALTER TABLE `food_conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_conversations` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodcategory_tbl`
--

LOCK TABLES `foodcategory_tbl` WRITE;
/*!40000 ALTER TABLE `foodcategory_tbl` DISABLE KEYS */;
INSERT INTO `foodcategory_tbl` VALUES (1,'Canned Goods'),(2,'Dairy');
/*!40000 ALTER TABLE `foodcategory_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Area - a'),(2,'Area - n');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postedfood_dtl`
--

LOCK TABLES `postedfood_dtl` WRITE;
/*!40000 ALTER TABLE `postedfood_dtl` DISABLE KEYS */;
INSERT INTO `postedfood_dtl` VALUES (1,1,1,88,'2024-12-07','Yes','Description for Food Item 1'),(2,2,1,81,'2025-06-22','Yes','Description for Food Item 2'),(3,3,2,77,'2025-04-06','Yes','Description for Food Item 3'),(4,4,1,57,'2025-04-16','Yes','Description for Food Item 4'),(5,5,2,52,'2024-11-28','Yes','Description for Food Item 5'),(6,6,1,88,'2024-12-07','Yes','Description for Food Item 6'),(7,7,1,29,'2025-10-24','Yes','Description for Food Item 7'),(8,8,1,64,'2025-08-15','Yes','Description for Food Item 8'),(9,9,1,54,'2025-06-27','Yes','Description for Food Item 9'),(10,10,1,14,'2025-08-16','No','Description for Food Item 10'),(11,11,1,85,'2024-12-17','Yes','Description for Food Item 11'),(12,12,1,2,'2025-04-07','No','Description for Food Item 12'),(13,13,2,22,'2025-03-14','No','Description for Food Item 13'),(14,14,1,45,'2024-12-05','No','Description for Food Item 14'),(15,15,2,18,'2025-09-27','Yes','Description for Food Item 15'),(16,16,2,39,'2025-05-28','Yes','Description for Food Item 16'),(17,17,1,28,'2025-07-05','No','Description for Food Item 17'),(18,18,2,99,'2024-12-24','Yes','Description for Food Item 18'),(19,19,2,23,'2024-12-02','Yes','Description for Food Item 19'),(20,20,1,15,'2025-09-06','Yes','Description for Food Item 20'),(21,21,1,31,'2025-04-01','No','Description for Food Item 21'),(22,22,1,52,'2025-06-12','No','Description for Food Item 22'),(23,23,1,89,'2025-03-16','No','Description for Food Item 23'),(24,24,2,93,'2024-11-15','No','Description for Food Item 24'),(25,25,2,86,'2025-06-08','No','Description for Food Item 25'),(26,26,2,4,'2025-02-18','No','Description for Food Item 26'),(27,27,2,91,'2025-02-01','No','Description for Food Item 27'),(28,28,1,58,'2025-09-02','No','Description for Food Item 28'),(29,29,1,90,'2025-02-07','Yes','Description for Food Item 29'),(30,30,1,96,'2025-08-15','Yes','Description for Food Item 30'),(31,31,1,87,'2025-09-05','Yes','Description for Food Item 31'),(32,32,1,96,'2025-05-10','Yes','Description for Food Item 32'),(33,33,2,60,'2024-12-24','Yes','Description for Food Item 33'),(34,34,1,66,'2025-02-24','Yes','Description for Food Item 34'),(35,35,1,17,'2025-04-03','Yes','Description for Food Item 35'),(36,36,2,43,'2025-03-23','Yes','Description for Food Item 36'),(37,37,1,62,'2025-06-16','No','Description for Food Item 37'),(38,38,1,22,'2025-04-19','Yes','Description for Food Item 38'),(39,39,2,39,'2025-01-27','Yes','Description for Food Item 39'),(40,40,1,52,'2025-07-29','No','Description for Food Item 40'),(41,41,1,25,'2025-08-19','No','Description for Food Item 41'),(42,42,1,12,'2025-07-07','Yes','Description for Food Item 42'),(43,43,2,21,'2025-02-13','Yes','Description for Food Item 43'),(44,44,2,78,'2025-04-02','Yes','Description for Food Item 44'),(45,45,2,6,'2025-06-16','Yes','Description for Food Item 45'),(46,46,2,64,'2025-03-28','No','Description for Food Item 46'),(47,47,2,99,'2025-07-21','Yes','Description for Food Item 47'),(48,48,2,27,'2025-05-14','Yes','Description for Food Item 48'),(49,49,1,8,'2025-01-27','Yes','Description for Food Item 49'),(50,50,1,62,'2024-11-16','No','Description for Food Item 50');
/*!40000 ALTER TABLE `postedfood_dtl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postedfood_status`
--

DROP TABLE IF EXISTS `postedfood_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postedfood_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postedFoodId` int(11) DEFAULT NULL,
  `status` enum('Pending for approval','Approved','Denied') DEFAULT 'Pending for approval',
  `transactstatus` enum('pending','received') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `postedFoodId` (`postedFoodId`),
  CONSTRAINT `postedfood_status_ibfk_1` FOREIGN KEY (`postedFoodId`) REFERENCES `postedfood_tbl` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postedfood_status`
--

LOCK TABLES `postedfood_status` WRITE;
/*!40000 ALTER TABLE `postedfood_status` DISABLE KEYS */;
INSERT INTO `postedfood_status` VALUES (1,1,'Approved','received'),(2,2,'Approved','received'),(3,3,'Pending for approval','pending'),(4,4,'Pending for approval','pending'),(5,5,'Pending for approval','pending'),(6,6,'Approved','received'),(7,7,'Approved','pending'),(8,8,'Approved','received'),(9,9,'Approved','pending'),(10,10,'Pending for approval','received'),(11,11,'Approved','pending'),(12,12,'Denied','pending'),(13,13,'Pending for approval','pending'),(14,14,'Pending for approval','pending'),(15,15,'Approved','received'),(16,16,'Pending for approval','pending'),(17,17,'Approved','pending'),(18,18,'Approved','received'),(19,19,'Pending for approval','pending'),(20,20,'Approved','received'),(21,21,'Approved','pending'),(22,22,'Pending for approval','pending'),(23,23,'Pending for approval','received'),(24,24,'Approved','pending'),(25,25,'Approved','pending'),(26,26,'Pending for approval','pending'),(27,27,'Pending for approval','pending'),(28,28,'Approved','received'),(29,29,'Approved','pending'),(30,30,'Pending for approval','received'),(31,31,'Pending for approval','pending'),(32,32,'Approved','received'),(33,33,'Pending for approval','pending'),(34,34,'Approved','pending'),(35,35,'Approved','pending'),(36,36,'Pending for approval','received'),(37,37,'Pending for approval','pending'),(38,38,'Approved','received'),(39,39,'Approved','received'),(40,40,'Approved','received'),(41,41,'Approved','received'),(42,42,'Approved','received'),(43,43,'Approved','received'),(44,44,'Pending for approval','pending'),(45,45,'Pending for approval','received'),(46,46,'Approved','received'),(47,47,'Pending for approval','pending'),(48,48,'Pending for approval','pending'),(49,49,'Approved','received'),(50,50,'Approved','received');
/*!40000 ALTER TABLE `postedfood_status` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postedfood_tbl`
--

LOCK TABLES `postedfood_tbl` WRITE;
/*!40000 ALTER TABLE `postedfood_tbl` DISABLE KEYS */;
INSERT INTO `postedfood_tbl` VALUES (1,5,'Food Item 1','2025-07-16 00:00:00'),(2,5,'Food Item 2','2025-07-13 00:00:00'),(3,6,'Food Item 3','2025-06-15 00:00:00'),(4,6,'Food Item 4','2025-02-06 00:00:00'),(5,7,'Food Item 5','2025-06-09 00:00:00'),(6,3,'Food Item 6','2025-07-14 00:00:00'),(7,2,'Food Item 7','2025-10-23 00:00:00'),(8,3,'Food Item 8','2025-03-25 00:00:00'),(9,3,'Food Item 9','2024-11-12 00:00:00'),(10,6,'Food Item 10','2024-11-13 00:00:00'),(11,6,'Food Item 11','2025-07-09 00:00:00'),(12,6,'Food Item 12','2025-10-04 00:00:00'),(13,3,'Food Item 13','2025-04-10 00:00:00'),(14,7,'Food Item 14','2025-11-01 00:00:00'),(15,5,'Food Item 15','2025-10-22 00:00:00'),(16,7,'Food Item 16','2025-03-12 00:00:00'),(17,7,'Food Item 17','2025-03-19 00:00:00'),(18,5,'Food Item 18','2024-12-06 00:00:00'),(19,6,'Food Item 19','2024-12-20 00:00:00'),(20,4,'Food Item 20','2024-12-14 00:00:00'),(21,3,'Food Item 21','2025-02-12 00:00:00'),(22,4,'Food Item 22','2025-03-18 00:00:00'),(23,7,'Food Item 23','2025-04-19 00:00:00'),(24,7,'Food Item 24','2025-06-23 00:00:00'),(25,3,'Food Item 25','2024-11-24 00:00:00'),(26,6,'Food Item 26','2025-07-17 00:00:00'),(27,3,'Food Item 27','2025-07-14 00:00:00'),(28,4,'Food Item 28','2025-04-17 00:00:00'),(29,6,'Food Item 29','2025-01-23 00:00:00'),(30,7,'Food Item 30','2025-05-24 00:00:00'),(31,5,'Food Item 31','2025-03-02 00:00:00'),(32,2,'Food Item 32','2025-08-21 00:00:00'),(33,3,'Food Item 33','2025-09-25 00:00:00'),(34,5,'Food Item 34','2025-08-26 00:00:00'),(35,4,'Food Item 35','2025-04-01 00:00:00'),(36,4,'Food Item 36','2025-10-10 00:00:00'),(37,5,'Food Item 37','2024-11-29 00:00:00'),(38,3,'Food Item 38','2025-06-27 00:00:00'),(39,2,'Food Item 39','2024-12-16 00:00:00'),(40,3,'Food Item 40','2025-02-08 00:00:00'),(41,6,'Food Item 41','2025-06-13 00:00:00'),(42,4,'Food Item 42','2025-09-14 00:00:00'),(43,2,'Food Item 43','2025-09-19 00:00:00'),(44,6,'Food Item 44','2025-01-11 00:00:00'),(45,4,'Food Item 45','2025-05-12 00:00:00'),(46,3,'Food Item 46','2024-11-23 00:00:00'),(47,5,'Food Item 47','2025-07-19 00:00:00'),(48,2,'Food Item 48','2025-04-19 00:00:00'),(49,6,'Food Item 49','2025-09-19 00:00:00'),(50,4,'Food Item 50','2025-03-31 00:00:00');
/*!40000 ALTER TABLE `postedfood_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User'),(3,'Verified');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
INSERT INTO `user_tbl` VALUES (2,'zed123','1234'),(3,'vc123','$2a$10$03UDeVfgFZiGppOUverWDOgLUiGABErGwc2OLXpJvCoLfdBIt5mx6'),(4,'f123','$2a$10$LueI4IW17fZD8svLbq4DNeji2x5m0S7UTlS72Onpa3ML7bM9vQ2bG'),(5,'eq123','$2a$10$L6gnu2IU60KkQ74dgO0Gs.E3BW.agD7YxZ660wsZZPk7xFuPVsVrm'),(6,'eq1234','$2a$10$JVmeUnjeBNQVNsolFwKhlOm1PIffCGeVm6RUMUaqrDVXDaJSJtsrS'),(7,'zed123456','$2a$10$G9Sxmlpd15DZ0yO6DVClmuBJzvE8esTK3qOeXhwltnROM2XLwH.V.'),(8,'123test','$2a$10$.js4OTd3hBnQpMOFmiMxIOIf2ZSvOTCCZnkzT8QaIwmT7Lerp63W.');
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `userdetails_tbl`
--

LOCK TABLES `userdetails_tbl` WRITE;
/*!40000 ALTER TABLE `userdetails_tbl` DISABLE KEYS */;
INSERT INTO `userdetails_tbl` VALUES (2,2,'Zedrick','Espere','2024-10-24 01:56:33'),(3,3,'Venniel','Carerra','2024-10-24 01:57:14'),(4,4,'fname','lname','2024-10-24 02:23:38'),(5,5,'Adrian','Allidap','2024-10-29 14:08:34'),(6,6,'Adrian','Allidap','2024-10-29 14:11:04'),(7,7,'Zedrick','Espere','2024-11-01 16:51:51'),(8,8,'test','user','2024-11-03 13:36:30');
/*!40000 ALTER TABLE `userdetails_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `userlocation_tbl`
--

LOCK TABLES `userlocation_tbl` WRITE;
/*!40000 ALTER TABLE `userlocation_tbl` DISABLE KEYS */;
INSERT INTO `userlocation_tbl` VALUES (2,2,1),(3,3,1),(4,4,1),(5,5,2),(6,6,1),(7,7,1),(8,8,1);
/*!40000 ALTER TABLE `userlocation_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `userrole_tbl`
--

LOCK TABLES `userrole_tbl` WRITE;
/*!40000 ALTER TABLE `userrole_tbl` DISABLE KEYS */;
INSERT INTO `userrole_tbl` VALUES (2,2,1),(3,3,2),(4,4,2),(5,5,2),(6,6,2),(7,7,2),(8,8,2);
/*!40000 ALTER TABLE `userrole_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50003 DROP PROCEDURE IF EXISTS `GetFoodCounts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFoodCounts`()
BEGIN
    DECLARE currentDate DATE DEFAULT CURDATE();
    DECLARE oneWeekAgo DATE DEFAULT DATE_SUB(currentDate, INTERVAL 1 WEEK);
    DECLARE oneMonthAgo DATE DEFAULT DATE_SUB(currentDate, INTERVAL 1 MONTH);
    DECLARE oneYearAgo DATE DEFAULT DATE_SUB(currentDate, INTERVAL 1 YEAR);

    -- Total counts query with various time ranges
    SELECT 
        -- Total posted food counts
        COUNT(pfd.id) AS total_posted_food_all,
        SUM(CASE WHEN pfd.datePosted >= currentDate THEN 1 ELSE 0 END) AS total_posted_food_1d,
        SUM(CASE WHEN pfd.datePosted >= oneWeekAgo THEN 1 ELSE 0 END) AS total_posted_food_1w,
        SUM(CASE WHEN pfd.datePosted >= oneMonthAgo THEN 1 ELSE 0 END) AS total_posted_food_1m,
        SUM(CASE WHEN pfd.datePosted >= oneYearAgo THEN 1 ELSE 0 END) AS total_posted_food_1y,

        -- Approved food counts
        SUM(CASE WHEN pfs.status = 'Approved' THEN 1 ELSE 0 END) AS approved_count_all,
        SUM(CASE WHEN pfs.status = 'Approved' AND pfd.datePosted >= currentDate THEN 1 ELSE 0 END) AS approved_count_1d,
        SUM(CASE WHEN pfs.status = 'Approved' AND pfd.datePosted >= oneWeekAgo THEN 1 ELSE 0 END) AS approved_count_1w,
        SUM(CASE WHEN pfs.status = 'Approved' AND pfd.datePosted >= oneMonthAgo THEN 1 ELSE 0 END) AS approved_count_1m,
        SUM(CASE WHEN pfs.status = 'Approved' AND pfd.datePosted >= oneYearAgo THEN 1 ELSE 0 END) AS approved_count_1y,

        -- Received food counts
        SUM(CASE WHEN pfs.transactstatus = 'received' THEN 1 ELSE 0 END) AS received_count_all,
        SUM(CASE WHEN pfs.transactstatus = 'received' AND pfd.datePosted >= currentDate THEN 1 ELSE 0 END) AS received_count_1d,
        SUM(CASE WHEN pfs.transactstatus = 'received' AND pfd.datePosted >= oneWeekAgo THEN 1 ELSE 0 END) AS received_count_1w,
        SUM(CASE WHEN pfs.transactstatus = 'received' AND pfd.datePosted >= oneMonthAgo THEN 1 ELSE 0 END) AS received_count_1m,
        SUM(CASE WHEN pfs.transactstatus = 'received' AND pfd.datePosted >= oneYearAgo THEN 1 ELSE 0 END) AS received_count_1y
    FROM 
        postedfood_tbl pfd
    JOIN 
        postedfood_status pfs 
        ON pfd.id = pfs.postedFoodId;
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
/*!50003 DROP PROCEDURE IF EXISTS `InsertMultipleFoods` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertMultipleFoods`()
BEGIN
    DECLARE i INT DEFAULT 1;

    -- Loop to insert 50 records
    WHILE i <= 50 DO
        -- Calling InsertPostedFood with random values, including random timestamp, predefinedStatus, and predefinedTransactStatus
        CALL `surplus2serve_db`.`InsertPostedFood`(
            FLOOR(2 + (RAND() * 6)),               -- Random foodOwnerId between 2 and 7
            CONCAT('Food Item ', i),               -- foodName (Food Item 1, Food Item 2, ...)
            FLOOR(1 + (RAND() * 2)),               -- Random postedFoodCategory between 1 and 2
            FLOOR(1 + (RAND() * 100)),             -- Random quantity between 1 and 100
            DATE_ADD(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY),  -- Random expiry_date within 1 year from today
            IF(RAND() > 0.5, 'Yes', 'No'),         -- Random availability (Yes/No)
            CONCAT('Description for Food Item ', i),  -- Description (Food Item 1, Food Item 2, ...)
            -- Random timestamp: Add random minutes/hours/days to the current timestamp
            DATE_ADD(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY),  -- Random timestamp within the past year
            -- Random predefinedStatus: Choose a random status from a predefined list
            IF(RAND() > 0.5, 'Pending for approval', 'Approved'),  -- Random predefinedStatus ('Pending for approval' or 'Approved')
            -- Random predefinedTransactStatus: Choose a random transaction status from a predefined list
            IF(RAND() > 0.5, 'pending', 'received')  -- Random predefinedTransactStatus ('In Progress' or 'Completed')
        );
        SET i = i + 1;
    END WHILE;
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPostedFood`(
    IN `foodOwnerId` INT, 
    IN `foodName` VARCHAR(255), 
    IN `postedFoodCategory` INT, 
    IN `quantity` INT, 
    IN `expiry_date` DATE, 
    IN `availability` VARCHAR(10), 
    IN `description` VARCHAR(255),
    IN `timestamp` DATETIME,
    IN `predefinedStatus` VARCHAR (55),
    IN `predefinedTransactStatus` VARCHAR (55)
)
BEGIN
    DECLARE lastPostedFoodId INT;

    -- Insert into postedfood_tbl and get the last inserted id
    INSERT INTO postedfood_tbl (foodOwnerId, foodName, datePosted) 
    VALUES (foodOwnerId, foodName, timestamp);

    SET lastPostedFoodId = LAST_INSERT_ID();

    -- Insert into postedfood_dtl using the last inserted id
    INSERT INTO postedfood_dtl (postedFoodId, postedFoodCategory, quantity, expiry_date, availability, description) 
    VALUES (lastPostedFoodId, postedFoodCategory, quantity, expiry_date, availability, description);

    -- Insert into postedfood_status with default status 'Pending for approval'
    INSERT INTO postedfood_status (postedFoodId, status, transactstatus) 
    VALUES (lastPostedFoodId, predefinedStatus , predefinedTransactStatus);
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

-- Dump completed on 2024-11-07 13:57:12
