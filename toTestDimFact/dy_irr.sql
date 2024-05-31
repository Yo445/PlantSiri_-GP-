-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2024 at 01:11 PM
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
-- Database: `dy_irr`
--

-- --------------------------------------------------------

--
-- Table structure for table `crop_dimension`
--

CREATE TABLE `crop_dimension` (
  `crop_id` int(11) NOT NULL,
  `CropType` varchar(255) DEFAULT NULL,
  `Kc` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cycle_dimension`
--

CREATE TABLE `cycle_dimension` (
  `cycle_id` int(11) NOT NULL,
  `Cycle` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fact_table`
--

CREATE TABLE `fact_table` (
  `fact_id` int(11) NOT NULL,
  `time_id` int(11) DEFAULT NULL,
  `crop_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `cycle_id` int(11) DEFAULT NULL,
  `weather_id` int(11) DEFAULT NULL,
  `irrigation_id` int(11) DEFAULT NULL,
  `sensor_id` varchar(255) DEFAULT NULL,
  `ETc` double DEFAULT NULL,
  `ETc_mm` double DEFAULT NULL,
  `ET0` double DEFAULT NULL,
  `cycle_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `irrigation_dimension`
--

CREATE TABLE `irrigation_dimension` (
  `irrigation_id` int(11) NOT NULL,
  `times_tamp` varchar(255) DEFAULT NULL,
  `start_irrigation` varchar(255) DEFAULT NULL,
  `IrrigationDuration` int(11) DEFAULT NULL,
  `end_irrigation` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `water_requirement` double DEFAULT NULL,
  `Area` double DEFAULT NULL,
  `irrigation_efficiency` double DEFAULT NULL,
  `flow_rate` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location_dimension`
--

CREATE TABLE `location_dimension` (
  `location_id` int(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `altitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensor_dimension`
--

CREATE TABLE `sensor_dimension` (
  `sensor_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_dimension`
--

CREATE TABLE `time_dimension` (
  `time_id` int(11) NOT NULL,
  `times_tamp` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `weather_dimension`
--

CREATE TABLE `weather_dimension` (
  `weather_id` int(11) NOT NULL,
  `times_tamp` varchar(255) DEFAULT NULL,
  `Tmax` double DEFAULT NULL,
  `Tmin` double DEFAULT NULL,
  `Rs` double DEFAULT NULL,
  `u2` double DEFAULT NULL,
  `RH_max` double DEFAULT NULL,
  `RH_min` double DEFAULT NULL,
  `P` double DEFAULT NULL,
  `G` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crop_dimension`
--
ALTER TABLE `crop_dimension`
  ADD PRIMARY KEY (`crop_id`);

--
-- Indexes for table `cycle_dimension`
--
ALTER TABLE `cycle_dimension`
  ADD PRIMARY KEY (`cycle_id`);

--
-- Indexes for table `fact_table`
--
ALTER TABLE `fact_table`
  ADD PRIMARY KEY (`fact_id`),
  ADD KEY `time_id` (`time_id`),
  ADD KEY `crop_id` (`crop_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `cycle_id` (`cycle_id`),
  ADD KEY `weather_id` (`weather_id`),
  ADD KEY `irrigation_id` (`irrigation_id`),
  ADD KEY `sensor_id` (`sensor_id`);

--
-- Indexes for table `irrigation_dimension`
--
ALTER TABLE `irrigation_dimension`
  ADD PRIMARY KEY (`irrigation_id`);

--
-- Indexes for table `location_dimension`
--
ALTER TABLE `location_dimension`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `sensor_dimension`
--
ALTER TABLE `sensor_dimension`
  ADD PRIMARY KEY (`sensor_id`);

--
-- Indexes for table `time_dimension`
--
ALTER TABLE `time_dimension`
  ADD PRIMARY KEY (`time_id`);

--
-- Indexes for table `weather_dimension`
--
ALTER TABLE `weather_dimension`
  ADD PRIMARY KEY (`weather_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crop_dimension`
--
ALTER TABLE `crop_dimension`
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cycle_dimension`
--
ALTER TABLE `cycle_dimension`
  MODIFY `cycle_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fact_table`
--
ALTER TABLE `fact_table`
  MODIFY `fact_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `irrigation_dimension`
--
ALTER TABLE `irrigation_dimension`
  MODIFY `irrigation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location_dimension`
--
ALTER TABLE `location_dimension`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_dimension`
--
ALTER TABLE `time_dimension`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `weather_dimension`
--
ALTER TABLE `weather_dimension`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fact_table`
--
ALTER TABLE `fact_table`
  ADD CONSTRAINT `fact_table_ibfk_1` FOREIGN KEY (`time_id`) REFERENCES `time_dimension` (`time_id`),
  ADD CONSTRAINT `fact_table_ibfk_2` FOREIGN KEY (`crop_id`) REFERENCES `crop_dimension` (`crop_id`),
  ADD CONSTRAINT `fact_table_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `location_dimension` (`location_id`),
  ADD CONSTRAINT `fact_table_ibfk_4` FOREIGN KEY (`cycle_id`) REFERENCES `cycle_dimension` (`cycle_id`),
  ADD CONSTRAINT `fact_table_ibfk_5` FOREIGN KEY (`weather_id`) REFERENCES `weather_dimension` (`weather_id`),
  ADD CONSTRAINT `fact_table_ibfk_6` FOREIGN KEY (`irrigation_id`) REFERENCES `irrigation_dimension` (`irrigation_id`),
  ADD CONSTRAINT `fact_table_ibfk_7` FOREIGN KEY (`sensor_id`) REFERENCES `sensor_dimension` (`sensor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
