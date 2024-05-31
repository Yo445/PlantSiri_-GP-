-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2024 at 12:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gp`
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

--
-- Dumping data for table `crop_dimension`
--

INSERT INTO `crop_dimension` (`crop_id`, `CropType`, `Kc`) VALUES
(1, 'soybean', 0.8),
(2, 'maize', 1.2),
(3, 'wheat', 0.9),
(4, 'rice', 1),
(5, 'tomato', 0.8);

-- --------------------------------------------------------

--
-- Table structure for table `cycle_dimension`
--

CREATE TABLE `cycle_dimension` (
  `cycle_id` int(11) NOT NULL,
  `Cycle` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cycle_dimension`
--

INSERT INTO `cycle_dimension` (`cycle_id`, `Cycle`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

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

--
-- Dumping data for table `fact_table`
--

INSERT INTO `fact_table` (`fact_id`, `time_id`, `crop_id`, `location_id`, `cycle_id`, `weather_id`, `irrigation_id`, `sensor_id`, `ETc`, `ETc_mm`, `ET0`, `cycle_status`) VALUES
(1, 1, 1, 1, 1, 1, 1, 'xqGpHY4R', 0.000007050439866850439, 7.050439866850438, 0.000008813049833563047, 'OFF'),
(2, 2, 2, 2, 2, 2, 2, 'xqGpHY4R', 0.000013348082973282362, 13.348082973282361, 0.000011123402477735301, 'OFF'),
(3, 3, 3, 2, 3, 3, 3, 'xqGpHY4R', 0.000009738978913679721, 9.738978913679722, 0.000010821087681866357, 'OFF'),
(4, 4, 4, 2, 4, 4, 4, 'xqGpHY4R', 0.000012628235683257209, 12.62823568325721, 0.000012628235683257209, 'OFF'),
(5, 5, 5, 2, 5, 5, 5, 'xqGpHY4R', 0.000007253128678268336, 7.253128678268336, 0.000009066410847835419, 'OFF'),
(6, 6, 5, 2, 6, 6, 6, 'xqGpHY4R', 0.000010229149248038336, 10.229149248038336, 0.000012786436560047919, 'TRUNCATE'),
(29, 12, 4, 3, 1, 7, 13, 'xqGpHY4R', 0.000009191384932533677, 9.191384932533676, 0.000009191384932533677, 'OFF'),
(30, 13, 5, 4, 1, 8, 14, 'karim', 0.00000829302997750701, 8.29302997750701, 0.000010366287471883761, 'OFF');

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

--
-- Dumping data for table `irrigation_dimension`
--

INSERT INTO `irrigation_dimension` (`irrigation_id`, `times_tamp`, `start_irrigation`, `IrrigationDuration`, `end_irrigation`, `Status`, `water_requirement`, `Area`, `irrigation_efficiency`, `flow_rate`) VALUES
(1, '2024-05-12 14:20:01', '14:20:01', 1623, '14:40:00', 'irrigated', 324622.7459510714, 39893.84854135414, 86.64493899649615, 200),
(2, '2024-05-12 14:40:13', '14:40:13', 1359, '14:42:52', 'irrigated', 271823.1173898592, 16384.838284150806, 80.45900695303318, 200),
(3, '2024-05-12 14:43:15', '14:43:15', 481, '14:48:00', 'irrigated', 96212.35826257552, 8295.198211783558, 83.96713470932357, 200),
(4, '2024-05-12 14:48:08', '14:48:08', 1605, '14:49:53', 'irrigated', 320979.7483208574, 23342.764208350123, 91.83692412490791, 200),
(5, '2024-05-12 14:49:59', '14:49:59', 62, '14:51:01', 'irrigated', 12430.757853164161, 1537.9694730978863, 89.73781505033558, 200),
(6, '2024-05-12 14:52:23', '14:52:23', 348, '16:40:00', 'irrigated', 69581.79741696759, 6400.909612337678, 94.09912100350394, 200),
(13, '2024-05-12 16:43:12', '16:43:12', 1597, '18:09:22', 'irrigated', 319390.54570427904, 33691.95604430589, 96.95832932385737, 200),
(14, '2024-05-12 16:46:48', '16:46:48', 1534, '18:09:22', 'irrigated', 306791.64311383007, 34002.16676583845, 91.91286484445286, 200),
(23, '2024-05-12 18:12:09', '18:12:09', 687, '18:23:36', '!Not Irrigated', 137310.14153226416, 9740.960021120985, 97.39153397761606, 200),
(24, '2024-05-12 18:12:08', '18:12:08', 663, '18:23:11', '!Not Irrigated', 132649.8962294206, 11148.846983470869, 91.86047088724445, 200);

-- --------------------------------------------------------

--
-- Table structure for table `location_dimension`
--

CREATE TABLE `location_dimension` (
  `location_id` int(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `altitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location_dimension`
--

INSERT INTO `location_dimension` (`location_id`, `latitude`, `altitude`) VALUES
(1, 23.452193286335458, 100.6434583100276),
(2, 23.452193286335458, 30),
(3, 30.270200574466152, 57.47185002397906),
(4, 30.887827860865265, 30.849710807514285),
(5, 30.887827860865265, 30),
(6, 30.270200574466152, 30);

-- --------------------------------------------------------

--
-- Table structure for table `sensor_dimension`
--

CREATE TABLE `sensor_dimension` (
  `sensor_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_dimension`
--

INSERT INTO `sensor_dimension` (`sensor_id`) VALUES
('karim'),
('xqGpHY4R');

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

--
-- Dumping data for table `time_dimension`
--

INSERT INTO `time_dimension` (`time_id`, `times_tamp`, `start_date`, `end_date`, `end_time`) VALUES
(1, '2024-05-12 14:20:01', '2025-05-12', '2025-05-07', '14:40:09'),
(2, '2024-05-12 14:40:13', '2024-05-12', '2024-05-08', '14:43:15'),
(3, '2024-05-12 14:43:15', '2024-05-12', '2024-05-09', '14:48:08'),
(4, '2024-05-12 14:48:08', '2024-05-12', '2024-05-10', '14:49:59'),
(5, '2024-05-12 14:49:59', '2024-05-12', '2024-05-11', '14:52:23'),
(6, '2024-05-12 14:52:23', '2024-05-15', '2024-05-12', '16:41:10'),
(12, '2024-05-12 16:43:12', '2026-05-12', '2026-05-12', '18:12:08'),
(13, '2024-05-12 16:46:48', '2024-05-12', '2024-05-12', '18:12:08'),
(22, '2024-05-12 18:12:09', '2024-05-12', 'NULL', 'NULL'),
(23, '2024-05-12 18:12:08', '2024-05-12', 'NULL', 'NULL');

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
-- Dumping data for table `weather_dimension`
--

INSERT INTO `weather_dimension` (`weather_id`, `times_tamp`, `Tmax`, `Tmin`, `Rs`, `u2`, `RH_max`, `RH_min`, `P`, `G`) VALUES
(1, '2024-05-12 14:20:01', 29.29066772934018, 17.24367502751184, 18.31691141115322, 2.5680918118266254, 31.976520124972097, 26.584813241182104, 101.3, 0.1),
(2, '2024-05-12 14:40:13', 27.264884321214048, 21.491406489013965, 25.4458077890829, 4.248287547146547, 39.01127955572761, 24.9350079130019, 101.3, 0.1),
(3, '2024-05-12 14:43:15', 26.652798979421448, 20.958884794331453, 23.857186652509444, 5.050880242430836, 41.99677257869851, 29.946153845240993, 101.3, 0.1),
(4, '2024-05-12 14:48:08', 27.02922842770569, 18.47117011014664, 20.223113040377893, 5.072583677890789, 33.730113242415015, 12.508113014834649, 101.3, 0.1),
(5, '2024-05-12 14:49:59', 32.70288626562463, 18.429796181083333, 24.720830821257714, 2.1344305284605047, 61.212153361358766, 15.66933428483315, 101.3, 0.1),
(6, '2024-05-12 14:52:23', 28.11622039018493, 22.02369931685658, 27.865001192017168, 5.030531146779019, 42.2795974747474, 18.71089996205293, 101.3, 0.1),
(7, '2024-05-12 16:43:12', 25.12591822215547, 16.84303141028891, 15.868753657129988, 4.2233306548411775, 63.4326999601787, 11.67513317678301, 101.3, 0.1),
(8, '2024-05-12 16:46:48', 28.590794091470816, 22.760274012140187, 15.06670886941067, 3.7367654348050183, 51.74504609234859, 25.959508616839813, 101.3, 0.1),
(9, '2024-05-12 18:12:08', 31.7921753757468, 17.8095994711221, 19.313212418754073, 4.61342267535813, 53.51143319162521, 10.230883987132627, 101.3, 0.1),
(10, '2024-05-12 18:12:09', 33.16183422126755, 23.200624354872968, 16.134140809081746, 5.269514722460392, 42.87098899950759, 23.37599540956603, 101.3, 0.1);

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
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cycle_dimension`
--
ALTER TABLE `cycle_dimension`
  MODIFY `cycle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fact_table`
--
ALTER TABLE `fact_table`
  MODIFY `fact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `irrigation_dimension`
--
ALTER TABLE `irrigation_dimension`
  MODIFY `irrigation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `location_dimension`
--
ALTER TABLE `location_dimension`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `time_dimension`
--
ALTER TABLE `time_dimension`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `weather_dimension`
--
ALTER TABLE `weather_dimension`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
