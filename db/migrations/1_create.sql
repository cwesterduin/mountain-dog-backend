-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';


DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) DEFAULT NULL,
  `Password` json DEFAULT NULL,
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `BlogPosts`
--


DROP TABLE IF EXISTS `BlogPosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `BlogPosts` (
  `BlogPostID` int(11) NOT NULL AUTO_INCREMENT,
  `Date` datetime DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `PrimaryMediaID` int(11) DEFAULT NULL,
  `Content` json DEFAULT NULL,
  UNIQUE KEY `BlogPostID_UNIQUE` (`BlogPostID`),
  KEY `MediaID_idx` (`PrimaryMediaID`),
  KEY `PrimaryMediaID_idx` (`PrimaryMediaID`),
  CONSTRAINT `PrimaryMediaID` FOREIGN KEY (`PrimaryMediaID`) REFERENCES `Media` (`MediaID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EventMapFeatures`
--

DROP TABLE IF EXISTS `EventMapFeatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `EventMapFeatures` (
  `EventID` int(11) NOT NULL,
  `MapFeatureID` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`EventID`,`MapFeatureID`),
  KEY `MapFeatureID` (`MapFeatureID`),
  CONSTRAINT `EventMapFeatures_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `Events` (`EventID`),
  CONSTRAINT `EventMapFeatures_ibfk_2` FOREIGN KEY (`MapFeatureID`) REFERENCES `MapFeatures` (`MapFeatureID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Events` (
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Date` date DEFAULT NULL,
  `GPX` longtext,
  `DescriptionID` varchar(55) NOT NULL,
  `Description` varchar(8000) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `ElevationM` decimal(10,2) DEFAULT NULL,
  `DistanceKM` decimal(10,2) DEFAULT NULL,
  `TripID` int(11) DEFAULT NULL,
  `EventMediaID` int(11) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  UNIQUE KEY `EventID_UNIQUE` (`EventID`),
  KEY `TripID_idx` (`TripID`),
  KEY `MediaID_idx` (`EventMediaID`),
  CONSTRAINT `EventMediaID` FOREIGN KEY (`EventMediaID`) REFERENCES `Media` (`MediaID`),
  CONSTRAINT `TripID` FOREIGN KEY (`TripID`) REFERENCES `Trips` (`TripID`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MapFeatures`
--

DROP TABLE IF EXISTS `MapFeatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `MapFeatures` (
  `MapFeatureID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Lng` float NOT NULL,
  `Lat` float NOT NULL,
  `MediaID` int(11) DEFAULT NULL,
  `EventID` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  `Translation` varchar(155) DEFAULT NULL,
  `Pronunciation` varchar(155) DEFAULT NULL,
  `MunroOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`MapFeatureID`),
  UNIQUE KEY `MapFeatureID_UNIQUE` (`MapFeatureID`),
  KEY `MediaID_idx` (`MediaID`),
  KEY `PrimaryEventID_idx` (`EventID`),
  CONSTRAINT `MediaID` FOREIGN KEY (`MediaID`) REFERENCES `Media` (`MediaID`),
  CONSTRAINT `PrimaryEventID` FOREIGN KEY (`EventID`) REFERENCES `Events` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Media`
--

DROP TABLE IF EXISTS `Media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Media` (
  `MediaID` int(11) NOT NULL AUTO_INCREMENT,
  `Path` varchar(255) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `EventID` int(11) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL,
  `Category` varchar(45) DEFAULT NULL,
  `FeatureAnchor` int(11) DEFAULT NULL,
  PRIMARY KEY (`MediaID`),
  UNIQUE KEY `MediaID_UNIQUE` (`MediaID`),
  KEY `EventID_idx` (`EventID`),
  CONSTRAINT `EventID` FOREIGN KEY (`EventID`) REFERENCES `Events` (`EventID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=656 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Trips`
--

DROP TABLE IF EXISTS `Trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Trips` (
  `TripID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `TripMediaID` int(11) DEFAULT '3',
  PRIMARY KEY (`TripID`),
  UNIQUE KEY `TripID_UNIQUE` (`TripID`),
  KEY `TripMediaID_idx` (`TripMediaID`),
  CONSTRAINT `TripMediaID` FOREIGN KEY (`TripMediaID`) REFERENCES `Media` (`MediaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-25 12:24:54
