CREATE DATABASE  IF NOT EXISTS `p16_hostel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p16_hostel`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: p16_hostel
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `area` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `pin_code` int NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `Food_ID` int NOT NULL AUTO_INCREMENT,
  `FName` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Food_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hostler`
--

DROP TABLE IF EXISTS `hostler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hostler` (
  `hostler_id` int NOT NULL AUTO_INCREMENT,
  `dateofbirth` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `address_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`hostler_id`),
  UNIQUE KEY `UKaj0xsa58120yx3wqmgou30wnu` (`user_id`),
  UNIQUE KEY `UK8b0k0cww1si4bnx2ec5g04a4p` (`address_id`),
  CONSTRAINT `FK392fi11gpdqumxgcu4b4llorc` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `FKpj5cd8y5iokq4krtmxnkcwd1i` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `Issue_ID` int NOT NULL AUTO_INCREMENT,
  `Issue_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Issue_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mealallocation`
--

DROP TABLE IF EXISTS `mealallocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mealallocation` (
  `MA_ID` int NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `h_ID` int NOT NULL,
  PRIMARY KEY (`MA_ID`),
  KEY `fk_hostler_mealallocation` (`h_ID`),
  CONSTRAINT `fk_hostler_mealallocation` FOREIGN KEY (`h_ID`) REFERENCES `hostler` (`hostler_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mealplan`
--

DROP TABLE IF EXISTS `mealplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mealplan` (
  `MP_ID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `Status` enum('B','L','D') NOT NULL,
  `Food_ID` int NOT NULL,
  PRIMARY KEY (`MP_ID`),
  KEY `fk_food_mealplan` (`Food_ID`),
  CONSTRAINT `fk_food_mealplan` FOREIGN KEY (`Food_ID`) REFERENCES `food` (`Food_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `R_ID` int NOT NULL AUTO_INCREMENT,
  `R_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`R_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `capacity` int NOT NULL,
  `price` float NOT NULL,
  `room_no` int NOT NULL,
  `room_type` varchar(255) NOT NULL,
  `status` enum('AVAILABLE','FULL') NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roomallocation`
--

DROP TABLE IF EXISTS `roomallocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomallocation` (
  `room_alloc_id` int NOT NULL AUTO_INCREMENT,
  `allocationdate` date NOT NULL,
  `hostler_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`room_alloc_id`),
  KEY `FKlcqdl3pm4pqj03tfd1dhp5j9r` (`room_id`),
  KEY `FK625a8nfe5sr3l63gsxk5rk4te` (`hostler_id`),
  CONSTRAINT `FK625a8nfe5sr3l63gsxk5rk4te` FOREIGN KEY (`hostler_id`) REFERENCES `hostler` (`hostler_id`),
  CONSTRAINT `FKlcqdl3pm4pqj03tfd1dhp5j9r` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `Ticket_ID` int NOT NULL AUTO_INCREMENT,
  `Hostler_ID` int NOT NULL,
  `Issue_ID` int NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `RaisedAt` date NOT NULL,
  `ResolvedAt` date DEFAULT NULL,
  PRIMARY KEY (`Ticket_ID`),
  KEY `Hostler_ID` (`Hostler_ID`),
  KEY `Issue_ID` (`Issue_ID`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`Issue_ID`) REFERENCES `issue` (`Issue_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `r_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK8lwi4plrarkg8sbkrphacf8it` (`r_id`),
  CONSTRAINT `FK8lwi4plrarkg8sbkrphacf8it` FOREIGN KEY (`r_id`) REFERENCES `role` (`R_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'hostel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 15:20:44
