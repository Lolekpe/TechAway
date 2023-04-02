-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 12:14 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `sklepy`
--

CREATE TABLE `sklepy` (
  `ID` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `typ` int(11) NOT NULL,
  `motyw` int(11) NOT NULL,
  `uklad` int(11) NOT NULL,
  `opis` text NOT NULL,
  `logo` text NOT NULL,
  `link` text NOT NULL,
  `widocznosc` tinyint(1) NOT NULL DEFAULT 1,
  `wlasciciel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sklepy`
--

INSERT INTO `sklepy` (`ID`, `nazwa`, `typ`, `motyw`, `uklad`, `opis`, `logo`, `link`, `widocznosc`, `wlasciciel`) VALUES
(40, 'Abibas', 0, 1, 1, 'Abibas to sklep z sportowym i wygodnym obuwiem do chodzenia i nie tylko!', '/images/serwery/abibas/logo.png', '/abibas/index', 1, 1),
(41, 'Kantyna Elektronik', 0, 2, 1, 'Miejsce gdzie możesz zjeść między lekcjami, albo zakupić artykuły spożywcze ', '/images/serwery/kantyna_elektronik/logo.png', '/kantyna_elektronik/index', 1, 2),
(42, 'Pizza Hub', 0, 3, 1, 'Idealna pizzera do spędzenia wolnych wieczorów i zjedzenia idealnego serowego placka!', '/images/serwery/pizza_hub/logo.png', '/pizza_hub/index', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `ID` int(11) NOT NULL,
  `imie` text NOT NULL,
  `nazwisko` text NOT NULL,
  `telefon` int(11) DEFAULT NULL,
  `email` text NOT NULL,
  `haslo` text NOT NULL,
  `sprzedawca` tinyint(1) NOT NULL DEFAULT 0,
  `potwierdzony` tinyint(1) NOT NULL DEFAULT 0,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `ustawienia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{ "email": true, "popout": true, "strona": false}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`ID`, `imie`, `nazwisko`, `telefon`, `email`, `haslo`, `sprzedawca`, `potwierdzony`, `admin`, `ustawienia`) VALUES
(1, 'Administrator', 'TechAway', 765852212, 'techaway@admin.com', 'O2Esdae1BIpDX7bsgeUv+S1teVqLWpwXBw9qY8l6U7I=', 1, 1, 1, '{ \"email\": true, \"popout\": true, \"strona\": false}'),
(12, 'piotr', 'sowa', 798648422, 'mail@mail.com', 'XDuieFHPLGCAjQoFrVyT8fVWXLb21yYBisVx5Nh44n4=', 1, 0, 0, '{ \"email\": true, \"popout\": true, \"strona\": false}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sklepy`
--
ALTER TABLE `sklepy`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sklepy`
--
ALTER TABLE `sklepy`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
