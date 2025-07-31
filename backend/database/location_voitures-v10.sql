-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 31 juil. 2025 à 03:43
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
(1, 'Toyota', '1234-A-11', 'Corolla 2020', 'disponible', 300.00, 'essence', '1752939759938.jpeg', NULL, 4),
(2, 'BMW', '67890-B', 'X5', '', 800.00, 'diesel', '1752939657848.jpeg', NULL, 5),
(3, ' ron j rover', 'DKJ88', 'P-7-9', '', 800.00, 'diesel', '1752939912010.jpg', NULL, 4),
(10, 'testjhjas', 'sddfssd', 'ihsuds', '', 3443.00, 'diesel', '1752939977057.jpg', NULL, 4),
(11, 'bmw', '8nn9', 'm-6', 'disponible', 6565.00, 'diesel', '1753918115528.webp', NULL, 4),
(12, 'dacia', 'JD988DJJ00', 'D-4X5', '', 300.00, 'diesel', '1752840716619.webp', NULL, 4),
(19, 'Toyota', '4567-B-22', 'Yaris 2019', 'disponible', 350.00, 'essence', '1753912461971.webp', NULL, 4),
(122, 'Range Rover', 'DKJ88-NEW', 'P-7-9', 'disponible', 800.00, 'diesel', '1753917232530.webp', NULL, 4),
(123, 'Hyundai', '1122-D-44', 'i10 2018', 'disponible', 250.00, 'essence', '1753917834968.webp', NULL, 2),
(124, 'Hyundai', '3344-E-55', 'Tucson 2020', 'disponible', 450.00, 'diesel', '1753917121854.webp', NULL, 4),
(125, 'Hyundai', '5566-F-66', 'Elantra 2021', 'disponible', 400.00, 'essence', '1753917001633.webp', NULL, 4),
(126, 'Renault', '7788-G-77', 'Clio 2019', 'disponible', 270.00, 'diesel', '1753917751965.webp', NULL, 3),
(127, 'Renault', '9900-H-88', 'Megane 2020', 'disponible', 350.00, 'diesel', '1753916923127.webp', NULL, 4),
(128, 'Renault', '2233-I-99', 'Captur 2021', 'disponible', 400.00, 'essence', '1753916772820.webp', NULL, 4),
(129, 'Peugeot', '4455-J-10', '208 2018', 'disponible', 230.00, 'essence', '1753917677678.webp', NULL, 3),
(130, 'Peugeot', '6677-K-20', '308 2019', 'disponible', 300.00, 'diesel', '1753917579224.webp', NULL, 3),
(131, 'Peugeot', '8899-L-30', '3008 2020', 'disponible', 450.00, 'diesel', '1753916698916.webp', NULL, 4),
(132, 'Volkswagen', '1212-M-40', 'Golf 2018', 'disponible', 280.00, 'essence', '1753916623060.webp', NULL, 4),
(133, 'Volkswagen', '3434-N-50', 'Polo 2019', 'disponible', 260.00, 'diesel', '1753917502796.webp', NULL, 3),
(134, 'Volkswagen', '5656-O-60', 'Passat 2021', 'disponible', 500.00, 'diesel', '1753916409679.webp', NULL, 5),
(135, 'Dacia', '7878-P-70', 'Logan 2018', 'disponible', 200.00, 'essence', '1753917913467.webp', NULL, 2),
(136, 'Dacia', '9090-Q-80', 'Duster 2020', 'disponible', 320.00, 'diesel', '1753917433111.webp', NULL, 3),
(137, 'Kia', '2323-R-90', 'Picanto 2019', 'disponible', 220.00, 'essence', '1753917330472.webp', NULL, 3),
(138, 'Kia', '4545-S-01', 'Sportage 2021', 'disponible', 420.00, 'diesel', '1753916505714.webp', NULL, 4),
(139, 'Mercedes-Benz', '6767-T-02', 'C200 2020', '', 600.00, 'diesel', '1753916301064.webp', NULL, 5);

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
(4, 3, 9, 4),
(5, 10, 9, 4),
(6, 11, 9, 4),
(7, 12, 9, 4),
(8, 139, 8, 5),
(9, 134, 8, 5),
(10, 138, 8, 4),
(11, 132, 8, 4),
(12, 131, 8, 4),
(13, 127, 8, 4),
(14, 125, 8, 4),
(15, 124, 8, 4),
(16, 122, 8, 4),
(17, 128, 8, 4),
(18, 136, 8, 3),
(19, 137, 8, 3),
(20, 133, 8, 3),
(21, 130, 8, 3),
(22, 129, 8, 3),
(23, 135, 8, 2),
(24, 123, 8, 2),
(25, 126, 8, 3),
(26, 19, 8, 4),
(27, 134, 12, 4);

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
(8, 9, 'Your reservation has been accepted ✅', '2025-07-27 16:11:42'),
(9, 9, 'Your reservation has been accepted ✅', '2025-07-29 16:06:19'),
(10, 9, 'Your reservation has been accepted ✅', '2025-07-29 16:07:46'),
(11, 9, 'Your reservation has been accepted ✅', '2025-07-29 16:07:52'),
(12, 9, 'Your reservation has been rejected ', '2025-07-29 19:10:20'),
(13, 9, 'Your reservation has been accepted ✅', '2025-07-30 19:46:00'),
(14, 14, 'Your reservation has been accepted ✅', '2025-07-31 00:51:50'),
(15, 14, 'Your reservation has been accepted ✅', '2025-07-31 01:21:01');

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
  `status` enum('pending','accepted','rejected','drop') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `qr_code` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rent`
--

INSERT INTO `rent` (`id_rent`, `date_depart`, `date_fin`, `id_car`, `id_user`, `status`, `created_at`, `qr_code`) VALUES
(1, '2025-07-17', '2025-07-27', 2, 9, 'accepted', '2025-07-29 13:08:02', NULL),
(2, '2025-07-22', '2025-07-24', 3, 9, 'drop', '2025-07-29 13:08:02', NULL),
(4, '2025-07-24', '2025-07-29', 2, 9, 'drop', '2025-07-29 13:08:02', NULL),
(5, '2025-07-23', '2025-07-26', 1, 9, 'drop', '2025-07-29 13:08:02', NULL),
(6, '2025-07-26', '2025-07-31', 11, 9, 'drop', '2025-07-29 13:08:02', NULL),
(7, '2025-07-26', '2025-07-31', 10, 9, 'drop', '2025-07-29 13:08:02', NULL),
(8, '2025-07-26', '2025-07-31', 2, 9, 'drop', '2025-07-29 13:08:02', NULL),
(9, '2025-07-27', '2025-07-31', 2, 9, 'accepted', '2025-07-29 13:08:02', NULL),
(10, '2025-07-27', '2025-07-31', 10, 9, 'drop', '2025-07-29 13:08:02', NULL),
(11, '2025-07-27', '2025-07-30', 10, 9, 'drop', '2025-07-29 13:08:02', NULL),
(12, '2025-07-29', '2025-07-31', 3, 9, 'accepted', '2025-07-29 15:50:01', NULL),
(13, '2025-07-29', '2025-07-30', 2, 9, 'accepted', '2025-07-29 16:05:55', NULL),
(14, '2025-07-29', '2025-07-31', 12, 9, 'rejected', '2025-07-29 19:09:44', NULL),
(15, '2025-07-29', '2025-07-31', 12, 9, 'accepted', '2025-07-29 19:12:44', NULL),
(16, '2025-07-30', '2025-07-30', 3, 9, 'pending', '2025-07-30 18:27:33', NULL),
(17, '2025-07-30', '2025-08-01', 1, 9, 'pending', '2025-07-30 19:45:43', NULL),
(18, '2025-07-31', '2025-08-02', 139, 14, 'accepted', '2025-07-31 00:51:19', NULL),
(19, '2025-07-31', '2025-08-02', 134, 14, 'pending', '2025-07-31 01:13:28', NULL),
(20, '2025-07-31', '2025-08-02', 3, 14, 'accepted', '2025-07-31 01:20:03', '/uploads/qr_20.png');

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
(3, 'ahmed', 'taki', 'ahmaed@gmail.com', 'pass', 'user', NULL, NULL, NULL, NULL),
(4, 'abde rrahmane', 'taki', 'abde1@gmail.com', '$2b$10$O41AO4C71xahk/C71Y5hOuunrjhxK5bIZ', 'user', NULL, NULL, NULL, NULL),
(5, 'test', 'test', 'teswd@gmail.com', '$2b$10$pGHF6FENXH7/QcykSu1r7e1qmwzvFl2uG', 'user', NULL, NULL, NULL, NULL),
(7, 'amin test', 'amin', 'amin@gmail.com', '$2b$10$fmsN6DVZWgK55zJMpEV.POWOA8oEsC.4Tx5g1wuFlRx5LKIBPkQcu', 'user', '1753919270006.webp', 'i like this service it is good', 5, NULL),
(8, 'abderrahmane ', 'taki', 'taki@gmail.com', '$2b$10$V9xGfC8Y0FqeWW5dwwA4IO9ryj6Fvwc2rlNpi8oNTx.Wv177jgIaC', 'admin', '1753907136730.jpg', 'this is the best web site good work', 5, NULL),
(9, 'jalal TEST', 'sadeq', 'jalalsadeq@gmail.com', '$2b$10$78opXVh2CWXBI97SOkz1ou2SV5QGUOOcqbMvcIqe3Dhh9/ynCsdtG', 'user', '1753104613649.png', 'Best  experience I have ever had', 4, NULL),
(10, 'jamal', 'jalil', 'jamal@gmail.com', '$2b$10$vCd30e84HUwXyAGT0hkE9.JX9AhMgz5OIPT5IO4fQ8226vxx79WpK', 'user', '1753122121824.jpg', NULL, NULL, NULL),
(12, 'rachid', 'achobi', 'rachid@gmail.com', '$2b$10$Oi9KWF7biFzw9mFS8PtpHOyXhXx0AX40DJ0aKXC5..NcFdoc6.IHW', 'user', '1753918524165.webp', 'this is the best service ', 4, NULL),
(13, 'manal', 'chobi', 'manal@gmail.com', '$2b$10$uS17RfH8NfWiXR1PeHkZzO0JR14SAS.zXh22/9gmc.ux7NEkwnn1e', 'user', '1753919637870.jpg', 'good work good web site ', 4, NULL),
(14, 'malak', 'smdani', 'malak@gmail.com', '$2b$10$OaBiOJVTddC/ihTGdFBHHue1JvnDL8pAt.bFLeUG1YMkw8xZx46uq', 'user', '1753919834696.webp', 'this is good job it is a best web site', 5, NULL);

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
  MODIFY `id_car` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT pour la table `car_ratings`
--
ALTER TABLE `car_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `rent`
--
ALTER TABLE `rent`
  MODIFY `id_rent` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
