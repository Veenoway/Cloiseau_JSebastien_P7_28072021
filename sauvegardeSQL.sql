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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.comments : ~3 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `userId`, `postId`, `comments`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Test !', '2021-08-26 23:52:41', '2021-08-26 23:52:41'),
	(3, 3, 3, 'Any coms', '2021-08-26 23:55:26', '2021-08-26 23:55:26'),
	(4, 3, 4, 'Peut être ajouter un .env pour masquer les infos de connection à la BDD. Ensuite push le tout sur Github', '2021-08-27 01:34:40', '2021-08-27 01:34:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.posts : ~4 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `attachment`, `isModerate`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 'Salut à tous !', 'Dites nous quelques choses...', 'http://localhost:3000/images/happy-person-11.gif.gif', 0, '2021-08-26 22:37:45', '2021-08-26 22:37:45'),
	(3, 1, 'Mise en page terminé !', 'Tout le scss est en place :D', 'http://localhost:3000/images/mrw-reaction.gif.gif', 0, '2021-08-26 23:52:17', '2021-08-27 10:55:36'),
	(4, 3, 'Bonjour ! ', 'Amélioration de l\'aspect visuel de l\'app', 'http://localhost:3000/images/5fdad3b89e15137929899ad5a84e1ded.gif.gif', 0, '2021-08-27 00:42:14', '2021-08-27 00:42:14'),
	(7, 1, 'New post', 'Test', 'http://localhost:3000/images/176.png.png', 0, '2021-08-27 11:07:24', '2021-08-27 11:07:24');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania_development.users : ~16 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`, `isAdmin`, `latent`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin@hotmail.fr', 'Admin', '$2b$10$5flEXjiN.A22TYK7yjo9v.b5wbxLZLZWMq7Kky0..xFBxbKgCu6t2', 'Développeur', 1, 1, '2021-08-26 22:35:39', '2021-08-26 22:35:39'),
	(2, 'jeremy@hotmail.fr', 'Jeremy', '$2b$10$g/rVsxHfGPSXI2QD/5uZgOM6Y8HyBZgEOnDqfjyX6yz5k90MeDMdy', 'UX Designer', 0, 1, '2021-08-26 22:37:09', '2021-08-26 22:37:09'),
	(3, 'nathan@hotmail.fr', 'Nathan', '$2b$10$7PQdox02CTwq4PLUoq8cGuFqWEGWMvs6EQb62YqRSZ.2HxelNnCwi', 'Developper', 0, 1, '2021-08-26 22:38:35', '2021-08-26 22:38:35'),
	(4, 'veeno@hotmail.fr', 'Veeno', '$2b$10$AhQeKjTU2poTtFsV6VxgSewS6.pnuwJQHxahG3zSwXfOr0vSnVhRS', 'Developper', 0, 1, '2021-08-26 22:40:50', '2021-08-26 22:40:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
