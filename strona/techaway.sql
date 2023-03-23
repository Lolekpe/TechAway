-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Mar 2023, 23:11
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `techaway`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sklepy`
--

CREATE TABLE `sklepy` (
  `ID` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `typ` int(11) NOT NULL,
  `opis` text NOT NULL,
  `logo` text NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `sklepy`
--

INSERT INTO `sklepy` (`ID`, `nazwa`, `typ`, `opis`, `logo`, `link`) VALUES
(1, 'Abibas', 3, 'Abibas to sklep z sportowym i wygodnym obuwiem do chodzenia i nie tylko!', '/images/serwery/abibas/logo.png', '/abibas/index'),
(2, 'Pizza Hub', 4, 'Idealna pizzera do spędzenia wolnych wieczorów i zjedzenia idealnego serowego placka!', '/images/serwery/pizza-hub/logo.png', '/pizza-hub/index'),
(3, 'Kantyna Elektronik', 4, 'Miejsce gdzie możesz zjeść między lekcjami, albo zakupić artykuły spożywcze ', '/images/serwery/kantyna-elektronik/logo.png', '/elektronik-kantyna/index');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
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
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`ID`, `imie`, `nazwisko`, `telefon`, `email`, `haslo`, `sprzedawca`, `potwierdzony`, `admin`) VALUES
(1, 'Administrator', 'TechAway', 0, 'techaway@admin.com', 'O2Esdae1BIpDX7bsgeUv+S1teVqLWpwXBw9qY8l6U7I=', 1, 1, 1),
(6, 'Patryk', 'Suchożebrski', 0, 'patryksuchy57@techaway.pl', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 0, 0, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `sklepy`
--
ALTER TABLE `sklepy`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `sklepy`
--
ALTER TABLE `sklepy`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
