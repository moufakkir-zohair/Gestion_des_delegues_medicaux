-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 02 août 2020 à 13:19
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gestion_delegue`
--

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int(20) NOT NULL,
  `code` int(11) NOT NULL,
  `quantite` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `delegue`
--

DROP TABLE IF EXISTS `delegue`;
CREATE TABLE IF NOT EXISTS `delegue` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `Numero_tele` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `compte` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `delegue`
--

INSERT INTO `delegue` (`id`, `nom`, `prenom`, `email`, `Numero_tele`, `password`, `compte`) VALUES
(11, 'Ahmed', 'Kjem', 'Ahmedkjem@gmail.com', '0678989809', 'Admin', 'Admin'),
(10, 'Zohair', 'Moufakkir', 'zouhirmoufakir1998@gmail.com', '0628978060', '123', 'Delegue');

-- --------------------------------------------------------

--
-- Structure de la table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
CREATE TABLE IF NOT EXISTS `doctor` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `Numero_tele` varchar(100) NOT NULL,
  `specialite` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `doctor`
--

INSERT INTO `doctor` (`id`, `nom`, `prenom`, `email`, `Numero_tele`, `specialite`, `adresse`) VALUES
(22, 'Hamid', 'Moufakkir', 'Hamid@gmail.com', '0678983456', 'layser', 'Fes');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delegue` int(20) NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `docteur` varchar(7) DEFAULT NULL,
  `coleur` varchar(50) NOT NULL,
  `date_d` datetime NOT NULL,
  `date_f` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `delegue`, `sujet`, `docteur`, `coleur`, `date_d`, `date_f`) VALUES
(1, 10, 'dasnmdbasm', 'Hamid', '#40E0D0', '2020-06-29 01:00:00', '2020-06-30 01:00:00'),
(2, 10, 'dscdsD', 'Hamid', '#FFD700', '2020-07-09 03:30:00', '2020-07-10 03:30:00');

-- --------------------------------------------------------

--
-- Structure de la table `fichecommande`
--

DROP TABLE IF EXISTS `fichecommande`;
CREATE TABLE IF NOT EXISTS `fichecommande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delegue` int(100) NOT NULL,
  `destination` int(100) NOT NULL,
  `date` date NOT NULL,
  `path` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fichecommande`
--

INSERT INTO `fichecommande` (`id`, `delegue`, `destination`, `date`, `path`) VALUES
(5, 10, 22, '2020-07-23', 'Commande/commande_1595539351935.pdf'),
(4, 10, 22, '2020-07-23', 'Commande/commande_1595517168789.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `medicament`
--

DROP TABLE IF EXISTS `medicament`;
CREATE TABLE IF NOT EXISTS `medicament` (
  `Code` int(11) NOT NULL,
  `Nom_medi` varchar(50) NOT NULL,
  `Date_Exp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Quantite` int(11) NOT NULL,
  `documentation` varchar(100) NOT NULL,
  `prix` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `medicament`
--

INSERT INTO `medicament` (`Code`, `Nom_medi`, `Date_Exp`, `Quantite`, `documentation`, `prix`) VALUES
(2, 'Exemple2', '2020-07-22 21:02:00', 22, 'document_1595433082235.pdf', 22),
(3, 'Exemple3', '2020-07-16 02:03:00', 23, 'document_1595433123198.pdf', 24);

-- --------------------------------------------------------

--
-- Structure de la table `rapport`
--

DROP TABLE IF EXISTS `rapport`;
CREATE TABLE IF NOT EXISTS `rapport` (
  `id` int(11) NOT NULL,
  `Sujet` varchar(2000) NOT NULL,
  `Date_creation` datetime NOT NULL,
  `path` varchar(200) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rapport`
--

INSERT INTO `rapport` (`id`, `Sujet`, `Date_creation`, `path`) VALUES
(10, 'eqwdqw', '2020-07-23 14:14:48', 'Rapport/Rapport_1595510088293.pdf'),
(10, 'hhhhhh', '2020-07-23 14:20:58', 'Rapport/Rapport_1595510458739.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `voyage`
--

DROP TABLE IF EXISTS `voyage`;
CREATE TABLE IF NOT EXISTS `voyage` (
  `id` int(20) NOT NULL,
  `ville_d` varchar(100) NOT NULL,
  `date_d` datetime NOT NULL,
  `ville_a` varchar(100) NOT NULL,
  `date_a` datetime NOT NULL,
  `description` varchar(20000) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `voyage`
--

INSERT INTO `voyage` (`id`, `ville_d`, `date_d`, `ville_a`, `date_a`, `description`) VALUES
(10, 'Fes', '2020-07-23 22:22:00', 'Rabat', '2020-07-24 22:22:00', 'gkwjhkegjhfgjwgf'),
(10, 'Tetoin', '2020-07-24 08:09:00', 'Tanger', '2020-07-24 08:09:00', 'wqdWDSsSA');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
