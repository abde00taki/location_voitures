-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 juil. 2025 à 13:41
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
  `image` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `star` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `car`
--

INSERT INTO `car` (`id_car`, `marque`, `matricule`, `modele`, `status`, `price`, `fuel`, `image`, `message`, `star`) VALUES
(1, 'Toyota test', '12345-A', 'Corolla', 'disponible', 300.00, 'essence', '1752939759938.jpeg', NULL, 4),
(2, 'BMW', '67890-B', 'X5', '', 700.00, 'diesel', '1752939657848.jpeg', NULL, 5),
(3, '', '', '', '', 0.00, '', '1752939912010.jpg', NULL, 4),
(10, 'testjhjas', 'sddfssd', 'ihsuds', '', 3443.00, 'diesel', '1752939977057.jpg', NULL, 4),
(11, 'bmw', '8nn9', 'm-6', 'disponible', 6565.00, 'diesel', '1752840455128.webp', NULL, 4),
(12, 'testt', 'test', 'test', 'disponible', 8878.00, 'diesel', '1752840716619.webp', NULL, 4),
(18, 'testdsfds', 'testsddf', 'testsdjkhg', 'disponible', 255.00, 'diesel', '1753103982197.png', NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `car_ratings`
--

CREATE TABLE `car_ratings` (
  `id` int(11) NOT NULL,
  `id_car` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `star` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `car_ratings`
--

INSERT INTO `car_ratings` (`id`, `id_car`, `id_user`, `star`) VALUES
(1, 1, 9, 4),
(2, 2, 9, 5),
(3, 18, 9, 1.5),
(4, 3, 9, 4),
(5, 10, 9, 4),
(6, 11, 9, 4),
(7, 12, 9, 4);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id_notification`, `id_user`, `message`, `created_at`) VALUES
(1, 9, 'Your reservation has been accepted ✅', '2025-07-22 13:03:14'),
(2, 10, 'Your reservation has been rejected ❌', '2025-07-22 13:06:04'),
(3, 9, 'Your reservation has been rejected', '2025-07-26 15:40:13'),
(4, 9, 'Your reservation has been rejected', '2025-07-26 15:46:34'),
(5, 9, 'Your reservation has been rejected', '2025-07-26 16:29:29'),
(6, 9, 'Your reservation has been accepted', '2025-07-26 17:36:50'),
(7, 9, 'Your reservation has been accepted', '2025-07-27 00:21:19'),
(8, 9, 'Your reservation has been accepted ✅', '2025-07-27 16:11:42');

-- --------------------------------------------------------

--
-- Structure de la table `rent`
--

CREATE TABLE `rent` (
  `id_rent` int(10) UNSIGNED NOT NULL,
  `date_depart` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_car` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `status` enum('pending','accepted','rejected','drop') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rent`
--

INSERT INTO `rent` (`id_rent`, `date_depart`, `date_fin`, `id_car`, `id_user`, `status`) VALUES
(1, '2025-07-17', '2025-07-27', 2, 9, 'pending'),
(2, '2025-07-22', '2025-07-24', 3, 9, 'drop'),
(3, '2025-07-22', '2025-07-25', 2, 10, ''),
(4, '2025-07-24', '2025-07-29', 2, 9, 'drop'),
(5, '2025-07-23', '2025-07-26', 1, 9, 'pending'),
(6, '2025-07-26', '2025-07-31', 11, 9, 'rejected'),
(7, '2025-07-26', '2025-07-31', 10, 9, 'rejected'),
(8, '2025-07-26', '2025-07-31', 2, 9, 'accepted'),
(9, '2025-07-27', '2025-07-31', 2, 9, 'accepted'),
(10, '2025-07-27', '2025-07-31', 10, 9, 'pending'),
(11, '2025-07-27', '2025-07-30', 10, 9, 'accepted');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `image` varchar(200) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `star` decimal(10,0) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `name`, `lastname`, `email`, `password`, `role`, `image`, `message`, `star`, `tel`) VALUES
(1, 'abde rrahmane', 'taki', 'abde@gmail.com', 'test', 'admin', NULL, NULL, NULL, NULL),
(3, 'ahmed', 'taki', 'ahmaed@gmail.com', 'pass', 'user', NULL, NULL, NULL, NULL),
(4, 'abde rrahmane', 'taki', 'abde1@gmail.com', '$2b$10$O41AO4C71xahk/C71Y5hOuunrjhxK5bIZ', 'user', NULL, NULL, NULL, NULL),
(5, 'test', 'test', 'teswd@gmail.com', '$2b$10$pGHF6FENXH7/QcykSu1r7e1qmwzvFl2uG', 'user', NULL, NULL, NULL, NULL),
(7, 'amin test', 'amin', 'amin@gmail.com', '$2b$10$fmsN6DVZWgK55zJMpEV.POWOA8oEsC.4Tx5g1wuFlRx5LKIBPkQcu', 'user', '1753024822297.png', NULL, NULL, NULL),
(8, 'abderrahmane  test', 'taki', 'taki@gmail.com', '$2b$10$pQ3Sp84qleiNdQwDjjOvrOwk8W2KjW8hbHJ6vLRIiXm/MrP4QTl6S', 'admin', '1753103478313.png', NULL, NULL, NULL),
(9, 'jalal', 'sadeq', 'jalalsadeq@gmail.com', '$2b$10$78opXVh2CWXBI97SOkz1ou2SV5QGUOOcqbMvcIqe3Dhh9/ynCsdtG', 'user', '1753104613649.png', 'this is the best web site', 5, NULL),
(10, 'jamal', 'jalil', 'jamal@gmail.com', '$2b$10$vCd30e84HUwXyAGT0hkE9.JX9AhMgz5OIPT5IO4fQ8226vxx79WpK', 'user', '1753122121824.jpg', NULL, NULL, NULL),
(12, 'rachid', 'achobi', 'rachid@gmail.com', '$2b$10$Oi9KWF7biFzw9mFS8PtpHOyXhXx0AX40DJ0aKXC5..NcFdoc6.IHW', 'user', NULL, NULL, NULL, NULL);

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
-- Index pour la table `car_ratings`
--
ALTER TABLE `car_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_car` (`id_car`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notification`),
  ADD KEY `fk_user` (`id_user`);

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
  MODIFY `id_car` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `car_ratings`
--
ALTER TABLE `car_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `rent`
--
ALTER TABLE `rent`
  MODIFY `id_rent` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `car_ratings`
--
ALTER TABLE `car_ratings`
  ADD CONSTRAINT `car_ratings_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`) ON DELETE CASCADE,
  ADD CONSTRAINT `car_ratings_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

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
