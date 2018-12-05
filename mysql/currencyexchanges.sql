-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 05, 2018 at 07:30 AM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.2.12-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `currencyexchanges`
--

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `history_date` date DEFAULT NULL,
  `history_rate` float DEFAULT NULL,
  `fk_track_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `history_date`, `history_rate`, `fk_track_id`, `createdAt`, `updatedAt`) VALUES
(1, '2018-07-01', 1.365, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(2, '2018-07-02', 1.288, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(3, '2018-07-03', 1.333, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(4, '2018-07-04', 1.187, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(5, '2018-07-05', 1.255, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(6, '2018-07-06', 1.275, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(7, '2018-07-07', 1.265, 1, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(8, '2018-07-01', 0.760123, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(9, '2018-07-02', 0.7623, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(10, '2018-07-03', 0.7523, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(11, '2018-07-04', 0.7723, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(12, '2018-07-05', 0.7623, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(13, '2018-07-06', 0.7613, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(14, '2018-07-07', 0.7701, 2, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(15, '2018-07-01', 14123, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(16, '2018-07-02', 15123, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(17, '2018-07-03', 14753, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(18, '2018-07-04', 14873, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(19, '2018-07-05', 14553, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(20, '2018-07-07', 0.7701, 3, '2018-12-04 23:56:43', '2018-12-04 23:56:43'),
(21, '2018-07-08', 0.76296, 2, '2018-12-04 23:59:07', '2018-12-04 23:59:07');

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `from` varchar(3) DEFAULT NULL,
  `to` varchar(3) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `from`, `to`, `createdAt`, `updatedAt`) VALUES
(1, 'GBP', 'USD', '2018-12-04 23:56:35', '2018-12-04 23:56:35'),
(2, 'USD', 'GBP', '2018-12-04 23:56:35', '2018-12-04 23:56:35'),
(3, 'USD', 'IDR', '2018-12-04 23:56:35', '2018-12-04 23:56:35'),
(4, 'JPY', 'IDR', '2018-12-04 23:56:35', '2018-12-04 23:56:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_track_id` (`fk_track_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`fk_track_id`) REFERENCES `tracks` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
