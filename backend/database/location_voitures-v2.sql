-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 20 juil. 2025 à 13:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `location_voitures`
--

-- --------------------------------------------------------

--
-- Structure de la table `car`
--

CREATE TABLE `car` (
  `id_car` int(10) UNSIGNED NOT NULL,
  `marque` varchar(30) NOT NULL,
  `matricule` varchar(30) NOT NULL,
  `modele` varchar(30) NOT NULL,
  `status` enum('disponible','reservee') DEFAULT 'disponible',
  `price` decimal(8,2) NOT NULL,
  `fuel` varchar(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `car`
--

INSERT INTO `car` (`id_car`, `marque`, `matricule`, `modele`, `status`, `price`, `fuel`, `image`) VALUES
(1, 'Toyota test', '12345-A', 'Corolla', 'disponible', 300.00, 'essence', '1752939759938.jpeg'),
(2, 'BMW', '67890-B', 'X5', 'disponible', 700.00, 'diesel', '1752939657848.jpeg'),
(3, 'Peugeot', '11223-C', '308', 'reservee', 250.00, 'essence', '1752939912010.jpg'),
(10, 'testjhjas', 'sddfssd', 'ihsuds', 'disponible', 3443.00, 'diesel', '1752939977057.jpg'),
(11, 'bmw', '8nn9', 'm-6', 'disponible', 6565.00, 'diesel', '1752840455128.webp'),
(12, 'testt', 'test', 'test', 'disponible', 8878.00, 'diesel', '1752840716619.webp');

-- --------------------------------------------------------

--
-- Structure de la table `rent`
--

CREATE TABLE `rent` (
  `id_rent` int(10) UNSIGNED NOT NULL,
  `date_depart` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_car` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `name`, `lastname`, `email`, `password`, `role`) VALUES
(1, 'abde rrahmane', 'taki', 'abde@gmail.com', 'test', 'admin'),
(3, 'ahmed', 'taki', 'ahmaed@gmail.com', 'pass', 'user'),
(4, 'abde rrahmane', 'taki', 'abde1@gmail.com', '$2b$10$O41AO4C71xahk/C71Y5hOuunrjhxK5bIZ', 'user'),
(5, 'test', 'test', 'teswd@gmail.com', '$2b$10$pGHF6FENXH7/QcykSu1r7e1qmwzvFl2uG', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id_rent`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `car`
--
ALTER TABLE `car`
  MODIFY `id_car` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `rent`
--
ALTER TABLE `rent`
  MODIFY `id_rent` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
