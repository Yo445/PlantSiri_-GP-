-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 01:53 AM
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
(1, 5, 1, 5, 1, 11, 3, 'Jm831VMl', 6.962005750215872, 7.735561944684302, 'ON'),
(2, 8, 1, 6, 1, 12, 10, 'Ba3ZTQdP', 8.621939229449978, 9.579932477166642, 'ON'),
(3, 9, 1, 7, 1, 10, 5, 'VVHdHnJv', 9.016143780381924, 10.017937533757694, 'ON'),
(4, 7, 1, 10, 1, 8, 6, '1CvkD85G', 9.342386664003012, 10.380429626670013, 'ON'),
(5, 1, 1, 9, 1, 4, 11, 'rvGbv0LR', 11.032643656659882, 12.258492951844314, 'ON'),
(6, 3, 1, 12, 1, 7, 4, 'aUKhYTpA', 9.576304417683192, 10.640338241870213, 'ON'),
(7, 4, 1, 4, 1, 9, 9, 'JowASkGb', 8.093474699984522, 8.99274966664947, 'ON'),
(8, 2, 1, 3, 1, 5, 7, '4QXWKshg', 9.517071551090462, 10.574523945656068, 'ON'),
(9, 10, 1, 8, 1, 6, 12, '57aI9skl', 12.967535189632564, 14.40837243292507, 'ON'),
(10, 6, 1, 11, 1, 3, 8, 'ZijlL7PJ', 8.48806254937304, 9.43118061041449, 'ON'),
(11, 11, 1, 13, 1, 13, 13, '8q2z4jQE', 11.417445284545702, 12.68605031616189, 'ON'),
(12, 19, 1, 22, 1, 15, 22, 'BXNkFSos', 7.400906148217521, 8.223229053575023, 'ON'),
(13, 13, 1, 15, 1, 19, 18, 'N9WLcBpw', 7.242783305835306, 8.047537006483672, 'ON'),
(14, 14, 1, 14, 1, 20, 14, 'Ym3o2Q5N', 8.986618286008438, 9.985131428898265, 'ON'),
(15, 15, 1, 18, 1, 18, 15, 'QxnHxsSN', 5.920865230065562, 6.578739144517291, 'ON'),
(16, 20, 1, 17, 1, 16, 21, 'Ong5jvvZ', 14.284414717038516, 15.871571907820572, 'ON'),
(17, 17, 1, 21, 1, 14, 16, 'e6vPabwm', 12.274647440878528, 13.638497156531697, 'ON'),
(18, 18, 1, 19, 1, 17, 20, 'Q8eDn6xJ', 9.934183735114646, 11.037981927905161, 'ON'),
(19, 12, 1, 20, 1, 21, 17, '8HFsRHPb', 11.405311422019464, 12.672568246688293, 'ON'),
(20, 16, 1, 16, 1, 22, 19, 'AoQmbaor', 11.269402499410006, 12.521558332677785, 'ON');

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
(1, '2024-06-08 02:10:43', '02:10:43', 154, '02:13:17', 'irrigated', 15356.02530554212, 1454.1876928159738, '59.42008817072314', 89.25522367251855, 100),
(2, '2024-06-08 02:10:42', '02:10:42', 408, '02:17:30', 'irrigated', 40816.126079136346, 3873.0622858743977, '76.37984980697638', 91.14041466673088, 100),
(3, '2024-06-08 02:15:20', '02:15:20', 271, '02:19:51', 'irrigated', 27101.739986870358, 3564.703059414845, '90.578143303997', 91.57154931558372, 100),
(4, '2024-06-08 02:15:21', '02:15:21', 314, '02:20:35', 'irrigated', 31408.165175633785, 2773.816462500699, '81.59603283417948', 84.57326524853833, 100),
(5, '2024-06-08 02:15:18', '02:15:18', 70, '02:16:28', 'irrigated', 6959.773952052401, 665.0914703724125, '61.9333749979934', 86.16027424590335, 100),
(6, '2024-06-08 02:15:12', '02:15:12', 1501, '02:17:23', 'irrigated', 13083.659075844249, 1351.2291469574568, '64.6322461832397', 96.48451621499424, 100),
(7, '2024-06-08 02:15:15', '02:15:15', 289, '02:20:04', 'irrigated', 28902.25837876966, 2935.9773377318606, '94.81634016700303', 96.67724241265212, 100),
(8, '2024-06-08 02:15:14', '02:15:14', 149, '02:17:43', 'irrigated', 14905.31956812446, 1466.407369410255, '58.76879666157724', 83.50681390980755, 100),
(9, '2024-06-08 02:15:13', '02:15:13', 278, '02:19:51', 'irrigated', 27846.726704367567, 3438.9122838233957, '79.32254802994706', 99.94980688421549, 100),
(10, '2024-06-08 02:15:11', '02:15:11', 256, '02:19:27', 'irrigated', 25624.681488353293, 2496.9198254900684, '49.954309875601055', 84.01388718126728, 100),
(11, '2024-06-08 02:15:17', '02:15:17', 96, '02:16:53', 'irrigated', 9584.767854117872, 702.2072900655779, '63.66053927164597', 80.82827797518246, 100),
(12, '2024-06-08 02:15:19', '02:15:19', 442, '02:22:41', 'irrigated', 44200.24161229732, 3293.452060539087, '48.06140618667273', 96.62380550998243, 100),
(13, '2024-06-08 02:25:34', '02:25:34', 473, '02:33:27', 'irrigated', 47252.429948647026, 3561.1503562603266, '46.11233054979576', 86.04687502172975, 100),
(14, '2024-06-08 02:25:37', '02:25:37', 247, '02:29:44', 'irrigated', 24681.11355859827, 2445.8956500810473, '96.04041921910819', 89.05728877467706, 100),
(15, '2024-06-08 02:25:40', '02:25:40', 248, '02:29:48', 'irrigated', 24849.780912199283, 3458.9953876908817, '73.21933716968739', 82.41620155243261, 100),
(16, '2024-06-08 02:25:44', '02:25:44', 209, '02:29:13', 'irrigated', 20878.075429988075, 1589.3564203397618, '96.90393958949795', 93.4415137208768, 100),
(17, '2024-06-08 02:25:39', '02:25:39', 165, '02:28:24', 'irrigated', 16527.6227196309, 1287.5869563318029, '74.10768940415802', 88.85325172900815, 100),
(18, '2024-06-08 02:25:42', '02:25:42', 91, '02:27:13', 'irrigated', 9109.556016928227, 1255.569997019596, '66.67435288711735', 99.8272736544155, 100),
(19, '2024-06-08 02:25:36', '02:25:36', 369, '02:31:45', 'irrigated', 36927.785551387264, 2980.4434667436617, '82.66048964784474', 90.95540539990343, 100),
(20, '2024-06-08 02:25:43', '02:25:43', 235, '02:29:38', 'irrigated', 23526.994656684168, 2083.3892057913254, '64.07854489778383', 87.97031437334695, 100),
(21, '2024-06-08 02:25:41', '02:25:41', 478, '02:33:39', 'irrigated', 47773.33597361513, 3193.989964560936, '69.13065336616987', 95.50155191390762, 100),
(22, '2024-06-08 02:25:35', '02:25:35', 300, '02:30:35', 'irrigated', 30032.966695732826, 3305.1506984098787, '96.41664025214462', 81.44753188209879, 100);

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
(1, 28.180564711969275, 69.73793374947819),
(2, 29.25005464546138, 33.42115407583991),
(3, 25.413149296560032, 44.2995663338066),
(4, 27.944527619166312, 46.23043791419732),
(5, 27.07500268062361, 13.045976584515603),
(6, 23.78225009844087, 27.22222453484038),
(7, 29.013978175097893, 34.45995600312034),
(8, 24.447178150354937, 88.00666272688153),
(9, 30.779420834836152, 62.69590115196739),
(10, 24.163217113916286, 32.21057624402867),
(11, 29.278839889230415, 8.848916867174767),
(12, 22.55370454943204, 86.15142141148749),
(13, 27.81215471062998, 80.06664551339361),
(14, 29.413595525680932, 19.515901204210287),
(15, 25.297469602159147, 27.041615070068097),
(16, 27.77431365356033, 92.5209696112354),
(17, 28.33405892959766, 30.224862456251607),
(18, 26.387298574064666, 69.61832267962663),
(19, 28.9539296393149, 54.10010573035268),
(20, 28.984053093664254, 63.3348413885649),
(21, 25.979048120690184, 59.806473306356274),
(22, 27.180656969557354, 37.33746375012508);

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
('1CvkD85G'),
('4QXWKshg'),
('57aI9skl'),
('8HFsRHPb'),
('8q2z4jQE'),
('AoQmbaor'),
('aUKhYTpA'),
('Ba3ZTQdP'),
('BXNkFSos'),
('e6vPabwm'),
('hJbuIPJN'),
('Jm831VMl'),
('JowASkGb'),
('N9WLcBpw'),
('Ong5jvvZ'),
('Q8eDn6xJ'),
('QmKKHzTm'),
('QxnHxsSN'),
('rvGbv0LR'),
('VVHdHnJv'),
('Ym3o2Q5N'),
('ZijlL7PJ');

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
(1, '2024-06-08 02:15:17', '2024-06-08', '2024-06-28', 'NULL'),
(2, '2024-06-08 02:15:15', '2024-06-08', '2024-06-28', 'NULL'),
(3, '2024-06-08 02:15:21', '2024-06-08', '2024-06-28', 'NULL'),
(4, '2024-06-08 02:15:13', '2024-06-08', '2024-06-28', 'NULL'),
(5, '2024-06-08 02:15:20', '2024-06-08', '2024-06-28', 'NULL'),
(6, '2024-06-08 02:15:14', '2024-06-08', '2024-06-28', 'NULL'),
(7, '2024-06-08 02:15:12', '2024-06-08', '2024-06-28', 'NULL'),
(8, '2024-06-08 02:15:11', '2024-06-08', '2024-06-28', 'NULL'),
(9, '2024-06-08 02:15:18', '2024-06-08', '2024-06-28', 'NULL'),
(10, '2024-06-08 02:15:19', '2024-06-08', '2024-06-28', 'NULL'),
(11, '2024-06-08 02:25:34', '2024-06-08', '2024-06-28', 'NULL'),
(12, '2024-06-08 02:25:39', '2024-06-08', '2024-06-28', 'NULL'),
(13, '2024-06-08 02:25:42', '2024-06-08', '2024-06-28', 'NULL'),
(14, '2024-06-08 02:25:37', '2024-06-08', '2024-06-28', 'NULL'),
(15, '2024-06-08 02:25:40', '2024-06-08', '2024-06-28', 'NULL'),
(16, '2024-06-08 02:25:36', '2024-06-08', '2024-06-28', 'NULL'),
(17, '2024-06-08 02:25:44', '2024-06-08', '2024-06-28', 'NULL'),
(18, '2024-06-08 02:25:43', '2024-06-08', '2024-06-28', 'NULL'),
(19, '2024-06-08 02:25:35', '2024-06-08', '2024-06-28', 'NULL'),
(20, '2024-06-08 02:25:41', '2024-06-08', '2024-06-28', 'NULL');

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
(1, '2024-06-08 02:10:42', 25.85464676107896, 20.00687150245298, 24.48676796124462, 5.458509900061587, 63.93601843170886, 13.771750070318177, 101.3, 0.1),
(2, '2024-06-08 02:10:43', 25.02900278003259, 18.814063265424164, 26.13623816147065, 3.7851394137326637, 36.70386531917464, 10.958056545263616, 101.3, 0.1),
(3, '2024-06-08 02:15:14', 25.704893870754706, 19.332650725045017, 21.63750145775015, 3.5096422670733873, 47.89627812380367, 16.664673368532107, 101.3, 0.1),
(4, '2024-06-08 02:15:17', 33.640813349556616, 16.58554138629554, 17.413048309127923, 5.71523919903942, 68.75643725836282, 28.559055668873235, 101.3, 0.1),
(5, '2024-06-08 02:15:15', 29.120952968658486, 17.946653235472894, 29.88284357877252, 4.932844807592817, 63.304188377483584, 22.93966038836693, 101.3, 0.1),
(6, '2024-06-08 02:15:19', 33.090823821493885, 23.44789805833603, 19.482351929011035, 4.415752538316784, 50.94405504484057, 17.876556651996324, 101.3, 0.1),
(7, '2024-06-08 02:15:21', 28.910971402213875, 21.779884516064197, 21.03539816288791, 3.3623588756662706, 34.05615123191251, 28.68712324566096, 101.3, 0.1),
(8, '2024-06-08 02:15:12', 32.566741361858945, 15.736770246542946, 18.413997882027267, 3.217546564797306, 36.19138341470679, 29.540124041358798, 101.3, 0.1),
(9, '2024-06-08 02:15:13', 27.356119107410947, 19.485705361223637, 18.15293234002715, 3.963628806177138, 55.281681995441254, 29.92080185696709, 101.3, 0.1),
(10, '2024-06-08 02:15:18', 33.19517543204456, 20.36909407908592, 20.428257028916782, 2.749986371486352, 48.14298195718463, 29.807413267575328, 101.3, 0.1),
(11, '2024-06-08 02:15:20', 29.35815202266312, 17.55177095854992, 18.52652569076294, 2.0208034572115463, 59.866986691144916, 13.298229914853758, 101.3, 0.1),
(12, '2024-06-08 02:15:11', 32.9721018270181, 22.169384887201648, 24.23411538616167, 2.7802500503101015, 69.34386643915751, 25.29000797336954, 101.3, 0.1),
(13, '2024-06-08 02:25:34', 32.311131208301816, 17.69699904043909, 18.71455448489103, 4.279459302188765, 50.60855974920167, 18.341070241903196, 101.3, 0.1),
(14, '2024-06-08 02:25:44', 33.7863690108135, 15.927670323194317, 17.21364610681851, 5.120858035926844, 68.37392379274065, 15.9177873537366, 101.3, 0.1),
(15, '2024-06-08 02:25:35', 25.945565406542233, 23.708839757902773, 26.620718538907106, 2.9151262074138495, 64.41795072976072, 19.493224399243996, 101.3, 0.1),
(16, '2024-06-08 02:25:41', 34.178104029043254, 17.497212669841154, 25.423715273504673, 4.470071387738169, 30.576564420483, 11.826851355441136, 101.3, 0.1),
(17, '2024-06-08 02:25:43', 29.136067077262613, 17.27232752948437, 15.998094826370165, 3.7907874732430833, 47.57230148160134, 14.475228338043273, 101.3, 0.1),
(18, '2024-06-08 02:25:40', 25.172497600289297, 16.885454494120232, 16.524966783916895, 2.154261909738404, 37.25925948453304, 27.928864726971486, 101.3, 0.1),
(19, '2024-06-08 02:25:42', 27.181335937130722, 16.300544028938667, 29.8609584236291, 3.1370955517271053, 68.18462881147961, 17.976440808052665, 101.3, 0.1),
(20, '2024-06-08 02:25:37', 27.946024844936204, 18.89649772421952, 16.639137889602797, 4.065866799157034, 46.16649594736437, 27.088114572033035, 101.3, 0.1),
(21, '2024-06-08 02:25:39', 30.08284455116178, 16.04798860331799, 18.801415953282916, 5.989534289672845, 42.21234921665576, 22.961502544283835, 101.3, 0.1),
(22, '2024-06-08 02:25:36', 33.5414705683358, 18.07997725710208, 28.99192116776362, 3.8003633222327684, 64.7583334521274, 14.58241626257885, 101.3, 0.1);

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
  MODIFY `fact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `irrigation_dimension`
--
ALTER TABLE `irrigation_dimension`
  MODIFY `irrigation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `location_dimension`
--
ALTER TABLE `location_dimension`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `time_dimension`
--
ALTER TABLE `time_dimension`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `weather_dimension`
--
ALTER TABLE `weather_dimension`
  MODIFY `weather_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
