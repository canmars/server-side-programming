-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 21 May 2024, 11:15:23
-- Sunucu sürümü: 8.2.0
-- PHP Sürümü: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `universite_bilgi_sistemi`
--

DELIMITER $$
--
-- Yordamlar
--
DROP PROCEDURE IF EXISTS `soru1`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru1` ()  NO SQL SELECT  ogrenci_bilgi.Ogr_No, CONCAT(ogrenci_bilgi.Ogr_Ad,' ', ogrenci_bilgi.Ogr_Soyad) AS ogrenci
FROM ogrenci_bilgi, bolum
where ogrenci_bilgi.Bolum_Kod=bolum.Bolum_Kod and bolum.Bolum_Ad="Yönetim Bilişim Sistemleri"$$

DROP PROCEDURE IF EXISTS `soru10`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru10` ()  NO SQL SELECT dersler.Ders_Ad,avg(ogrenci_dersler.Final)
FROM ogrenci_dersler,dersler,ogrenci_bilgi
WHERE ogrenci_dersler.Ders_Kod=dersler.Ders_Kod AND
ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No
and dersler.Ders_Kod in (SELECT dersler.Ders_Kod from dersler, ogrenci_dersler, ogrenci_bilgi where ogrenci_bilgi.Ogr_Ad="Cahit" and ogrenci_dersler.Ders_Kod=dersler.Ders_Kod AND
ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No)
GROUP by dersler.Ders_Kod$$

DROP PROCEDURE IF EXISTS `soru11`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru11` (IN `ograd` VARCHAR(255))  NO SQL SELECT CONCAT(ogrenci_bilgi.Ogr_Ad, ' ',ogrenci_bilgi.Ogr_Soyad) AS ogrenci, dersler.Ders_Ad, hocalar.Hoca_Isim, hocalar.Hoca_Soyad
FROM ogrenci_dersler,dersler,ogrenci_bilgi, hocalar
WHERE ogrenci_dersler.Ders_Kod=dersler.Ders_Kod AND
ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No AND ogrenci_dersler.Hoca_Kod = hocalar.Hoca_Kod AND 
ogrenci_bilgi.Ogr_Ad = ograd
GROUP BY ogrenci_bilgi.Ogr_No$$

DROP PROCEDURE IF EXISTS `soru12`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru12` ()  NO SQL SELECT concat(ogrenci_bilgi.Ogr_Ad,ogrenci_bilgi.Ogr_Soyad)as ogrenciBilgi
from ogrenci_bilgi,ogrenci_dersler,dersler
WHERE ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No AND
dersler.Ders_Kod=ogrenci_dersler.Ders_Kod AND dersler.Ders_Ad="Veri Tabanı"
AND ogrenci_dersler.Final>(SELECT ogrenci_dersler.Final from ogrenci_bilgi,ogrenci_dersler,dersler WHERE ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No and dersler.Ders_Kod=ogrenci_dersler.Ders_Kod AND ogrenci_bilgi.Ogr_Ad="Fehmi" AND dersler.Ders_Ad="Veri Tabanı")$$

DROP PROCEDURE IF EXISTS `soru13`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru13` ()  NO SQL SELECT hocalar.Hoca_Isim, hocalar.Hoca_Soyad
FROM hocalar, unvan
WHERE unvan.Unvan_Kod=hocalar.Unvan_Kod AND unvan.Unvan_Ad='doçent'$$

DROP PROCEDURE IF EXISTS `soru14`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru14` ()  NO SQL SELECT hocalar.Hoca_Isim, hocalar.Hoca_Soyad as hoca_bilgi, dersler.Ders_Ad
FROM hocalar, unvan, dersler,hoca_ders
WHERE unvan.Unvan_Kod=hocalar.Unvan_Kod AND hoca_ders.Hoca_Kod=hocalar.Hoca_Kod AND hoca_ders.Ders_Kod=dersler.Ders_Kod AND unvan.Unvan_Ad='doçent'$$

DROP PROCEDURE IF EXISTS `soru15`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru15` ()  NO SQL SELECT hocalar.Hoca_Isim, hocalar.Hoca_Soyad, fakulte.Fakulte_Ad, fakulte.Fakulte_Dekan
FROM hocalar, unvan, fakulte
WHERE unvan.Unvan_Kod=hocalar.Unvan_Kod AND fakulte.Fakulte_Kod=hocalar.Fakulte_Kod AND unvan.Unvan_Ad='doçent'$$

DROP PROCEDURE IF EXISTS `soru16`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru16` ()  NO SQL SELECT CONCAT(hocalar.Hoca_Isim, " ", hocalar.Hoca_Soyad) AS isim,bolum.Bolum_Ad,fakulte.Fakulte_Ad,unvan.Unvan_Ad  
FROM bolum,fakulte,hocalar,unvan 
WHERE hocalar.Fakulte_Kod=fakulte.Fakulte_Kod AND unvan.Unvan_Kod=hocalar.Unvan_Kod AND hocalar.Bolum_Kod=bolum.Bolum_Kod AND hocalar.Hoca_Isim="Çiğdem"  AND hocalar.Hoca_Soyad= "Tarhan"$$

DROP PROCEDURE IF EXISTS `soru17`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru17` ()  NO SQL SELECT dersler.Ders_Ad FROM dersler,bolum WHERE bolum.Bolum_Kod=dersler.Bolum_Kod AND bolum.Bolum_Ad IN (SELECT bolum.Bolum_Ad FROM bolum,fakulte,hocalar,unvan WHERE hocalar.Fakulte_Kod=fakulte.Fakulte_Kod AND unvan.Unvan_Kod=hocalar.Unvan_Kod AND hocalar.Bolum_Kod=bolum.Bolum_Kod AND hocalar.Hoca_Isim="Çiğdem"  AND hocalar.Hoca_Soyad= "Tarhan")$$

DROP PROCEDURE IF EXISTS `soru18`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru18` ()  NO SQL SELECT CONCAT(ogrenci_bilgi.Ogr_Ad," ",ogrenci_bilgi.Ogr_Soyad) AS ad_soyad, dersler.Ders_Ad, ogrenci_dersler.Final FROM ogrenci_bilgi, ogrenci_dersler,dersler WHERE ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No AND dersler.Ders_Kod=ogrenci_dersler.Ders_Kod AND ogrenci_dersler.Final < (SELECT ogrenci_dersler.Final  FROM ogrenci_bilgi, ogrenci_dersler, dersler  WHERE dersler.Ders_Kod=ogrenci_dersler.Ders_Kod  AND ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No  AND ogrenci_bilgi.Ogr_Ad="cahit" AND ogrenci_bilgi.Ogr_Soyad="yılmaz"  AND dersler.Ders_Ad = (SELECT dersler.Ders_Ad FROM dersler,hoca_ders,hocalar WHERE dersler.Ders_Kod=hoca_ders.Ders_Kod AND hoca_ders.Hoca_Kod=hocalar.Hoca_Kod AND hocalar.Hoca_Isim="çiğdem" AND dersler.Ders_Ad="veri tabanı")) AND dersler.Ders_Ad = (SELECT dersler.Ders_Ad FROM dersler,hoca_ders,hocalar WHERE dersler.Ders_Kod=hoca_ders.Ders_Kod AND hoca_ders.Hoca_Kod=hocalar.Hoca_Kod AND hocalar.Hoca_Isim="çiğdem" AND dersler.Ders_Ad="veri tabanı")$$

DROP PROCEDURE IF EXISTS `soru19`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru19` ()  NO SQL SELECT dersler.Ders_Ad, dersler.Ders_Kod, gun.Gun_Ad,saat.Saat FROM dersler,bolum, ders_donem,gun,saat,hoca_ders WHERE bolum.Bolum_Kod=dersler.Bolum_Kod AND dersler.Ders_Donem=ders_donem.Donem_Kod AND dersler.Ders_Kod=hoca_ders.Ders_Kod AND hoca_ders.Gun_Kod=gun.Gun_Kod AND hoca_ders.Saat_Kod=saat.Saat_Kod AND ders_donem.Donem_Ad="güz" AND bolum.Bolum_Ad IN  (SELECT bolum.Bolum_Ad FROM bolum,fakulte,hocalar,unvan WHERE hocalar.Fakulte_Kod=fakulte.Fakulte_Kod AND unvan.Unvan_Kod=hocalar.Unvan_Kod AND hocalar.Bolum_Kod=bolum.Bolum_Kod AND hocalar.Hoca_Isim="Çiğdem"  AND hocalar.Hoca_Soyad= "Tarhan")$$

DROP PROCEDURE IF EXISTS `soru2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru2` ()  NO SQL SELECT COUNT(ogrenci_bilgi.Ogr_No) as ogrenci_sayisi,bolum.Bolum_Ad
FROM ogrenci_bilgi, bolum
where ogrenci_bilgi.Bolum_Kod=bolum.Bolum_Kod
GROUP by ogrenci_bilgi.Bolum_Kod$$

DROP PROCEDURE IF EXISTS `soru20`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru20` ()  NO SQL SELECT dersler.Ders_Ad FROM dersler,hoca_ders,hocalar WHERE dersler.Ders_Kod=hoca_ders.Ders_Kod AND hoca_ders.Hoca_Kod=hocalar.Hoca_Kod AND CONCAT(hocalar.Hoca_Isim, " ",hocalar.Hoca_Soyad)=(SELECT CONCAT(hocalar.Hoca_Isim, " ",hocalar.Hoca_Soyad) as BolumBsk_adSoyad FROM hocalar,bolum,bolum_baskanligi WHERE bolum_baskanligi.Bolum_Baskan_Id=hocalar.Hoca_Kod AND bolum_baskanligi.Bolum_Id=bolum.Bolum_Kod AND bolum.Bolum_Ad= (SELECT bolum.Bolum_Ad FROM bolum,fakulte,hocalar,unvan WHERE hocalar.Fakulte_Kod=fakulte.Fakulte_Kod AND unvan.Unvan_Kod=hocalar.Unvan_Kod AND hocalar.Bolum_Kod=bolum.Bolum_Kod AND hocalar.Hoca_Isim="Çiğdem"  AND hocalar.Hoca_Soyad= "Tarhan"))$$

DROP PROCEDURE IF EXISTS `soru3`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru3` ()  NO SQL SELECT *
FROM ders_donem, dersler
WHERE ders_donem.Donem_Kod=dersler.Ders_Donem AND ders_donem.Donem_Ad='bahar'$$

DROP PROCEDURE IF EXISTS `soru4`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru4` (IN `fakad` VARCHAR(200))  NO SQL Select COUNT(*), ogrenci_bilgi.Fakulte_Kod From ogrenci_bilgi Where ogrenci_bilgi.Fakulte_Kod IN (Select fakulte.Fakulte_Kod From fakulte Where fakulte.Fakulte_Ad LIKE concat('%',fakad,'%'))
GROUP BY ogrenci_bilgi.Fakulte_Kod$$

DROP PROCEDURE IF EXISTS `soru5`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru5` (IN `fakad` VARCHAR(200))  NO SQL SELECT bolum.Bolum_Ad,COUNT(ogrenci_bilgi.Ogr_No)
FROM bolum,ogrenci_bilgi,fakulte
WHERE bolum.Bolum_Kod=ogrenci_bilgi.Bolum_Kod 
and ogrenci_bilgi.Fakulte_Kod = fakulte.Fakulte_Kod
and fakulte.Fakulte_Ad LIKE concat('%',fakad,'%')
GROUP by ogrenci_bilgi.Bolum_Kod$$

DROP PROCEDURE IF EXISTS `soru6`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru6` ()  NO SQL SELECT concat(ogrenci_bilgi.Ogr_Ad, " ", ogrenci_bilgi.Ogr_Soyad) AS ogrenci_adi, (SELECT YEAR(now())-year(ogrenci_bilgi.Ogr_Giris_Tarih)) as kacinci_yil, ogrenci_durum.Durum_Ad
FROM ogrenci_bilgi, iller, ogrenci_kimlik, ogrenci_durum 
WHERE ogrenci_bilgi.Ogr_No=ogrenci_kimlik.Ogr_No AND ogrenci_kimlik.Il_kod=iller.Il_kod AND iller.Il_ad='mersin' AND ogrenci_bilgi.Durum_Kod=ogrenci_durum.Durum_Kod AND ogrenci_durum.Durum_Ad<>'mezun'$$

DROP PROCEDURE IF EXISTS `soru7`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru7` ()  NO SQL SELECT concat(ogrenci_bilgi.Ogr_Ad, " ", ogrenci_bilgi.Ogr_Soyad) AS ogrenci_adi, bolum.Bolum_Ad
FROM ogrenci_bilgi, iller, ogrenci_kimlik,bolum 
WHERE ogrenci_bilgi.Ogr_No=ogrenci_kimlik.Ogr_No AND ogrenci_kimlik.Il_kod=iller.Il_kod AND iller.Il_ad='mersin' AND bolum.Bolum_Kod=ogrenci_bilgi.Bolum_Kod$$

DROP PROCEDURE IF EXISTS `soru8`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru8` ()  NO SQL SELECT concat(ogrenci_bilgi.Ogr_Ad, " ", ogrenci_bilgi.Ogr_Soyad) AS ogrenci_adi, bolum.Bolum_Ad, CONCAT(hocalar.Hoca_Isim, ' ', hocalar.Hoca_Soyad) AS bolum_baskani
FROM ogrenci_bilgi, iller, ogrenci_kimlik,bolum, bolum_baskanligi, hocalar
WHERE 
ogrenci_bilgi.Ogr_No=ogrenci_kimlik.Ogr_No 
AND ogrenci_kimlik.Il_kod=iller.Il_kod 
AND iller.Il_ad='mersin' AND bolum.Bolum_Kod=ogrenci_bilgi.Bolum_Kod 
AND bolum_baskanligi.Bolum_Baskan_Id=hocalar.Hoca_Kod 
AND bolum_baskanligi.Bolum_Id=bolum.Bolum_Kod$$

DROP PROCEDURE IF EXISTS `soru9`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `soru9` ()  NO SQL SELECT dersler.Ders_Ad
FROM ogrenci_dersler,dersler,ogrenci_bilgi
WHERE ogrenci_dersler.Ders_Kod=dersler.Ders_Kod AND
ogrenci_bilgi.Ogr_No=ogrenci_dersler.Ogr_No
and ogrenci_bilgi.Ogr_Ad="Cahit" AND ogrenci_bilgi.Ogr_Soyad='yılmaz'$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bolum`
--

DROP TABLE IF EXISTS `bolum`;
CREATE TABLE IF NOT EXISTS `bolum` (
  `Bolum_Kod` int NOT NULL,
  `Bolum_Ad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Kod` int NOT NULL,
  PRIMARY KEY (`Bolum_Kod`),
  KEY `Fakulte_Kod` (`Fakulte_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `bolum`
--

INSERT INTO `bolum` (`Bolum_Kod`, `Bolum_Ad`, `Fakulte_Kod`) VALUES
(100, 'yönetim bilişim sistemleri', 100),
(101, 'ekonometri', 100),
(102, 'iktisat', 100),
(103, 'işletme', 100),
(104, 'kamu yönetimi', 100),
(105, 'maliye', 100),
(106, 'çalışma ekonomisi ve endüstri ilişkileri', 100),
(107, 'bilgisayar bilimleri', 102),
(108, 'matematik', 102),
(109, 'fizik', 102),
(110, 'istatistik', 102),
(111, 'kimya', 102),
(112, 'işletme', 101),
(113, 'iktisat', 101),
(114, 'uluslar arası ilişkiler', 101),
(115, 'turizm işletmeciliği', 101);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bolum_baskanligi`
--

DROP TABLE IF EXISTS `bolum_baskanligi`;
CREATE TABLE IF NOT EXISTS `bolum_baskanligi` (
  `Baskanlık_Id` int NOT NULL,
  `Bolum_Baskan_Id` int NOT NULL,
  `Bolum_Baskan_Yar_Id` int NOT NULL,
  `Sekreter` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Bolum_Id` int NOT NULL,
  PRIMARY KEY (`Baskanlık_Id`),
  KEY `Bolum_Baskan_Id` (`Bolum_Baskan_Id`),
  KEY `Bolum_Baskan_Yar_Id` (`Bolum_Baskan_Yar_Id`),
  KEY `Bolum_Id` (`Bolum_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `bolum_baskanligi`
--

INSERT INTO `bolum_baskanligi` (`Baskanlık_Id`, `Bolum_Baskan_Id`, `Bolum_Baskan_Yar_Id`, `Sekreter`, `Bolum_Id`) VALUES
(900, 100, 104, 'İsim SOYİSİM', 100),
(901, 107, 108, 'İsim SOYİSİM', 102),
(902, 109, 110, 'İsim SOYİSİM', 101),
(903, 113, 114, 'İsim SOYİSİM', 107),
(904, 116, 117, 'İsim SOYİSİM', 108);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `dersler`
--

DROP TABLE IF EXISTS `dersler`;
CREATE TABLE IF NOT EXISTS `dersler` (
  `Ders_Kod` int NOT NULL,
  `Ders_Ad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Bolum_Kod` int NOT NULL,
  `Ders_Kredi` int NOT NULL,
  `Ders_Mecburiyet` int NOT NULL,
  `Ders_Acıklama` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Kod` int NOT NULL,
  `Ders_Donem` int NOT NULL,
  PRIMARY KEY (`Ders_Kod`),
  KEY `Bolum_Kod` (`Bolum_Kod`),
  KEY `Fakulte_Kod` (`Fakulte_Kod`),
  KEY `Ders_Donem` (`Ders_Donem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `dersler`
--

INSERT INTO `dersler` (`Ders_Kod`, `Ders_Ad`, `Bolum_Kod`, `Ders_Kredi`, `Ders_Mecburiyet`, `Ders_Acıklama`, `Fakulte_Kod`, `Ders_Donem`) VALUES
(100, 'veri tabanı', 100, 3, 1, 'Mysql veritabanı üzerinden işlenen uygulamalı bir ders.', 100, 1),
(101, 'sistem analizi', 100, 3, 1, 'sistem analizi', 100, 1),
(102, 'bilişim sistemleri', 100, 3, 1, 'bilişim sistemleri', 100, 1),
(103, 'araştırma yöntemleri', 100, 3, 1, 'araştırma yöntemleri', 100, 1),
(104, 'matematik-1', 100, 3, 1, 'matematik-1', 100, 2),
(105, 'matematik-2', 100, 3, 1, 'matematik-2', 100, 2),
(106, 'coğrafi bilgi sistemleri', 100, 3, 1, 'coğrafi bilgi sistemleri', 100, 2),
(107, 'A-dersi-1', 100, 3, 1, 'A-dersi', 100, 2),
(108, 'A-dersi-2', 100, 3, 1, 'A-dersi-2', 100, 1),
(109, 'cebir', 108, 4, 1, 'cebir', 102, 1),
(110, 'analiz', 108, 5, 1, 'analiz', 102, 2),
(111, 'diferansiyel', 108, 5, 1, 'diferansiyel', 102, 1),
(112, 'geometri', 108, 2, 1, 'geometri', 102, 1),
(113, 'makro iktisat-1', 102, 3, 1, 'makro iktisat-1', 100, 2),
(114, 'makro iktisat-2', 102, 3, 1, 'makro iktisat-2', 100, 1),
(115, 'mikro iktisat-1', 102, 4, 1, 'mikro iktisat-1', 100, 2),
(116, 'mikro iktisat-2', 102, 4, 1, 'mikro iktisat-2', 100, 1),
(117, 'muhasebe', 102, 5, 1, 'muhasebe', 100, 2),
(118, 'istatistik-1', 101, 4, 1, 'istatistik-1', 100, 2),
(119, 'istatistik-2', 101, 4, 1, 'istatistik-2', 100, 1),
(120, 'yöneylem araştırması-1', 101, 4, 1, 'yöneylem araştırması-1', 100, 2),
(121, 'yöneylem araştırması-2', 101, 4, 1, 'yöneylem araştırması-2', 100, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `derslik`
--

DROP TABLE IF EXISTS `derslik`;
CREATE TABLE IF NOT EXISTS `derslik` (
  `Derslik_Kod` int NOT NULL,
  `Fakulte_Kod` int NOT NULL,
  PRIMARY KEY (`Derslik_Kod`),
  KEY `Fakulte_Kod` (`Fakulte_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `derslik`
--

INSERT INTO `derslik` (`Derslik_Kod`, `Fakulte_Kod`) VALUES
(500, 100),
(501, 100),
(502, 100),
(503, 100),
(504, 100),
(505, 100),
(600, 100),
(601, 100),
(602, 100),
(603, 100),
(604, 100),
(605, 100),
(510, 101),
(511, 101),
(512, 101),
(513, 101),
(514, 101),
(515, 101),
(520, 102),
(521, 102),
(522, 102),
(523, 102),
(524, 102),
(525, 102),
(620, 102),
(621, 102),
(622, 102),
(623, 102),
(624, 102),
(625, 102);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ders_donem`
--

DROP TABLE IF EXISTS `ders_donem`;
CREATE TABLE IF NOT EXISTS `ders_donem` (
  `Donem_Kod` int NOT NULL,
  `Donem_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Donem_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ders_donem`
--

INSERT INTO `ders_donem` (`Donem_Kod`, `Donem_Ad`) VALUES
(1, 'bahar'),
(2, 'güz');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `fakulte`
--

DROP TABLE IF EXISTS `fakulte`;
CREATE TABLE IF NOT EXISTS `fakulte` (
  `Fakulte_Kod` int NOT NULL,
  `Fakulte_Ad` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Dekan` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Dekan_Yrd_1` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Dekan_Yrd_2` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Fakulte_Sekreter` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Fakulte_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `fakulte`
--

INSERT INTO `fakulte` (`Fakulte_Kod`, `Fakulte_Ad`, `Fakulte_Dekan`, `Fakulte_Dekan_Yrd_1`, `Fakulte_Dekan_Yrd_2`, `Fakulte_Sekreter`) VALUES
(100, 'iktisadi ve idari bilimler fakültesi', 'Özlem ÇAKIR', 'Barış ', '', 'Aslan TÜRK'),
(101, 'işletme fakültesi', 'Çağnur BALSARI', 'Banu DURUKAN SALI', 'Gönenç DEMİR', 'Metin ÇAĞLAR'),
(102, 'fen fakültesi', 'Aylin ALIN', 'Nalan DEMİR', 'Mine ANTEP', 'Hakan KILIÇ'),
(103, 'hukuk fakültesi', 'Sibel İkbal SAFİ', 'Ali Gümrah TOKER', 'Uğur SAMANCI', 'Arzu KÜLEY');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `gun`
--

DROP TABLE IF EXISTS `gun`;
CREATE TABLE IF NOT EXISTS `gun` (
  `Gun_Kod` int NOT NULL,
  `Gun_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Gun_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `gun`
--

INSERT INTO `gun` (`Gun_Kod`, `Gun_Ad`) VALUES
(1, 'pazartesi'),
(2, 'salı'),
(3, 'çarşamba'),
(4, 'perşembe'),
(5, 'cuma'),
(6, 'cumartesi');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hocalar`
--

DROP TABLE IF EXISTS `hocalar`;
CREATE TABLE IF NOT EXISTS `hocalar` (
  `Hoca_Kod` int NOT NULL,
  `Hoca_Isim` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Hoca_Soyad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Bolum_Kod` int NOT NULL,
  `Fakulte_Kod` int NOT NULL,
  `Idari_Gorev_Kod` int NOT NULL,
  `Unvan_Kod` int NOT NULL,
  PRIMARY KEY (`Hoca_Kod`),
  KEY `Bolum_Kod` (`Bolum_Kod`),
  KEY `Fakulte_Kod` (`Fakulte_Kod`),
  KEY `Idari_Gorev_Kod` (`Idari_Gorev_Kod`),
  KEY `Unvan_Kod` (`Unvan_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `hocalar`
--

INSERT INTO `hocalar` (`Hoca_Kod`, `Hoca_Isim`, `Hoca_Soyad`, `Bolum_Kod`, `Fakulte_Kod`, `Idari_Gorev_Kod`, `Unvan_Kod`) VALUES
(100, 'vahap', 'tecim', 100, 100, 1, 1),
(101, 'kaan', 'yaralıoğlu', 100, 100, 9, 1),
(102, 'yılmaz', 'gökşen', 100, 100, 9, 1),
(104, 'çiğdem', 'tarhan', 100, 100, 11, 1),
(105, 'alp', 'timur', 102, 100, 9, 1),
(106, 'yaşar', 'uysal', 102, 100, 9, 1),
(107, 'ismail', 'mazgit', 102, 100, 1, 1),
(108, 'mert', 'ural', 102, 100, 11, 2),
(109, 'şenay', 'üçdoğruk', 101, 100, 1, 1),
(110, 'ipek', 'deveci', 101, 100, 11, 1),
(111, 'vedat', 'pazarlıoğlu', 101, 100, 9, 1),
(112, 'levent', 'şenyay', 101, 100, 9, 1),
(113, 'efendi', 'nasiboğlu', 107, 102, 1, 1),
(114, 'çağın', 'kandemir çavaş', 107, 102, 11, 2),
(115, 'emel', 'kuruoğlu', 107, 102, 9, 2),
(116, 'cenap', 'özel', 108, 102, 1, 1),
(117, 'ilhan', 'karakılıç', 108, 102, 11, 2),
(118, 'halil', 'oruç', 108, 102, 9, 1),
(119, 'meltem', 'adıyaman', 108, 102, 5, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hoca_ders`
--

DROP TABLE IF EXISTS `hoca_ders`;
CREATE TABLE IF NOT EXISTS `hoca_ders` (
  `Hoca_Kod` int NOT NULL,
  `Ders_Kod` int NOT NULL,
  `Derslik_Kod` int NOT NULL,
  `Gun_Kod` int NOT NULL,
  `Saat_Kod` int NOT NULL,
  KEY `Hoca_Kod` (`Hoca_Kod`),
  KEY `Ders_Kod` (`Ders_Kod`),
  KEY `Derslik_Kod` (`Derslik_Kod`),
  KEY `Gun_Kod` (`Gun_Kod`),
  KEY `Saat_Kod` (`Saat_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `hoca_ders`
--

INSERT INTO `hoca_ders` (`Hoca_Kod`, `Ders_Kod`, `Derslik_Kod`, `Gun_Kod`, `Saat_Kod`) VALUES
(104, 100, 500, 1, 1),
(102, 101, 500, 1, 2),
(100, 102, 501, 1, 1),
(101, 103, 502, 3, 6),
(101, 104, 502, 3, 3),
(100, 105, 504, 3, 4),
(104, 106, 502, 4, 12),
(104, 107, 505, 2, 9),
(104, 108, 504, 5, 13),
(116, 109, 522, 3, 2),
(116, 110, 523, 1, 6),
(117, 111, 522, 3, 7),
(117, 112, 520, 5, 13),
(105, 113, 505, 2, 13),
(105, 114, 505, 5, 1),
(106, 115, 505, 4, 1),
(106, 116, 503, 4, 5),
(105, 117, 501, 2, 12),
(109, 118, 504, 1, 14),
(109, 119, 504, 1, 11),
(109, 120, 503, 2, 10),
(119, 121, 501, 5, 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hoca_kimlik`
--

DROP TABLE IF EXISTS `hoca_kimlik`;
CREATE TABLE IF NOT EXISTS `hoca_kimlik` (
  `Tck_No` bigint NOT NULL,
  `Hoca_Kod` int NOT NULL,
  `Il_Kod` int NOT NULL,
  `Dogum_Tarihi` date NOT NULL,
  `Cilt_No` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Sıra_No` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Tck_No`),
  KEY `Hoca_Kod` (`Hoca_Kod`),
  KEY `Il_Kod` (`Il_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `hoca_kimlik`
--

INSERT INTO `hoca_kimlik` (`Tck_No`, `Hoca_Kod`, `Il_Kod`, `Dogum_Tarihi`, `Cilt_No`, `Sıra_No`) VALUES
(3444444, 100, 34, '2016-05-01', '123', '123'),
(12345678, 104, 35, '2016-05-02', '123', '123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `idari_görev`
--

DROP TABLE IF EXISTS `idari_görev`;
CREATE TABLE IF NOT EXISTS `idari_görev` (
  `Idari_Gorev_Kod` int NOT NULL,
  `Idari_Gorev_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Idari_Gorev_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `idari_görev`
--

INSERT INTO `idari_görev` (`Idari_Gorev_Kod`, `Idari_Gorev_Ad`) VALUES
(1, 'bölüm başkanı'),
(2, 'senato üyeliği'),
(3, 'dekan yardımcısı'),
(4, 'dekan'),
(5, 'fakülte yönetim kurulu üyeliği'),
(6, 'rektör'),
(7, 'rektör yardımcısı'),
(8, 'fakülte kurulu üyeliği'),
(9, 'anabilim dalı başkanı'),
(10, 'bölüm kurulu üyeliği'),
(11, 'bölüm başkan yardımcılığı');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `iller`
--

DROP TABLE IF EXISTS `iller`;
CREATE TABLE IF NOT EXISTS `iller` (
  `Il_kod` int NOT NULL,
  `Il_ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Il_kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `iller`
--

INSERT INTO `iller` (`Il_kod`, `Il_ad`) VALUES
(1, 'adana'),
(2, 'adıyaman'),
(3, 'afyonkarahisar'),
(4, 'ağrı'),
(5, 'amasya'),
(6, 'ankara'),
(7, 'antalya'),
(8, 'artvin'),
(9, 'aydın'),
(10, 'balıkesir'),
(11, 'bilecik'),
(12, 'bingöl'),
(13, 'bitlis'),
(14, 'bolu'),
(15, 'burdur'),
(16, 'bursa'),
(17, 'çanakkale'),
(18, 'çankırı'),
(19, 'çorum'),
(20, 'denizli'),
(21, 'diyarbakır'),
(22, 'edirne'),
(23, 'elazığ'),
(24, 'erzinca'),
(25, 'erzurum'),
(26, 'eskişehir'),
(27, 'gaziantep'),
(28, 'giresun'),
(29, 'gümüşhane'),
(30, 'hakkari'),
(31, 'hatay'),
(32, 'ısparta'),
(33, 'mersin'),
(34, 'istanbul'),
(35, 'izmir'),
(36, 'kars'),
(37, 'kastamonu'),
(38, 'kayseri'),
(39, 'kırklareli'),
(40, 'kırşehir'),
(41, 'kocaeli'),
(42, 'konya'),
(43, 'kütahya'),
(44, 'malatya'),
(45, 'manisa'),
(46, 'kahramanmaraş'),
(47, 'mardin'),
(48, 'muğla'),
(49, 'muş'),
(50, 'nevşehir'),
(51, 'niğde'),
(52, 'ordu'),
(53, 'rize'),
(54, 'sakarya'),
(55, 'samsun'),
(56, 'siirt'),
(57, 'sinop'),
(58, 'sivas'),
(59, 'tekirdağ'),
(60, 'tokat'),
(61, 'trabzon'),
(62, 'tunceli'),
(63, 'şanlıurfa'),
(64, 'uşak'),
(65, 'van'),
(66, 'yozgat'),
(67, 'zonguldak'),
(68, 'aksaray'),
(69, 'bayburt'),
(70, 'karaman'),
(71, 'kırıkkale'),
(72, 'batman'),
(73, 'şırnak'),
(74, 'bartın'),
(75, 'ardahan'),
(76, 'ığdır'),
(77, 'yalova'),
(78, 'karabük'),
(79, 'kilis'),
(80, 'osmaniye'),
(81, 'düzce');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenci_bilgi`
--

DROP TABLE IF EXISTS `ogrenci_bilgi`;
CREATE TABLE IF NOT EXISTS `ogrenci_bilgi` (
  `Ogr_No` int NOT NULL,
  `Ogr_Ad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Ogr_Soyad` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Ogr_Giris_Tarih` date NOT NULL,
  `Bolum_Kod` int NOT NULL,
  `Fakulte_Kod` int NOT NULL,
  `Ogr_Tel` int NOT NULL,
  `Ogr_Adres` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Ogr_Dosya_No` int NOT NULL,
  `Tur_Kod` int NOT NULL,
  `Durum_Kod` int NOT NULL,
  PRIMARY KEY (`Ogr_No`),
  KEY `Bolum_Kod` (`Bolum_Kod`),
  KEY `Fakulte_Kod` (`Fakulte_Kod`),
  KEY `Tur_Kod` (`Tur_Kod`),
  KEY `Durum_Kod` (`Durum_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenci_bilgi`
--

INSERT INTO `ogrenci_bilgi` (`Ogr_No`, `Ogr_Ad`, `Ogr_Soyad`, `Ogr_Giris_Tarih`, `Bolum_Kod`, `Fakulte_Kod`, `Ogr_Tel`, `Ogr_Adres`, `Ogr_Dosya_No`, `Tur_Kod`, `Durum_Kod`) VALUES
(2014, 'tolgay', 'arslan', '2014-09-15', 108, 102, 333333, 'sssss', 10100, 1, 1),
(2008123, 'veli', 'kavlak', '2008-09-15', 102, 100, 12333, 'wwwwww', 10200, 2, 2),
(2015100, 'olcay', 'şahan', '2015-09-15', 108, 102, 11111, 'eeeee', 10300, 1, 1),
(2015101, 'oguzhan', 'özyakup', '2015-09-15', 108, 102, 55555, 'sssss', 10301, 1, 1),
(2015102, 'gökhan', 'töre', '2015-09-15', 108, 102, 222222, 'ffffff', 10302, 1, 1),
(2015103, 'cenk', 'tosun', '2015-09-15', 108, 102, 3333333, 'asdasd', 10303, 1, 1),
(2015888, 'serdar', 'kurtuluş', '2015-09-15', 102, 100, 12313, 'xxxxx', 10006, 1, 1),
(20154444, 'tolga', 'zengin', '2015-09-15', 101, 100, 123123, 'buca', 10005, 2, 1),
(20158788, 'necip', 'uysal', '2015-09-15', 102, 100, 1231333, 'ssssss', 10007, 2, 1),
(201511111, 'ceylan', 'ünal', '2015-09-15', 100, 100, 12312312, 'buca', 10003, 1, 1),
(201512312, 'ismail', 'köybaşı', '2015-09-15', 101, 100, 123123, 'xxxx', 10004, 2, 1),
(2014800647, 'cahit', 'yılmaz', '2014-09-15', 100, 100, 33333333, 'buca', 10000, 1, 1),
(2014800648, 'atakan', 'çavuş', '2014-09-15', 100, 100, 11111111, 'kuşadası', 10001, 1, 1),
(2015111111, 'fehmi', 'yüksel', '2015-09-15', 100, 100, 555555, 'alsancak', 10002, 1, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenci_dersler`
--

DROP TABLE IF EXISTS `ogrenci_dersler`;
CREATE TABLE IF NOT EXISTS `ogrenci_dersler` (
  `Ogr_No` int NOT NULL,
  `Ders_Kod` int NOT NULL,
  `Hoca_Kod` int NOT NULL,
  `Vize_1` int NOT NULL,
  `Vize_2` int NOT NULL,
  `Vize_3` int NOT NULL,
  `Odev_1` int NOT NULL,
  `Odev_2` int NOT NULL,
  `Odev_3` int NOT NULL,
  `Final` int NOT NULL,
  `Bütünleme` int NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  KEY `Ogr_No` (`Ogr_No`),
  KEY `Ders_Kod` (`Ders_Kod`),
  KEY `Hoca_Kod` (`Hoca_Kod`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenci_dersler`
--

INSERT INTO `ogrenci_dersler` (`Ogr_No`, `Ders_Kod`, `Hoca_Kod`, `Vize_1`, `Vize_2`, `Vize_3`, `Odev_1`, `Odev_2`, `Odev_3`, `Final`, `Bütünleme`, `Id`) VALUES
(2014800647, 100, 104, 100, 100, 100, 100, 100, 100, 100, 100, 1),
(2014800648, 100, 104, 100, 100, 95, 95, 95, 95, 95, 0, 2),
(2014800647, 101, 102, 100, 100, 100, 100, 100, 100, 100, 0, 3),
(2015111111, 102, 100, 50, 50, 50, 50, 50, 50, 50, 80, 4),
(2015100, 109, 116, 80, 75, 0, 80, 80, 0, 100, 0, 5),
(2015101, 110, 116, 45, 15, 25, 85, 85, 85, 100, 0, 6),
(2015111111, 100, 104, 85, 77, 78, 58, 85, 52, 52, 0, 7),
(201511111, 100, 104, 100, 100, 100, 100, 100, 100, 100, 100, 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenci_durum`
--

DROP TABLE IF EXISTS `ogrenci_durum`;
CREATE TABLE IF NOT EXISTS `ogrenci_durum` (
  `Durum_Kod` int NOT NULL,
  `Durum_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Durum_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenci_durum`
--

INSERT INTO `ogrenci_durum` (`Durum_Kod`, `Durum_Ad`) VALUES
(1, 'ögrenci'),
(2, 'mezun'),
(3, 'dondurulmuş');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenci_egitim`
--

DROP TABLE IF EXISTS `ogrenci_egitim`;
CREATE TABLE IF NOT EXISTS `ogrenci_egitim` (
  `Og_No` int NOT NULL,
  `Ilkokul` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Ortaokul` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Lise` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Giris_Puan` int NOT NULL,
  KEY `Og_No` (`Og_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenci_egitim`
--

INSERT INTO `ogrenci_egitim` (`Og_No`, `Ilkokul`, `Ortaokul`, `Lise`, `Giris_Puan`) VALUES
(2014800647, 'salim güven', 'salim güven', 'haydar paşa', 100),
(2014800648, 'ilkokul', 'orta okul', 'lise', 100);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenci_kimlik`
--

DROP TABLE IF EXISTS `ogrenci_kimlik`;
CREATE TABLE IF NOT EXISTS `ogrenci_kimlik` (
  `Tck_No` bigint NOT NULL,
  `Baba_Adi` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Il_kod` int NOT NULL,
  `Dogum_Tarihi` date NOT NULL,
  `Cilt_No` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Sıra_No` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  `Ogr_No` int NOT NULL,
  PRIMARY KEY (`Tck_No`),
  KEY `Il_kod` (`Il_kod`),
  KEY `Ogr_No` (`Ogr_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenci_kimlik`
--

INSERT INTO `ogrenci_kimlik` (`Tck_No`, `Baba_Adi`, `Il_kod`, `Dogum_Tarihi`, `Cilt_No`, `Sıra_No`, `Ogr_No`) VALUES
(55555, 'asdasdasd', 4, '2016-05-12', '123123', '123123', 2015101),
(123123, 'sadasd', 2, '2016-05-01', '123', '123', 2014800648),
(123333, 'asdasd', 16, '2016-05-02', '123', '123', 2015111111),
(2323231, 'asdasdas', 18, '2016-05-03', '123', '3224', 201511111),
(27568819040, 'muharrem', 33, '1990-05-09', 'e11', '1234', 2014800647);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ogrenim_turu`
--

DROP TABLE IF EXISTS `ogrenim_turu`;
CREATE TABLE IF NOT EXISTS `ogrenim_turu` (
  `Tur_Kod` int NOT NULL,
  `Tur_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Tur_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `ogrenim_turu`
--

INSERT INTO `ogrenim_turu` (`Tur_Kod`, `Tur_Ad`) VALUES
(1, 'örgün'),
(2, 'ikinci ögretim');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `saat`
--

DROP TABLE IF EXISTS `saat`;
CREATE TABLE IF NOT EXISTS `saat` (
  `Saat_Kod` int NOT NULL,
  `Saat` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Saat_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `saat`
--

INSERT INTO `saat` (`Saat_Kod`, `Saat`) VALUES
(1, '09.00-09.45'),
(2, '09.55-10.40'),
(3, '10.50-11.35'),
(4, '11.45-12.30'),
(5, '13.30-14.15'),
(6, '14.25-15.10'),
(7, '15.20-16.05'),
(8, '16.15-17.00'),
(9, '17.10-17.55'),
(10, '18.05-18.50'),
(11, '19.00-19.45'),
(12, '19.55-20.40'),
(13, '20.50-21.35'),
(14, '21.45-22.30'),
(15, '22.40-23.25');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `unvan`
--

DROP TABLE IF EXISTS `unvan`;
CREATE TABLE IF NOT EXISTS `unvan` (
  `Unvan_Kod` int NOT NULL,
  `Unvan_Ad` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_turkish_ci NOT NULL,
  PRIMARY KEY (`Unvan_Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_turkish_ci;

--
-- Tablo döküm verisi `unvan`
--

INSERT INTO `unvan` (`Unvan_Kod`, `Unvan_Ad`) VALUES
(1, 'profesör'),
(2, 'doçent'),
(3, 'doktor öğretim üyesi'),
(4, 'araştırma görevlisi'),
(5, 'öğretim görevlisi'),
(6, 'okutman'),
(7, 'uzman');

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `bolum`
--
ALTER TABLE `bolum`
  ADD CONSTRAINT `bolum_ibfk_1` FOREIGN KEY (`Fakulte_Kod`) REFERENCES `fakulte` (`Fakulte_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `bolum_baskanligi`
--
ALTER TABLE `bolum_baskanligi`
  ADD CONSTRAINT `bolum_baskanligi_ibfk_1` FOREIGN KEY (`Bolum_Baskan_Id`) REFERENCES `hocalar` (`Hoca_Kod`),
  ADD CONSTRAINT `bolum_baskanligi_ibfk_2` FOREIGN KEY (`Bolum_Baskan_Yar_Id`) REFERENCES `hocalar` (`Hoca_Kod`),
  ADD CONSTRAINT `bolum_baskanligi_ibfk_3` FOREIGN KEY (`Bolum_Id`) REFERENCES `bolum` (`Bolum_Kod`);

--
-- Tablo kısıtlamaları `dersler`
--
ALTER TABLE `dersler`
  ADD CONSTRAINT `dersler_ibfk_4` FOREIGN KEY (`Fakulte_Kod`) REFERENCES `fakulte` (`Fakulte_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dersler_ibfk_5` FOREIGN KEY (`Ders_Donem`) REFERENCES `ders_donem` (`Donem_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dersler_ibfk_6` FOREIGN KEY (`Bolum_Kod`) REFERENCES `bolum` (`Bolum_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `derslik`
--
ALTER TABLE `derslik`
  ADD CONSTRAINT `derslik_ibfk_1` FOREIGN KEY (`Fakulte_Kod`) REFERENCES `fakulte` (`Fakulte_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `hocalar`
--
ALTER TABLE `hocalar`
  ADD CONSTRAINT `hocalar_ibfk_1` FOREIGN KEY (`Bolum_Kod`) REFERENCES `bolum` (`Bolum_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hocalar_ibfk_2` FOREIGN KEY (`Fakulte_Kod`) REFERENCES `fakulte` (`Fakulte_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hocalar_ibfk_3` FOREIGN KEY (`Idari_Gorev_Kod`) REFERENCES `idari_görev` (`Idari_Gorev_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hocalar_ibfk_4` FOREIGN KEY (`Unvan_Kod`) REFERENCES `unvan` (`Unvan_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `hoca_ders`
--
ALTER TABLE `hoca_ders`
  ADD CONSTRAINT `hoca_ders_ibfk_1` FOREIGN KEY (`Hoca_Kod`) REFERENCES `hocalar` (`Hoca_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hoca_ders_ibfk_2` FOREIGN KEY (`Ders_Kod`) REFERENCES `dersler` (`Ders_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hoca_ders_ibfk_3` FOREIGN KEY (`Derslik_Kod`) REFERENCES `derslik` (`Derslik_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hoca_ders_ibfk_4` FOREIGN KEY (`Gun_Kod`) REFERENCES `gun` (`Gun_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hoca_ders_ibfk_5` FOREIGN KEY (`Saat_Kod`) REFERENCES `saat` (`Saat_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `hoca_kimlik`
--
ALTER TABLE `hoca_kimlik`
  ADD CONSTRAINT `hoca_kimlik_ibfk_1` FOREIGN KEY (`Hoca_Kod`) REFERENCES `hocalar` (`Hoca_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hoca_kimlik_ibfk_2` FOREIGN KEY (`Il_Kod`) REFERENCES `iller` (`Il_kod`);

--
-- Tablo kısıtlamaları `ogrenci_bilgi`
--
ALTER TABLE `ogrenci_bilgi`
  ADD CONSTRAINT `ogrenci_bilgi_ibfk_1` FOREIGN KEY (`Bolum_Kod`) REFERENCES `bolum` (`Bolum_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_bilgi_ibfk_2` FOREIGN KEY (`Fakulte_Kod`) REFERENCES `fakulte` (`Fakulte_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_bilgi_ibfk_3` FOREIGN KEY (`Tur_Kod`) REFERENCES `ogrenim_turu` (`Tur_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_bilgi_ibfk_4` FOREIGN KEY (`Durum_Kod`) REFERENCES `ogrenci_durum` (`Durum_Kod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `ogrenci_dersler`
--
ALTER TABLE `ogrenci_dersler`
  ADD CONSTRAINT `ogrenci_dersler_ibfk_1` FOREIGN KEY (`Ders_Kod`) REFERENCES `dersler` (`Ders_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_dersler_ibfk_2` FOREIGN KEY (`Hoca_Kod`) REFERENCES `hocalar` (`Hoca_Kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_dersler_ibfk_4` FOREIGN KEY (`Ogr_No`) REFERENCES `ogrenci_bilgi` (`Ogr_No`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `ogrenci_egitim`
--
ALTER TABLE `ogrenci_egitim`
  ADD CONSTRAINT `ogrenci_egitim_ibfk_1` FOREIGN KEY (`Og_No`) REFERENCES `ogrenci_bilgi` (`Ogr_No`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `ogrenci_kimlik`
--
ALTER TABLE `ogrenci_kimlik`
  ADD CONSTRAINT `ogrenci_kimlik_ibfk_1` FOREIGN KEY (`Il_kod`) REFERENCES `iller` (`Il_kod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ogrenci_kimlik_ibfk_2` FOREIGN KEY (`Ogr_No`) REFERENCES `ogrenci_bilgi` (`Ogr_No`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
