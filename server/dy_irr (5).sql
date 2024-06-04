-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 09:57 PM
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

--
-- Dumping data for table `crop_dimension`
--

INSERT INTO `crop_dimension` (`crop_id`, `CropType`, `Kc`) VALUES
(1, 'wheat', 0.9);

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
(1, 1);

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
  `ETc_mm` double DEFAULT NULL,
  `ET0_mm` double DEFAULT NULL,
  `cycle_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fact_table`
--

INSERT INTO `fact_table` (`fact_id`, `time_id`, `crop_id`, `location_id`, `cycle_id`, `weather_id`, `irrigation_id`, `sensor_id`, `ETc_mm`, `ET0_mm`, `cycle_status`) VALUES
(1, 1, 1, 1, 1, 1, 1, 'LdI1MpLb', 9.998040114268331, 11.108933460298145, 'M7DSH 3ARF LSA');

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
  `soil_moisture` varchar(255) DEFAULT NULL,
  `irrigation_efficiency` double DEFAULT NULL,
  `flow_rate` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `irrigation_dimension`
--

INSERT INTO `irrigation_dimension` (`irrigation_id`, `times_tamp`, `start_irrigation`, `IrrigationDuration`, `end_irrigation`, `Status`, `water_requirement`, `Area`, `soil_moisture`, `irrigation_efficiency`, `flow_rate`) VALUES
(1, '2024-06-03 22:55:33', '22:55:33', 673, '0', 'not irrigated', 134533.4053046251, 12075.942291751644, '89.53850406748145', 89.74407150189903, 200),
(2, '2024-06-03 22:55:40', '22:55:40', 685, '0', 'not irrigated', 137093.31936897436, 15481.849771635363, '92.8006335638477', 91.45633148593438, 200),
(3, '2024-06-03 22:55:46', '22:55:46', 219, '0', 'not irrigated', 43875.971922087985, 3574.597561988113, '97.67420922944115', 95.89434833126039, 200),
(4, '2024-06-03 22:55:42', '22:55:42', 488, '0', 'not irrigated', 97500.05316859626, 9995.68984624409, '67.35461095470349', 87.81425766747962, 200),
(5, '2024-06-03 22:55:52', '22:55:52', 715, '0', 'not irrigated', 143003.6173917967, 17711.89467344307, '80.25545512248104', 82.62219768176051, 200),
(6, '2024-06-03 22:55:50', '22:55:50', 1027, '0', 'not irrigated', 205458.3909314191, 17182.587525900108, '99.97471600931367', 87.2509167903267, 200),
(7, '2024-06-03 22:55:44', '22:55:44', 366, '0', 'not irrigated', 73101.1503395788, 11388.46724829262, '94.20983752167834', 98.75131114107452, 200),
(8, '2024-06-03 22:55:35', '22:55:35', 1030, '0', 'not irrigated', 205972.27096282176, 18724.23935884389, '93.05416926037708', 85.7411851519618, 200),
(9, '2024-06-03 22:55:38', '22:55:38', 95, '0', 'not irrigated', 19074.529650041168, 1508.9111248284776, '74.25119931341408', 82.83641566815018, 200),
(10, '2024-06-03 22:55:48', '22:55:48', 1277, '0', 'not irrigated', 255431.6115364529, 21091.004012277306, '81.84118636006673', 95.55145045937815, 200);

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
(1, 27.914252173204023, 72.73418846757781),
(2, 30.402475437129077, 92.21963920217884),
(3, 26.850066219063887, 13.203222762782403),
(4, 23.929024239290705, 38.1392487271801),
(5, 25.779726657356168, 76.3076572556055),
(6, 24.56613142953204, 107.75253813510325),
(7, 26.386039710535982, 73.90819419619022),
(8, 26.686407117808205, 7.7876327445859275),
(9, 22.77835422901296, 49.237437821384525),
(10, 22.449343773248717, 72.75903587213215);

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
('1bAJJY2r'),
('6k0Rpri7'),
('LdI1MpLb'),
('lPKnT10P'),
('nXgI3Us8'),
('RxFQSs39'),
('UIWkUzyb'),
('vfKPDent'),
('XsoHFOBM'),
('z5afWHkX');

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
(1, '2024-06-03 22:55:33', '2024-06-03', 'NULL', 'NULL'),
(2, '2024-06-03 22:55:40', '2024-06-03', 'NULL', 'NULL'),
(3, '2024-06-03 22:55:42', '2024-06-03', 'NULL', 'NULL'),
(4, '2024-06-03 22:55:38', '2024-06-03', 'NULL', 'NULL'),
(5, '2024-06-03 22:55:52', '2024-06-03', 'NULL', 'NULL'),
(6, '2024-06-03 22:55:50', '2024-06-03', 'NULL', 'NULL'),
(7, '2024-06-03 22:55:48', '2024-06-03', 'NULL', 'NULL'),
(8, '2024-06-03 22:55:44', '2024-06-03', 'NULL', 'NULL'),
(9, '2024-06-03 22:55:46', '2024-06-03', 'NULL', 'NULL'),
(10, '2024-06-03 22:55:35', '2024-06-03', 'NULL', 'NULL');

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
(1, '2024-06-03 22:55:33', 32.10361031298754, 15.384235220165909, 17.29210154143368, 4.363326298255998, 68.01819313642225, 21.793886139335065, 101.3, 0.1),
(2, '2024-06-03 22:55:46', 27.585758703492292, 21.491943740537685, 17.975331841418466, 4.423232419197737, 34.87773384881832, 10.870551618742228, 101.3, 0.1),
(3, '2024-06-03 22:55:44', 28.808479214855076, 22.867553733301303, 24.504164980869326, 2.0447239068476764, 60.93040020159259, 28.366134405256496, 101.3, 0.1),
(4, '2024-06-03 22:55:40', 29.116924417707093, 20.42746389893934, 15.486946320523991, 2.3609051066551667, 52.099691332916805, 13.828239339345368, 101.3, 0.1),
(5, '2024-06-03 22:55:38', 33.083485617064845, 22.288456036893862, 22.48295952567678, 2.8618795470155325, 32.554766221406325, 27.64112885567921, 101.3, 0.1),
(6, '2024-06-03 22:55:35', 29.505631640018, 17.44555042714281, 22.722294004179453, 3.9419028454873204, 57.319640228128925, 18.945156083533522, 101.3, 0.1),
(7, '2024-06-03 22:55:52', 26.774316293841288, 21.548540184694772, 24.454225935110436, 2.8248737258034238, 64.96672349622528, 27.96943062326904, 101.3, 0.1),
(8, '2024-06-03 22:55:48', 28.980860830679468, 23.36585011140843, 27.512331472237705, 5.274163011203862, 59.812770582988605, 14.330372782352844, 101.3, 0.1),
(9, '2024-06-03 22:55:42', 27.629535979149942, 23.318744636055577, 20.67451996708536, 3.161527651210861, 47.15801476097293, 27.81308640123282, 101.3, 0.1),
(10, '2024-06-03 22:55:50', 32.15200553217138, 22.683304652063992, 29.633209388845863, 3.259506660109175, 68.43823120694788, 11.810249649052203, 101.3, 0.1);

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
  MODIFY `crop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cycle_dimension`
--
ALTER TABLE `cycle_dimension`
  MODIFY `cycle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fact_table`
--
ALTER TABLE `fact_table`
  MODIFY `fact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `irrigation_dimension`
--
ALTER TABLE `irrigation_dimension`
  MODIFY `irrigation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `location_dimension`
--
ALTER TABLE `location_dimension`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `time_dimension`
--
ALTER TABLE `time_dimension`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
