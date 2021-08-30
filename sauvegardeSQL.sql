-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win32
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour groupomania_development
CREATE DATABASE IF NOT EXISTS `groupomania_development` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `groupomania_development`;

-- Listage de la structure de la table groupomania_development. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9466 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.comments : ~8 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `userId`, `postId`, `comments`, `createdAt`, `updatedAt`) VALUES
	(9455, 1, 106, 'Test de commentaire', '2021-08-30 02:04:22', '2021-08-30 02:04:22'),
	(9456, 1, 115, 'test', '2021-08-30 02:08:52', '2021-08-30 02:08:52'),
	(9457, 1, 108, 'modo', '2021-08-30 02:16:19', '2021-08-30 02:16:19'),
	(9458, 1, 114, 'test', '2021-08-30 02:21:40', '2021-08-30 02:21:40'),
	(9459, 1, 106, 'test', '2021-08-30 02:27:15', '2021-08-30 02:27:15'),
	(9460, 1, 107, 'test', '2021-08-30 02:27:36', '2021-08-30 02:27:36'),
	(9464, 1, 117, 'Tout fonctionne ?!', '2021-08-30 02:29:15', '2021-08-30 02:29:15'),
	(9465, 1, 117, 'Super !', '2021-08-30 02:33:12', '2021-08-30 02:33:12');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table groupomania_development. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `isModerate` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.posts : ~6 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `attachment`, `isModerate`, `createdAt`, `updatedAt`) VALUES
	(106, 1, 'Premier post du site', 'Pour la cinquième fois', NULL, 0, '2021-08-30 02:04:13', '2021-08-30 02:04:13'),
	(107, 1, 'Deuxième test avec image', 'Test', 'http://localhost:3000/images/geek.jpg.jpg', 0, '2021-08-30 02:04:45', '2021-08-30 02:04:45'),
	(108, 1, 'Bonjour à tous ! ', ':) ', 'http://localhost:3000/images/happy-person-18.gif.gif', 1, '2021-08-30 02:05:16', '2021-08-30 02:16:31'),
	(114, 1, 'Groupomania v0.1.0', 'Première version du site présenté', 'http://localhost:3000/images/happy-person-11.gif.gif', 0, '2021-08-30 02:08:01', '2021-08-30 02:08:01'),
	(115, 1, 'Deuxième post de texte', 'Text', NULL, 0, '2021-08-30 02:08:29', '2021-08-30 02:16:29'),
	(117, 17, 'New Post ', 'Dites nous quelque chose..', 'http://localhost:3000/images/Joueur_du_grenier.jpg.jpg', 0, '2021-08-30 02:28:23', '2021-08-30 02:34:46');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania_development. sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table groupomania_development.sequelizemeta : ~3 rows (environ)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20200829085021-create-user.js'),
	('20200829085209-create-post.js'),
	('20200829085314-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Listage de la structure de la table groupomania_development. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `latent` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.users : ~8 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`, `isAdmin`, `latent`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin@hotmail.fr', 'Admin', '$2b$10$5flEXjiN.A22TYK7yjo9v.b5wbxLZLZWMq7Kky0..xFBxbKgCu6t2', 'Développeur', 1, 1, '2021-08-26 22:35:39', '2021-08-26 22:35:39'),
	(2, 'jeremy@hotmail.fr', 'Jeremy', '$2b$10$g/rVsxHfGPSXI2QD/5uZgOM6Y8HyBZgEOnDqfjyX6yz5k90MeDMdy', 'UX Designer', 0, 1, '2021-08-26 22:37:09', '2021-08-26 22:37:09'),
	(3, 'nathan@hotmail.fr', 'Nathan', '$2b$10$7PQdox02CTwq4PLUoq8cGuFqWEGWMvs6EQb62YqRSZ.2HxelNnCwi', 'Developper', 0, 0, '2021-08-26 22:38:35', '2021-08-29 17:41:09'),
	(4, 'veeno@hotmail.fr', 'Veeno', '$2b$10$AhQeKjTU2poTtFsV6VxgSewS6.pnuwJQHxahG3zSwXfOr0vSnVhRS', 'Developper', 0, 1, '2021-08-26 22:40:50', '2021-08-26 22:40:50'),
	(17, 'newOne@hotmail.fr', 'JC', '$2b$10$niBBzAKM4gyJfHAvdUo9Re4U0WmGLXt43vTna4I1QyuzpBIDvzgIW', 'dev', 0, 1, '2021-08-28 15:31:10', '2021-08-28 15:31:10'),
	(18, 'test@hotmail.fr', 'Veeno', '$2b$10$7CSYLrcBzSTg5eYMowvyMeNp17y7hrrdVpIJyxHbzTW8zZwuMUi3q', 'none', 0, 1, '2021-08-28 16:24:14', '2021-08-28 16:24:14'),
	(19, 'test123@hotmail.fr', 'test', '$2b$10$pdmLKvDzUeXPxY.1hdEuAOLdjG0pYSrb.GAjhOK3XG01b4okw8s/K', 'testeur', 0, 1, '2021-08-30 01:06:07', '2021-08-30 01:06:07'),
	(20, 'newtest@hotmail.fr', 'admin', '$2b$10$f/wuFg597KtIDXNUbs35W.byMDwo94W4c8bEZee1xA97g/dROCMdm', 'ux', 0, 0, '2021-08-30 02:09:40', '2021-08-30 02:09:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
